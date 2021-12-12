#docker build -t planningpoker .
#docker run -p 4200:4200 -p 5000:5000 -v /home/ipnp/share/PlanningPoker/data:/app/PlanningPoker/data -dit planningpoker
#docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <containerid>

FROM node:17.2.0-slim

ARG http_proxy
ARG https_proxy

WORKDIR /app/PlanningPoker

COPY . .
RUN useradd -ms /bin/bash pokeruser
RUN chown -R pokeruser:pokeruser /app/PlanningPoker
USER pokeruser

RUN npm install
EXPOSE 4200
ENTRYPOINT ["npm", "start"]

