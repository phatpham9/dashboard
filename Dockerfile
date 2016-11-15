FROM risingstack/alpine:3.4-v6.9.1-4.1.0
MAINTAINER Phat Pham <phatpham9@gmail.com>

ADD . /opt/dashboard
WORKDIR /opt/dashboard

ENV	HOST 0.0.0.0
ENV	PORT 9000
ENV DB_NAME dashboard

RUN npm install -g bower grunt-cli \
	&& bower install --allow-root \
	&& npm install --production \
	&& npm install --only=dev \
	&& grunt build:prod

EXPOSE 9000

CMD [ "node", "server/app.js" ]