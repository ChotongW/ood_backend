const multer = require("multer");
const path = require("path");

class StorageController {
  constructor() {
    const storage = multer.diskStorage({
      destination: (req, file, callback) => {
        const uploadPath = path.join(__dirname, "../upload");
        callback(null, uploadPath);
      },
      filename: (req, file, callback) => {
        callback(
          null,
          "file-" +
            Date.now() +
            "." +
            file.originalname.split(".")[
              file.originalname.split(".").length - 1
            ]
        );
      },
    });

    this.upload = multer({ storage: storage });
    this.multerMiddleware = this.multerMiddleware.bind(this);
  }

   multerMiddleware(req, res, next) {
    // Perform any desired actions here
    this.upload.single("file")(req, res, function (err) {
        if (err) {
          console.log(err)
          return res.status(400).send({ message: 'Error uploading file.' });
        } else {
          next();
        }
      
    });
  }
}

module.exports = StorageController;
