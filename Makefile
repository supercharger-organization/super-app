docker-build:
	docker build --tag super-app:1.0 .

docker-run-prod:
	docker run -d --restart unless-stopped -p 80:80 --name super-app super-app:1.0

docker-run-dev:
	docker run --restart unless-stopped -p 4200:80 --name super-app super-app:1.0

dev:
	ng serve

prod:
	ng serve --prod=true