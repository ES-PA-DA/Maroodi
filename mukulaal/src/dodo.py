from doit.action import CmdAction

def start_spyder(spyder, categories, output_file_path, pages_per_category, update_categories):
    return f"scrapy crawl {spyder} -O {output_file_path} -a user_categories={categories} -a pages_per_category={pages_per_category} -a update_categories={update_categories}"


def task_scrap():
    return {"actions":[CmdAction(start_spyder, )],
            "params":[{'name': 'spyder',
                       'short': 'spy',
                       'default': 'calimaxmarket'},
                      {'name': 'categories',
                       'short': 'c',
                       'default': 'lacteos-y-huevos',
                        },
                      {'name': 'output_file_path',
                       'short': 'f',
                       'default': 'myscrapeddata.csv'},
                      {'name': 'pages_per_category',
                       'short': 'pc',
                       'default': 2},
                      {'name': 'update_categories',
                       'short': 'uc',
                       'default': False}]}
