const express = require("express");
const bodyParser = require("body-parser");
const ReservationController = require("../controllers/ReservationController");

class ReservationRouter {
  constructor() {
    this.router = express.Router();
    this.router.use(express.json());
    this.router.use(bodyParser.urlencoded({ extended: true }));
    this.reservationController = new ReservationController();
    this.initRoutes();
  }

  initRoutes() {
    this.router.get(
      "/summary",
      this.reservationController.getSummary.bind(this.reservationController)
    );
    this.router.post(
      "/book",
      this.reservationController.handleBooking.bind(this.reservationController)
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = ReservationRouter;
// old code base
// const express = require("express");
// const bodyParser = require("body-parser");
// const reservationController = require("../controllers/ReservationController");
// router = express.Router();
// // router.use(express.json());
// // router.use(
// //   bodyParser.urlencoded({
// //     extended: true,
// //   })
// // );

// router.get("/summary", reservationController.getSummary);

// router.post("/book", reservationController.handleBooking);

// module.exports = router;
