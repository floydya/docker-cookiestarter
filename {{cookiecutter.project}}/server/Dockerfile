FROM python:3.7
ENV PYTHONUNBUFFERED=1
WORKDIR /code/server
RUN apt-get update && apt-get install gettext -y
RUN pip install --upgrade pip==18.0 && pip install pipenv
COPY ./Pipfile ./Pipfile.lock /code/server/
RUN pipenv install --dev --system
COPY ./ /code/server/
