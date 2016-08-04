FROM node:6.3.1
RUN mkdir -p /app
COPY . /app
WORKDIR /app
VOLUME .:/app
VOLUME /app/nodule_modules
RUN npm install
EXPOSE 8080
CMD ["npm", "run", "start"]
