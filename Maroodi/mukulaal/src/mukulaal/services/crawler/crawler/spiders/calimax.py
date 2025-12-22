from typing import Iterable, Any

import scrapy
from scrapy_playwright.page import PageMethod


class CalimaxSpider(scrapy.Spider):
    name = "calimax"
    allowed_domains = ["tienda.calimax.com.mx"]

    def start_requests(self):
        yield scrapy.Request("https://tienda.calimax.com.mx",
                             meta={"playwright": True,
                                   "playwright_include_page": True,
                                   "playwright_page_methods": [
                                       PageMethod("click", selector="button:has-text('Cerrar')"),
                                       PageMethod("click",selector="a:has-text('Departamentos')")]})

    def parse(self, response):
        categories = response.css("ul")[3].css("a")[1:]
        categories_href = [f"https://tienda.calimax.com.mx/{item.xpath('@href').get()}" for item in categories]
        yield from response.follow_all(categories_href, self.parse_categories)
        breakpoint()

    def parse_categories(self, response):
        pass