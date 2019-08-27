const multiparty = require("connect-multiparty");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const fs = require("fs");
const app = require("express")();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const ImageSchema = new mongoose.Schema({ type: String });
const Image = mongoose.model("Image", ImageSchema);

let gfs = null;

mongoose.connection.on("connected", () => {
  gfs = new Grid(mongoose.connection.db, mongoose.mongo);
});

app.use(morgan("dev"));
app.post("/upload", multiparty(), (req, res) => {
  const writeStream = gfs.createWriteStream({
    filename: req.files.image.name,
    mode: "w",
    content_type: req.files.image.type,
    metadata: req.body
  });

  fs.createReadStream(req.files.image.path).pipe(writeStream);

  writeStream.on("close", file => {
    const image = new Image({ ...file, type: req.files.image.type });
    image.save().then(() => {
      fs.unlinkSync(req.files.image.path);
      return res.status(201).json(image);
    });
  });
});

app.get("/image/:id", async (req, res) => {
  const readStream = gfs.createReadStream({ _id: req.params.id });
  readStream.pipe(res);
});

app.use((req, res) => res.status(404).json({ error: "Not Found" }));

app.listen(3000, () => console.log("Server listening on port 3000"));
