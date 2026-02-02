from itemloaders.processors import TakeFirst, MapCompose
from scrapy.loader import ItemLoader
import re

from .utils import units

PER_KG = "POR KG"


def parse_unit(label: str) -> str:
    unit_label = label.strip().split("  ")
    unit_label = (
        unit_label[-1].strip() if len(unit_label) > 2 else label.split(" ")[-1].strip()
    )
    if unit_label.upper() == PER_KG:
        return units.KG
    if len(unit_label.split(" - ")) == 2:
        return unit_label.split(" - ")[1].upper()
    if len(unit_label.split("-")) == 2:
        return unit_label.split("-")[1].upper()
    return re.split(r"\d", unit_label)[-1].upper()


def parse_amount(label: str) -> str:
    amount_label = label.strip().split("  ")
    amount_label = (
        amount_label[-1].strip()
        if len(amount_label) > 2
        else label.strip().split(" ")[-1].strip()
    )
    if amount_label.upper() == PER_KG:
        return "1.0"
    if len(amount_label.split(" - ")) == 2:
        return amount_label.split(" - ")[0]
    if len(amount_label.split("-")) == 2:
        return amount_label.split("-")[0]
    return re.split(r"[a-zA-Z]", amount_label)[0]


def parse_name(label: str) -> str:
    name_label = label.strip().split("  ")
    if len(name_label) > 2:
        return " ".join(name_label[:-1])
    name_label = label.strip().split(" ")
    return " ".join(name_label[:-1])


class MarketItemLoader(ItemLoader):
    default_output_processor = TakeFirst()
    name_in = MapCompose(lambda x: parse_name(x))
    amount_in = MapCompose(lambda x: parse_amount(x))
    unit_in = MapCompose(lambda x: parse_unit(x))
