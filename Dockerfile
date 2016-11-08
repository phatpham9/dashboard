FROM risingstack/alpine:3.4-v6.9.1-4.1.0
MAINTAINER Phat Pham <phatpham9@gmail.com>

ADD . /opt/dashboard
WORKDIR /opt/dashboard

RUN npm install -g bower grunt-cli
RUN npm install
RUN bower install --allow-root
RUN npm run build:prod

ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 9000
ENV DB_HOST mongo

EXPOSE 9000

CMD [ "node", "server/app.js" ]