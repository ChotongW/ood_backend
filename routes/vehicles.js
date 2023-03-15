const express = require("express");
const bodyParser = require("body-parser");
const VehiclesController = require("../controllers/VehiclesController");
const StorageController = require("../controllers/storageController");
const userMiddleware = require("../middleware/role");

class VehiclesRouter {
  constructor() {
    this.router = express.Router();
    this.router.use(express.json());
    this.router.use(bodyParser.urlencoded({ extended: true }));
    this.vehiclesController = new VehiclesController();
    this.StorageControllerInstance = new StorageController();
    this.initRoutes();
  }

  initRoutes() {
    this.router.get(
      "/",
      this.vehiclesController.getAllVehicles.bind(this.vehiclesController)
    );
    this.router.get(
      "/:carId",
      this.vehiclesController.getVehicleByID.bind(this.vehiclesController)
    );
    this.router.get(
      "/search",
      this.vehiclesController.getVehiclesSearch.bind(this.vehiclesController)
    );
    this.router.post(
      "/",
      userMiddleware.isAdmin,
      this.StorageControllerInstance.multerMiddleware.bind(
        this.StorageControllerInstance
      ),
      this.vehiclesController.addCar.bind(this.vehiclesController)
    );
    this.router.put(
      "/",
      userMiddleware.isAdmin,
      this.StorageControllerInstance.multerMiddleware.bind(
        this.StorageControllerInstance
      ),
      this.vehiclesController.updateCar.bind(this.vehiclesController)
    );
    this.router.delete(
      "/delete",
      userMiddleware.isAdmin,
      this.vehiclesController.deleteCar.bind(this.vehiclesController)
    );
  }

  getRouter() {
    return this.router;
  }
}

module.exports = VehiclesRouter;
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
