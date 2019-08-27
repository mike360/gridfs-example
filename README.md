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

## Uploading an image

```
curl -F image=@./image.jpg http://127.0.0.1:3000/upload
```

This will return some JSON:

```
{"_id":"5d659ca6b7bbd0670c26993c","type":"image/jpeg","__v":0}
```

## Retrieving an image

Grab the `_id` field from the upload response and open the URL in browser: http://127.0.0.1:3000/image/5d659ca6b7bbd0670c26993c

## Running in production

This is a crude example and isn't production ready. You should be ensuring only
specific mime-types are accepted, not let just anybody upload stuff.

Make sure you have your `MONGODB_URI` environment variable set, and run
`yarn start` or `npm start` or whatever.
