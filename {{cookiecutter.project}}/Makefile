start:
	docker system prune
	docker-compose up --build

sh:
	docker-compose run --rm backend python manage.py shell

mm:
	docker-compose run --rm backend python manage.py makemigrations

m:
	docker-compose run --rm backend python manage.py migrate

fm:
	docker exec -it $(notdir $(CURDIR))_backend_1 python manage.py makemigrations
	docker exec -it $(notdir $(CURDIR))_backend_1 python manage.py migrate

createsuperuser:
	docker-compose run --rm backend python manage.py createsuperuser

frontend_run:
	docker-compose run --rm frontend bash -c "$(cmd)"

backend_run:
	docker-compose run --rm backend bash -c "$(cmd)"

brun:
	docker exec -it $(notdir $(CURDIR))_backend_1 bash -c "$(cmd)"

frun:
	docker exec -it $(notdir $(CURDIR))_frontend_1 bash -c "$(cmd)"

bbash:
	docker exec -it $(notdir $(CURDIR))_backend_1 bash

fbash:
	docker exec -it $(notdir $(CURDIR))_frontend_1 bash

shell:
	docker exec -it $(notdir $(CURDIR))_backend_1 python manage.py shell

piplock:
	docker-compose run --rm backend pipenv lock

clean_all_dockers:
	docker system prune
	docker system prune -a
