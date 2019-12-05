FROM node:alpine

RUN apk update && apk upgrade \
	&& apk add --no-cache git \
	&& apk --no-cache add --virtual builds-deps build-base python \
	&& npm install -g node-gyp node-pre-gyp && npm install

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app
RUN npm install

# Bundle app source
COPY . /app

EXPOSE 3000
CMD [ "npm", "run", "dev" ]