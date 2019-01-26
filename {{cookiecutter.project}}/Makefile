start:
	docker system prune
	docker-compose up --build

createsuperuser:
	docker-compose run --rm backend python manage.py createsuperuser

frontend_run:
	docker-compose run --rm frontend bash -c "$(cmd)"

backend_run:
	docker-compose run --rm backend bash -c "$(cmd)"

clean_all_dockers:
	docker system prune
	docker system prune -a
