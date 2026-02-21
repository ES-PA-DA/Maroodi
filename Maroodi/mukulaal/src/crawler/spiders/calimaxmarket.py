import scrapy
from scrapy_playwright.page import PageMethod

from ..items import MarketItem
from ..itemsloader import MarketItemLoader
from ..assets.assets import load_categories, update_categories
from ..utils.utils import str_to_list

class CategoriesNotAvailable(Exception):
    def __init__(self, *args: object) -> None:
        super().__init__(*args)


def user_categories(curr_categories_list, selected_categories):
        if selected_categories == "all":
            return curr_categories_list
        c_list = str_to_list(selected_categories)
        if all([ c in curr_categories_list for c in c_list]):
            return c_list
        raise CategoriesNotAvailable(f"Some of your selected categories {c_list} are not available. Check the avaible categories or run the command with param --update_categories=True. Available Categories:\n {curr_categories_list}")



class CalimaxmarketSpider(scrapy.Spider):
    name = "calimaxmarket"
    allowed_domains = ["tienda.calimax.com.mx"]
    start_urls = ["https://tienda.calimax.com.mx"]
    curr_categories_list = []
    pages_per_category = 0
    update_categories = False
    user_categories = []
    _user_categories_str = ""


    def __init__(self, update_categories:bool=False, user_categories:str="all", pages_per_category:str="1", *args,**kwargs) -> None:
        self.curr_categories_list = load_categories()

        self.pages_per_category = int(pages_per_category)
        self.update_categories = update_categories
        self._user_categories_str = user_categories

        super(CalimaxmarketSpider, self).__init__(*args, **kwargs)



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
        currency_integer = label.css(
            "span.vtex-product-price-1-x-currencyInteger--summary::text"
        ).get()
        currency_fraction = label.css(
            "span.vtex-product-price-1-x-currencyFraction--summary::text"
        ).get()
        price = int(currency_integer) + int(currency_fraction) / 100
        return price

    def parse_items(self, response):
        items = response.css("section.vtex-product-summary-2-x-container")

        for i in items:
            product_item = MarketItemLoader(item=MarketItem(), selector=i)
            product_item.add_css(
                "name", "span.vtex-product-summary-2-x-productBrand::text"
            )
            product_item.add_css(
                "amount", "span.vtex-product-summary-2-x-productBrand::text"
            )
            product_item.add_css(
                "unit", "span.vtex-product-summary-2-x-productBrand::text"
            )

            price_int_label = i.css(
                "span.vtex-product-price-1-x-currencyInteger--summary::text"
            ).get()
            price_frac_label = i.css(
                "span.vtex-product-price-1-x-currencyFraction--summary::text"
            ).get()

            price_value = int(price_int_label) + int(price_frac_label) / 100
            product_item.add_value("price", price_value)
            product_item.add_value("section", response.url.split("/")[-1].split("?")[0])
            yield product_item.load_item()
        if response.xpath("//div[contains(text(), 'Mostrar más')]"):
            next_page = (
                response.meta["next_page"] + 1 if "next_page" in response.meta else 2
            )
            crawled_pages = response.meta["crawled_pages"] + 1 if "crawled_pages" in response.meta else 2
            if crawled_pages <= self.pages_per_category:
                url = f"{response.url.split('=')[0]}={next_page}"
                yield scrapy.Request(
                    url=url,
                    callback=self.parse_items,
                    errback=self.errback_handle,
                    meta={
                        "playwright": True,
                        "playwright_include_page": True,
                        "load_site": True,
                        "playwright_page": response.meta["playwright_page"],
                        "next_page": next_page,
                        "crawled_pages": crawled_pages,
                        "playwright_page_methods": [
                            PageMethod(
                                "wait_for_selector",
                                "section.vtex-product-summary-2-x-container",
                            )
                        ],
                    },
                )

    def errback_handle(self, failure):
        print(f"Error loading {failure.request.url}")

    def parse(self, response):
        try:
            if not self.curr_categories_list or self.update_categories:
                print("     Updating Categories")
                categories_items = response.css("ul")[3].css("a")[2:]
                for item in categories_items:
                    self.curr_categories_list.append(item.xpath("@href").get().split("/")[-1])

                update_categories(self.curr_categories_list)

            self.user_categories = user_categories(self.curr_categories_list, self._user_categories_str)  

            print("=" * 60)
            print("     Extracting Categories")
            for curr_category in self.user_categories:
                print(f"        Category {curr_category}")
                yield scrapy.Request(
                    url=f"https://tienda.calimax.com.mx/{curr_category}?page=1",
                    callback=self.parse_items,
                    errback=self.errback_handle,
                    meta={
                        "playwright": True,
                        "playwright_include_page": True,
                        "load_site": True,
                        "playwright_page": response.meta["playwright_page"],
                        "playwright_page_methods": [
                            PageMethod(
                                "wait_for_selector",
                                "section.vtex-product-summary-2-x-container",
                            )
                        ],
                    },
                )
        except Exception as e:
            raise e
