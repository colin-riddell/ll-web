docker build -t web-portal:latest-CI .
docker build -t web-portal -f Dockerfile-runtime --build-arg imageName=web-portal:latest-CI .

