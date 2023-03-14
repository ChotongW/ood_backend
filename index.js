const express = require("express");
const app = express();
const test = require("./routes/test");
const authen = require("./routes/authen");
const payment = require("./routes/payment");
const user = require("./routes/user");
const insurance = require("./routes/insurance");
const reservation = require("./routes/reservation");

const vehicles = require("./routes/vehicles");

const port = process.env.PORT || 5500;

const cors = require("cors");
const bodyParser = require("body-parser");
var morgan = require("morgan");
// create "morgan middleware"
app.use(morgan("common"));

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const vehiclesRouter = new vehicles();
app.use("/vehicle", vehiclesRouter.getRouter());
app.use("/test", test);
app.use("/authen", authen);

const reservationRouter = new reservation();
app.use("/booking", reservationRouter.getRouter());
app.use("/payment", payment.router);
app.use("/user", user);
app.use("/insurance", insurance);

// db.connect(function (err) {
//     if (err) {
//         return console.error('error: ' + err.message);
//     }
//     console.log('Connected to the MySQL server.');
// })

app.get("/", (req, res) => {
  res.send("Home page");
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
