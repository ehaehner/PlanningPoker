#docker build -t planningpoker .
#docker run -p 4200:4200 -p 5000:5000 -v /home/ipnp/share/PlanningPoker/data:/app/PlanningPoker/data -dit planningpoker
#docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <containerid>

FROM centos:centos8

RUN yum install npm -y
RUN yum install openssh-server npm git python3 python3-pip vim -y

# Avoid cache purge by adding requirements first
#ADD ./requirements.txt /app/requirements.txt

WORKDIR /app/PlanningPoker

COPY . .
RUN useradd -ms /bin/bash pokeruser
RUN chown -R pokeruser:pokeruser /app/PlanningPoker
USER pokeruser

RUN pip3 install --user -r requirements.txt
RUN npm install
RUN printf "#!/bin/bash\nnpm start & npm run start-api" > startup.sh
RUN chmod 700 startup.sh
EXPOSE 4200
EXPOSE 5000
ENTRYPOINT ["/bin/sh", "/app/PlanningPoker/startup.sh"]
#RUN pip install -r requirements.txt

