FROM node:12

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/frontend
WORKDIR /usr/src/frontend

# Installing dependencies
COPY package*.json /usr/src/frontend/
RUN npm install

# Copying source files
COPY . /usr/src/frontend

# Building app
RUN npm run build
EXPOSE 3005

# Running the app
CMD "npm" "run" "dev"