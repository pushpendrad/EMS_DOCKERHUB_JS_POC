FROM ubuntu:14.04

RUN ln -s /usr/local/bin/node /usr/bin/node
RUN ln -s /usr/local/bin/gulp /usr/bin/gulp

#adding all the source code to /data/artifact
RUN mkdir -p "/data/artifact"
WORKDIR /data/artifact/
RUN apt-get update 

RUN apt-get install -y npm
RUN npm install -g nightwatch-html-reporter

#Adding the required source code and dependencies for running the application

#for CI
ADD node_modules node_modules
ADD coverage coverage
ADD models models
ADD html html
ADD lib lib
ADD tests tests
ADD target target
ADD routes routes
ADD gatling gatling
ADD app.js gruntfile.js package.json nightwatch.json nightwatch.js ./

#Setting timezone to match time zone of sonar server
RUN echo "Asia/Kolkata" > /etc/timezone && dpkg-reconfigure --frontend noninteractive tzdata

VOLUME ['./tmp']
 
EXPOSE 3010
