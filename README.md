# NodeJS backend of Saiko 2020, mental health app project

## Setup

### MongoDb

Create a .env file that includes the following:

```
NODE_ENV=development
PORT=3000
MONGO_URL=mongodb://localhost:27017/mentalHealthDatabase
```

Replace the MongoDb database name (__mentalHealthDatabase__) with the one you wish to use. The docker container is setup to run MongoDb on port 27017.

## Build

Run the following:

```sh
npm install
npm run dev
```

The dev .sh script will take care of the Docker build setup.