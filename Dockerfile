FROM node:6.3.1
RUN mkdir -p /app
COPY . /app
ADD package.json /app/package.json
WORKDIR /app
RUN npm install
RUN npm run clean
RUN npm run build
EXPOSE 8080
