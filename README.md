# fullstack project

Group school assignment (fullstack course) by [Fredrik Wetterlöv, Robin Cobanov, Pete the pete, Feniix and Hans Strömquist]

Using Node, React, Vite, react-bootstrap and react-router.

First install:

npm install

Then run:

node server.js (or something like that)
npm run dev

Started 2023-04-04


# Development env setup (docker):
$ docker-compose up  - this will start necessary containers

P.S. Access to DB should be granted for the IP of machine used for development.


## Dev env start
1. $ sudo ./startup.sh  (This will start necessary container and vite)
2. $ sudo docker exec -it fsf nodemon server.js  (To start backend)
