#docker build -t planningpoker .
#docker run -p 4200:4200 -p 5000:5000 -v /home/ipnp/share/PlanningPoker/data:/app/PlanningPoker/data -dit planningpoker
#docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <containerid>

FROM node:20.17.0-alpine3.20 AS builder

ARG http_proxy
ARG https_proxy

WORKDIR /app/PlanningPoker
COPY ./package.json .
RUN npm install --omit=dev
