# The latest node is not working with current packages
FROM node:9.11.2

WORKDIR /code/client/

# Copy requirements and install them inside the container
COPY package*.json /code/client/
RUN npm install

# Copy all other files to the container
COPY ./ /code/client/
