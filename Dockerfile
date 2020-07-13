
FROM node:lts-buster
# Create app directory
WORKDIR /usr/src/app

# Installing dependencies
COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci

# Copying source files
COPY . /usr/src/app

EXPOSE 3000

# Running the app
CMD ["npm", "run", "dev"]