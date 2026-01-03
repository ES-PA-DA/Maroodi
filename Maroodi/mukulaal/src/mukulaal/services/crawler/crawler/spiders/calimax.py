from typing import Iterable, Any

import scrapy
from scrapy_playwright.page import PageMethod


class CalimaxSpider(scrapy.Spider):
    name = "calimax"
    allowed_domains = ["tienda.calimax.com.mx"]
    root_data_path = "/home/astridangulo/Downloads"

    def start_requests(self):
        yield scrapy.Request("https://tienda.calimax.com.mx",
                             meta={"playwright": True,
                                   "playwright_include_page": True,
                                   "playwright_page_methods": [
                                       PageMethod("click", selector="button:has-text('Cerrar')"),
                                       PageMethod("click",selector="a:has-text('Departamentos')")]})

    def parse(self, response):
        categories = response.css("ul")[3].css("a")[2:]
        categories_href = [f"https://tienda.calimax.com.mx{item.xpath('@href').get()}" for item in categories]
        yield from response.follow_all(categories_href, self.parse_categories)

    def get_labels_filter_dict(self, response, css_path:str)->dict:
        selectors = response.css(css_path)[0].css("label")
        return {s.css("::text").get(): s.xpath("@for").get().split("-")[-1] for s in selectors}

    def parse_categories(self, response):
        sub_categories_dict = self.get_labels_filter_dict(response, "div.vtex-search-result-3-x-filter__container--category-2")
        category = response.url.split("/")[-1]
        products_by_category_subcategory = [f"{response.url}?initialMap=c&initialQuery={category}&map=category-1,category-2&query=/{category}/{item}&searchState" for item in sub_categories_dict.values()]
        yield from response.follow_all(products_by_category_subcategory, self.parse_brands)

    def parse_brands(self, response):
        # brands_dict = self.get_labels_filter_dict(response, "div.vtex-search-result-3-x-filter__container--brand")
        breakpoint()
