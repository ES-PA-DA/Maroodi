import scrapy
from scrapy_playwright.page import PageMethod
from collections import deque

from ..items import MarketItem
from ..itemsloader import MarketItemLoader


class CalimaxmarketSpider(scrapy.Spider):
    name = "calimaxmarket"
    allowed_domains = ["tienda.calimax.com.mx"]
    start_urls = ["https://tienda.calimax.com.mx"]
    categories_queue = deque()
    max_page = 1
    next_page= False

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

    def extract_price_data(self, response):
        label = response.css("span.vtex-product-price-1-x-sellingPrice--summary")
        currency_integer = label.css("span.vtex-product-price-1-x-currencyInteger--summary::text").get()
        currency_fraction = label.css("span.vtex-product-price-1-x-currencyFraction--summary::text").get()
        price = int(currency_integer) + int(currency_fraction) / 100
        return price

    def parse_items(self, response):
        items = response.css("section.vtex-product-summary-2-x-container")

        for i in items:
            product_item = MarketItemLoader(item=MarketItem(), selector=i)
            product_item.add_css("name", "span.vtex-product-summary-2-x-productBrand::text")
            product_item.add_css("amount","span.vtex-product-summary-2-x-productBrand::text")
            product_item.add_css("unit", "span.vtex-product-summary-2-x-productBrand::text")

            price_int_label = i.css("span.vtex-product-price-1-x-currencyInteger--summary::text").get()
            price_frac_label = i.css("span.vtex-product-price-1-x-currencyFraction--summary::text").get()

            price_value = int(price_int_label) + int(price_frac_label) / 100
            product_item.add_value("price", price_value)
            product_item.add_value("section", response.url.split("/")[-1])
            yield product_item.load_item()
        if response.xpath("//div[contains(text(), 'Mostrar más')]"):
            next_page = response.meta["next_page"] + 1 if "next_page" in response.meta else 2
            url = f"{response.url.split('=')[0]}={next_page}"
            yield scrapy.Request(url=url,
                                 callback=self.parse_items,
                                 errback=self.errback_handle,
                                 meta={
                                     "playwright": True,
                                     "playwright_include_page": True,
                                     "load_site": True,
                                     "playwright_page":response.meta["playwright_page"],
                                     "next_page": next_page,
                                     "playwright_page_methods": [
                                         PageMethod("wait_for_selector", "section.vtex-product-summary-2-x-container")
                                     ],
                                 }
                                )

        



    def errback_handle(self, failure):
        print(f"Error loading {failure.request.url}")


    def parse(self, response):
        try:
            categories = response.css("ul")[3].css("a")[2:]
            for item in categories:
                self.categories_queue.append(item.xpath("@href").get().split("/")[-1])

            print("="*60)
            print("     Extracting Categories")
            while len(self.categories_queue) > 0:
                curr_category = self.categories_queue.popleft()
                print(f"        Category {curr_category}")
                yield scrapy.Request(url=f"https://tienda.calimax.com.mx/{curr_category}?page=1",
                                     callback=self.parse_items,
                                     errback=self.errback_handle,
                                     meta={
                                         "playwright": True,
                                         "playwright_include_page": True,
                                         "load_site": True,
                                         "playwright_page":response.meta["playwright_page"],
                                         "playwright_page_methods": [
                                             PageMethod("wait_for_selector", "section.vtex-product-summary-2-x-container")
                                         ],
                                     }
                                    )
        except Exception as e:
            print(f"Error Parsing {curr_category}: {e}")
