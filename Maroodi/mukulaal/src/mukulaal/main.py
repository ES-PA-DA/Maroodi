import typer

app = typer.Typer()


@app.command()
def main():
    print("Here starts everything \n")


if __name__ == "__main__":
    app()
