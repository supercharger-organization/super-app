docker-run-detached:
	docker run -d --restart unless-stoppped --name super-app -p 80:80 robertrossilli/super-app:1.0

docker-run:
	docker run --restart unless-stoppped --name super-app -p 80:80 robertrossilli/super-app:1.0

dev:
	ng serve

prod:
	ng serve --prod=true