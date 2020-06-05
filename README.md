# NodeJS backend of PsyTrack, mental health app project

## Setup

## JWT Authentication

This project uses JWT for its authentication system, in order for this to work RS256 private and public keys for authentication and refresh token, must be provided.

Create a `keys` folder in the `src` directory that include both `private.key` and `public.key` files, example:

Keys for the authentication token:

```
src/keys/private.key
src/keys/public.key
```

Keys for the refresh token:

```
src/keys/refresh/private.key
src/keys/refresh/public.key
```

Read more on jsonwebtoken [here](https://github.com/auth0/node-jsonwebtoken).

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
