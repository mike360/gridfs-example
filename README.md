# gridfs-example

A simple example showing how to use [gridfs-stream](https://npmjs.com/package/gridfs-stream)
in an Express application.

## Setup

```
git clone https://github.com/mike360/gridfs-example.git && cd gridfs-example
yarn
```

When running locally, use a `.env` file for your MongoDB URI:

```
# adjust for whatever your URI is
echo MONGODB_URI=mongodb://localhost:27017/images > .env
```

Start up the server locally. The `dev` script uses [dotenv](https://npmjs.com/package/dotenv)
for parsing the `.env` file.

```
yarn dev
```

## Running in production

Make sure you have your `MONGODB_URI` environment variable set, and run
`yarn start` or `npm start` or whatever.
