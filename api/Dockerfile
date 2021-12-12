FROM python:3

ARG http_proxy
ARG https_proxy

WORKDIR /usr/src/app

COPY . .
RUN pip install --no-cache-dir -r requirements.txt

CMD [ "python", "./api.py" ]

