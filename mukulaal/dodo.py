def task_lint():
    return {
        "actions": [
            "black src/ tests/ dodo.py",
            "flake8 src/ tests/ dodo.py",
        ]
    }


def task_test():
    return {"actions": ["pytest {test_file_path}"]}


def task_launch():
    return {
        "actions": ["python src/mukulaal/main.py"],
        "verbosity": 2,
    }
