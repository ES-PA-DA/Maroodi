# Haramcad
This API handle all things related to collect the information collected by [Mukulaal](../mukulaal/README) and humans (us) via [Baaz](../baaz/README.md).

## Set Up
1. Install [UV](https://docs.astral.sh/uv/getting-started/installation/) based on your OS.
2. Install the 3.12 python version:
```
uv python install 3.12
```
3. Create a virtual environment:
```
uv venv .venv
```
4. Activate the virtual environment
macOS and Linux
```
source .venv/bin/activate
```
5. Install all the necessary dependencies
```
uv sync --all-groups
```
5. You are ready to start !

## How to run the API :eyes:
1. `fastapi dev` and you are good to go.

## How to format your code (It's actually important) :star:
1. Run the command
```black ./src```
src could be change by the folder that contains all the .py files that you want to keep in good shape. 

## How to test your code :mag:
1. Add test in the tests folder follow by the name of the model or service you are testing as the name of the file (Naming conventions and so on are still WIP)
2. Run the command
```pytest tests/your_file_test.py```
3. Learn more about pytest [here](https://docs.pytest.org/en/stable/)

## Sections related to db migrations, the stack and more are Work In Progress. Wait for more.. :warning:
