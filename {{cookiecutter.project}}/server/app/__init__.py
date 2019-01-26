# Celery state on project creation: {{ cookiecutter.celery }}d
{% if cookiecutter.celery == "Enable" %}
from app.celery import app as celery_app

__all__ = ['celery_app']
{% endif %}
