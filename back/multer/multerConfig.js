const multer = require("multer")

const maxSize = 1 * 350 * 350

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(file)
    callback(null, "images")
  },
  filename: (req, file, callback) => {
    console.log("en multer",file)
    const name = file.originalname.split(".")[0].split(" ").join("_")
    const extension = MIME_TYPES[file.mimetype]
    callback(null, `${name + Date.now()}.${extension}`)
  },
})

module.exports = multer({ storage, limits: { fileSize: maxSize } }).single("image")
