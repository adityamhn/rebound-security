# Dockerfile for MongoDB-HoneyProxy
FROM node:14

# Install MongoDB client
RUN apt-get update && apt-get install -y mongodb

# Set the working directory inside the container
WORKDIR /app

# Clone the MongoDB-HoneyProxy repository
RUN git clone https://github.com/Plazmaz/MongoDB-HoneyProxy.git .

# Install dependencies
RUN npm install

# Expose the default MongoDB port and the port used by the honeypot proxy
EXPOSE 27017

# Start the proxy when the container starts
CMD ["node", "index.js"]
