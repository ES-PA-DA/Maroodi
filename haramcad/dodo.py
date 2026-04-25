"""Automation tasks for haramcad using doit."""
import subprocess
from pathlib import Path

DOCKER_COMPOSE_FILE = Path(__file__).parent / "docker-compose.yml"


def run_compose(*args, capture=False):
    """Run docker compose command."""
    result = subprocess.run(
        ["docker", "compose", "-f", str(DOCKER_COMPOSE_FILE), *args],
        capture_output=capture,
    )
    return result.returncode == 0


def task_build():
    """Build docker images."""
    return {
        "actions": [(lambda: run_compose("build"))],
        "verbosity": 2,
    }


def task_dev():
    """Start development server with logs."""
    return {
        "actions": [
            (lambda: run_compose("up", "--build", "api", "db")),
        ],
        "verbosity": 2,
    }


def task_logs():
    """Show docker logs for api container."""
    return {
        "actions": [
            (lambda: subprocess.run(
                ["docker", "compose", "-f", str(DOCKER_COMPOSE_FILE), "logs", "-f", "api"],
            ))
        ],
        "verbosity": 2,
    }


def task_up():
    """Start api and db services."""
    return {
        "actions": [(lambda: run_compose("up", "api", "db"))],
        "verbosity": 2,
    }


def task_down():
    """Stop all services."""
    return {
        "actions": [(lambda: run_compose("down"))],
        "verbosity": 2,
    }


def task_test():
    """Run tests inside docker."""
    return {
        "actions": [
            (lambda: subprocess.run(
                ["docker", "compose", "-f", str(DOCKER_COMPOSE_FILE), "up", "-d", "test-db"],
            ).returncode == 0),
            (lambda: subprocess.run(
                ["docker", "compose", "-f", str(DOCKER_COMPOSE_FILE), "run", "--rm", "test"],
            ).returncode == 0),
        ],
        "verbosity": 2,
    }


def task_lint():
    """Run linting inside docker."""
    return {
        "actions": [(lambda: run_compose("run", "--rm", "lint"))],
        "verbosity": 2,
    }


def task_migrate():
    """Run database migrations."""
    return {
        "actions": [(lambda: run_compose("run", "--rm", "migrate"))],
        "verbosity": 2,
    }


def task_migration():
    """Create new database migration."""
    return {
        "actions": [(lambda: run_compose("run", "--rm", "migration"))],
        "verbosity": 2,
    }


def task_docs():
    """Start documentation server."""
    return {
        "actions": [(lambda: run_compose("up", "docs"))],
        "verbosity": 2,
    }


def task_cleanup():
    """Clean up docker resources."""
    return {
        "actions": [(lambda: run_compose("down", "-v", "--remove-orphans"))],
        "verbosity": 2,
    }


def task_rebuild():
    """Rebuild docker images from scratch."""
    return {
        "actions": [
            (lambda: run_compose("down", "-v")),
            (lambda: run_compose("build", "--no-cache")),
        ],
        "verbosity": 2,
    }