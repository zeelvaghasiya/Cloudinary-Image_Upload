const express = require("express");
const app = express();
const upload = require("./multer");
const cloudinary = require("./cloudinary");
const fs = require('fs');

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json("hey my name is zeel");
});

app.post("/upload-image", upload.array("image"), async (req, res) => {
  const uploader = async (path) => await cloudinary(path, "Images");

  if (req.method === "POST") {
    const urls = [];

    const files = req.files;

    for (const file of files) {
      const { path } = file;

      const newPath = await uploader(path);

      urls.push(newPath);

      fs.unlink(path,(err)=>{
        console.log("error",err);
      });
    }

    res.status(200).json({
        massage: "Image Upload successfully",
        data: urls,
    })
  } else {
    res.status(404).json({
      err: "Medical record not Uploaded Successfully",
    });
  }
});

app.listen(PORT, () => {
  console.log(`server listening you at port ${PORT}`);
});
