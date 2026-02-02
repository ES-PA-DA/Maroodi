def str_to_list(list_str:str):
    try:
        return list_str.split(",")
    except Exception as err:
        print("Error parsing str list to list: ", err)
