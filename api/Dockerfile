FROM python:3.10.14-alpine AS builder

ARG http_proxy
ARG https_proxy

WORKDIR /usr/src/app

COPY . .
RUN pip install --no-cache-dir -r requirements.txt

ENTRYPOINT ["python", "api.py"]