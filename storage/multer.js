const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./upload");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      "file-" +
        Date.now() +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

// class FileUploader {
//   constructor() {
//     this.storage = multer.diskStorage({
//       destination: (req, file, callback) => {
//         callback(null, "./upload");
//       },
//       filename: (req, file, callback) => {
//         callback(
//           null,
//           "file-" +
//             Date.now() +
//             "." +
//             file.originalname.split(".")[
//               file.originalname.split(".").length - 1
//             ]
//         );
//       },
//     });

//     // this.upload = multer({
//     //   storage: this.storage,
//     //   fileFilter: (req, file, callback) => {
//     //     if (allowedTypes.includes(file.mimetype)) {
//     //       callback(null, true);
//     //     } else {
//     //       callback(new Error("Invalid file type"));
//     //     }
//     //   },
//     // });
//     this.upload = multer({ storage: storage });
//   }
// }

// module.exports = FileUploader;
