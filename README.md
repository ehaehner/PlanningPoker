# PlanningPoker

The angular project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

## Installation

````
sudo apt-get install python3
pip install flask 
pip install requests 
pip install flask-restful 
pip install flask-socketio install
pip install eventlet
````

## WSL
Port Forwarding for WSL
````
netsh interface portproxy add v4tov4 listenport=5000 listenaddress=0.0.0.0 connectport=5000 connectaddress=127.0.0.1
netsh interface portproxy add v4tov4 listenport=4200 listenaddress=0.0.0.0 connectport=4200 connectaddress=127.0.0.1
````

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag
for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## starting python server

Run `npm run start-api` to start python server.

## TODOs

- Threading und Caching in Python
- Story Points direkt ins Jira übernehmen
