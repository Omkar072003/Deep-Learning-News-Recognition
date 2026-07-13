# Docker Deployment

- Build the Docker image:
docker build -t content-recognition-backend .

- Run the container:
docker run -d -p 5000:5000 content-recognition-backend

- Multi-service setup with docker-compose:
docker-compose up --build

undefined