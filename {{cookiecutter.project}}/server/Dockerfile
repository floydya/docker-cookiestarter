FROM python:3.7
ENV PYTHONUNBUFFERED=1
WORKDIR /code/server
RUN apt-get update && apt-get install gettext -y
RUN pip install --upgrade pip==18.0 && pip install pipenv
COPY ./Pipfile ./Pipfile.lock /code/server/
RUN pipenv install --dev --system
COPY ./ /code/server/
ENV DJANGO_SECRET_KEY=CHANGEME!!!
ENV DJANGO_DB_URL=psql://postgres:postgres@db:5432/db
ENV DJANGO_CACHE_URL=redis://cache:6379
ENV CELERY_BROKER_URL=redis://cache:6379
CMD ["python", "manage.py", "migrate"]
CMD ["python", "manage.py", "makemessages", "--all -e py,html,jinja"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]