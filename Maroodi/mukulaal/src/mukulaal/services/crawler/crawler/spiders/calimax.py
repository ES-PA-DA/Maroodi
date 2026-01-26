from typing import Optional

import scrapy
from scrapy_playwright.page import PageMethod
from collections import deque
import pandas as pd
import os
from datetime import datetime, timezone
from enum import Enum

DATETIME_DIR_NAME_FORMAT = "%Y-%m-%d_%H-%M-%S"
BASE_URL = "https://tienda.calimax.com.mx"


class CssTags(Enum):
    PRODUCTS_CONTAINER = "section.vtex-product-summary-2-x-container"
    PRODUCT_SUMMARY = "span.vtex-product-summary-2-x-productBrand"
    PRODUCT_PRICE = "span.vtex-product-price-1-x"
    PRODUCT_PRICE_SUMMARY = f"{PRODUCT_PRICE}-sellingPrice--summary"
    PRODUCT_PRICE_CURR_INT = f"{PRODUCT_PRICE}-currencyInteger--summary"
    PRODUCT_PRICE_CURR_FRAC = f"{PRODUCT_PRICE}-currencyFraction--summary"

    FILTER = "div.vtex-search-result-3-x-filter__container"
    FILTER_BRANDS_LIST = f"{FILTER}--brand"
    FILTER_SUBCATEGORIES_LIST = f"{FILTER}--category-2"


class MetaFlags(Enum):
    CATEGORY = "curr_category"
    SUBCATEGORY = "curr_subcategory"
    BRAND = "curr_brand"


class CalimaxSpider(scrapy.Spider):
    name = "calimax"
    allowed_domains = ["tienda.calimax.com.mx"]
    root_data_path = "/home/astridangulo/Downloads/scrapping_data/calimax"
    categories_queue = deque()
    sub_categories_queue = deque()
    brands_queue = deque()

    def start_requests(self):
        yield scrapy.Request(
            "https://tienda.calimax.com.mx",
            meta={
                "playwright": True,
                "playwright_include_page": True,
                "playwright_page_methods": [
                    PageMethod("click", selector="button:has-text('Cerrar')"),
                    PageMethod("click", selector="a:has-text('Departamentos')"),
                ],
            },
        )

    def extract_summary_product(self, response):
        return (
            response.css(CssTags.PRODUCT_SUMMARY.value).css("::text").get().split("  ")
        )

    def extract_unit_amount_label(self, response):
        return self.extract_summary_product(response)[-1].strip().split(" - ")

    def extract_product_name(self, response):
        label = self.extract_summary_product(response)
        return " ".join(label[:-1])

    def extract_product_amount(self, response):
        label = self.extract_unit_amount_label(response)
        return label[0]

    def extract_product_unit(self, response):
        label = self.extract_unit_amount_label(response)
        return label[1]

    def get_current_datetime_dir_name(self):
        utc_time = datetime.now(timezone.utc)
        return utc_time.strftime(DATETIME_DIR_NAME_FORMAT)

    def extract_price_data(self, response):
        label = response.css(CssTags.PRODUCT_PRICE_SUMMARY.value)
        currency_integer = label.css(
            f"{CssTags.PRODUCT_PRICE_CURR_INT.value}::text"
        ).get()
        currency_fraction = label.css(
            f"{CssTags.PRODUCT_PRICE_CURR_FRAC.value}::text"
        ).get()
        price = int(currency_integer) + int(currency_fraction) / 100
        return price

    def get_filter_url(
        self,
        category: str = None,
        subcategory: str = None,
        brand: str = None,
    ) -> str:
        map_param = "category-1"
        query_param = f"/{category}"

        if subcategory:
            map_param += ",category-2"
            query_param += f"/{subcategory}"

        if brand:
            map_param += ",brand"
            query_param += f"/{brand}"

        return f"{BASE_URL}/{category}?initialMap=c&initialQuery={category}&map={map_param}&query={query_param}&searchState"

    def scrapy_request(
        self,
        playwright_page,
        category: str,
        subcategory: str = None,
        brand: str = None,
        callback=None,
    ) -> scrapy.Request:
        meta_data = {
            "playwright": True,
            "playwright_include_page": True,
            "playwright_page": playwright_page,  # Reuse the current page
            "load_site": True,
            MetaFlags.CATEGORY.value: category,
            "playwright_page_methods": [
                PageMethod("wait_for_load_state", "networkidle")
            ],
        }

        if subcategory:
            meta_data[MetaFlags.SUBCATEGORY.value] = subcategory

        if brand:
            meta_data[MetaFlags.BRAND.value] = brand

        return scrapy.Request(
            url=self.get_filter_url(
                category=category,
                subcategory=subcategory,
                brand=brand,
            ),
            meta=meta_data,
            callback=callback,
        )

    def load_filters_queue(self, response, css_path: str, queue: deque[str]) -> None:
        if len(response.css(css_path))<1:
            print(f"WARNING: Error with CSS path: {css_path} with items {len(response.css(css_path))}")
            return
        selectors = response.css(css_path)[0].css("label")
        for s in selectors:
            queue.append(s.xpath("@for").get().split("-")[-1])

    def load_options_queue(self, response, queue: deque[str]) -> None:
        categories = response.css("ul")[3].css("a")[2:]
        for item in categories:
            queue.append(item.xpath("@href").get().split("/")[-1])

    def visit_next_page(
        self,
        response,
        playwright_page,
        queue,
        callback,
        curr_flag,
        css_filter: Optional[str] = None,
    ):

        if not response.meta.get(curr_flag, False):
            if curr_flag == MetaFlags.CATEGORY.value:
                self.load_options_queue(response, queue)
            else:
                self.load_filters_queue(response, css_filter, queue)

        if len(queue) < 1:
            return None

        body_scrapy_rq = {
            "playwright_page": playwright_page,
            "callback": callback,
            "category": response.meta.get(MetaFlags.CATEGORY.value, None),
            "subcategory": response.meta.get(MetaFlags.SUBCATEGORY.value, None),
            "brand": response.meta.get(MetaFlags.BRAND.value, None),
        }

        match curr_flag:
            case MetaFlags.CATEGORY.value:
                body_scrapy_rq["category"] = queue.popleft()
            case MetaFlags.SUBCATEGORY.value:
                body_scrapy_rq["subcategory"] = queue.popleft()
            case MetaFlags.BRAND.value:
                body_scrapy_rq["brand"] = queue.popleft()

        return self.scrapy_request(**body_scrapy_rq)

    def parse(self, response):
        if response.meta.get(MetaFlags.BRAND.value, False):
            category = response.meta[MetaFlags.CATEGORY.value]
            subcategory = response.meta[MetaFlags.SUBCATEGORY.value]
            brand = response.meta[MetaFlags.BRAND.value]
            print(f"========================== Parsing product. Category {category} Subcategory {subcategory} Brand {brand}")
            products_selectors = response.css(CssTags.PRODUCTS_CONTAINER.value)
            products_list = [
                {
                    "name": self.extract_product_name(ps),
                    "amount": self.extract_product_amount(ps),
                    "unit": self.extract_product_unit(ps),
                    "category": category,
                    "subcategory": subcategory,
                    "brand": brand,
                    "price": self.extract_price_data(ps),
                }
                for ps in products_selectors
            ]
            dir_path = f"{self.root_data_path}/{category}"
            os.makedirs(dir_path, exist_ok=True)
            ds = pd.DataFrame(products_list)
            datetime_dirname = self.get_current_datetime_dir_name()
            ds.to_csv(f"{dir_path}/{subcategory}-{brand}__{datetime_dirname}.csv")

        if response.meta.get(MetaFlags.SUBCATEGORY.value, False):
            print(f"========================== Parsing {MetaFlags.BRAND.value}: {self.brands_queue}")
            yield self.visit_next_page(
                response=response,
                playwright_page=response.meta["playwright_page"],
                queue=self.brands_queue,
                css_filter=CssTags.FILTER_BRANDS_LIST.value,
                callback=self.parse,
                curr_flag=MetaFlags.BRAND.value,
            )

        if response.meta.get(MetaFlags.CATEGORY.value, False):
            print(f"========================== Parsing {MetaFlags.SUBCATEGORY.value}: {self.sub_categories_queue}")
            yield self.visit_next_page(
                response=response,
                playwright_page=response.meta["playwright_page"],
                queue=self.sub_categories_queue,
                css_filter=CssTags.FILTER_SUBCATEGORIES_LIST.value,
                callback=self.parse,
                curr_flag=MetaFlags.SUBCATEGORY.value,
            )


        print(f"========================== Parsing {MetaFlags.CATEGORY.value}: {self.categories_queue}")
        yield self.visit_next_page(
            response=response,
            playwright_page=response.meta["playwright_page"],
            queue=self.categories_queue,
            callback=self.parse,
            curr_flag=MetaFlags.CATEGORY.value,
        )
