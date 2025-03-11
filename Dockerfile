FROM node:20.17-alpine

ARG http_proxy
ARG https_proxy

WORKDIR /app/PlanningPoker
COPY . .
RUN npm install --omit=dev

ENTRYPOINT ["npm", "start"]
