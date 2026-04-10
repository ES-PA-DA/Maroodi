from doit import task_params


@task_params(
    [{"name": "name", "default": "auth", "long": "name", "short": "n"}]
)
def task_create_service(name):
    """Create basic files for every new service"""
    base_path = f"./src/{name}" 
    return {"actions": [f"mkdir {base_path}", f"touch {base_path}/__init__.py {base_path}/router.py {base_path}/models.py {base_path}/schemas.py"]}
