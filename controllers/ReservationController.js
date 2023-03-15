const ReservationDMC = require("../dmc/reservationDMC");
const BillController = require("./billController");
const VehiclesController = require("./VehiclesController");
var uuid = require("uuid");

class ReservationController {
  constructor() {
    this.reservationDMC = new ReservationDMC();
    this.billController = new BillController();
    this.vehiclesController = new VehiclesController();
  }
  async getSummary(req, res) {
    let packageID = req.query.packageID;
    let vehicleID = req.query.carId;
    let start_date = req.query.bookDate;
    let end_date = req.query.returnDate;

    if (
      packageID == null ||
      vehicleID == null ||
      start_date == null ||
      end_date == null
    ) {
      res.send({ message: "some fields are unfilled." }, 400);
      return;
    }
    let packageCost = await this.reservationDMC.getPackageCost(packageID);
    let vehicleCost = await this.vehiclesController.getVehicleCost(vehicleID);

    if (packageCost instanceof Error) {
      res.send(packageCost.message, 500);
      return;
    } else if (vehicleCost instanceof Error) {
      res.send(vehicleCost.message, 500);
      return;
    }

    try {
      let diffDays =
        parseInt(end_date.split("-")[2], 10) -
        parseInt(start_date.split("-")[2], 10);
      let amount_balance = (diffDays + 1) * (vehicleCost + packageCost);
      let tax_amount = amount_balance * 0.07;
      let total_amount = amount_balance + tax_amount;

      res.send({
        amount_balance: amount_balance,
        tax_amount: tax_amount,
        total_amount: total_amount,
      });
    } catch (err) {
      console.log(err);
      res.send(err, 500);
      return;
    }
  }

  async handleBooking(req, res) {
    // let id_no = req.userData.id;
    // let amount_balance = parseInt(req.body.amount_balance, 10);
    // let tax_amount = parseInt(req.body.tax_amount, 10);
    // let total_amount = parseInt(req.body.total_amount, 10);
    let id_no = req.userData.id;
    // let id_no = req.body.id;
    let vehicleID = req.body.carId;
    let packageID = req.body.packageID;
    let start_date = req.body.bookDate;
    let end_date = req.body.returnDate;

    let availability = await this.vehiclesController.getVehiclesAval(vehicleID);
    if (availability instanceof Error) {
      res.send(availability.message, 500);
      return;
    } else if (availability === 0) {
      res.send({ message: "this car is booked already" }, 400);
      return;
    }

    let packageCost = await this.reservationDMC.getPackageCost(packageID);
    let vehicleCost = await this.vehiclesController.getVehicleCost(vehicleID);
    if (packageCost instanceof Error) {
      res.send(packageCost.message, 500);
      return;
    } else if (vehicleCost instanceof Error) {
      res.send(vehicleCost.message, 500);
      return;
    }

    try {
      let diffDays =
        parseInt(end_date.split("-")[2], 10) -
        parseInt(start_date.split("-")[2], 10);
      let amount_balance = (diffDays + 1) * (vehicleCost + packageCost);
      let tax_amount = amount_balance * 0.07;
      let total_amount = amount_balance + tax_amount;
      let total_vehicleCost = vehicleCost * (diffDays + 1);
      let total_packageCost = packageCost * (diffDays + 1);

      let [result, book_id] = await this.insertBooking(req, res);

      if (result instanceof Error) {
        res.send(result, 500);
        console.log(result);
        return;
      } else {
        // res.send(result, 201);
        // return result;
        console.log(result);

        let response = await this.billController.createBill(
          amount_balance,
          tax_amount,
          total_amount,
          id_no,
          book_id,
          total_vehicleCost,
          total_packageCost
        );
        if (response.err != undefined || response instanceof Error) {
          console.log(response);
          res.send(response, 500);

          let cancelRes = await this.reservationDMC.cancleReservation(book_id);
          console.log(cancelRes);
          return;
        } else {
          console.log(response);
          res.send(response, 201);
          let updateAval = await this.vehiclesController.setAval(vehicleID);
          console.log(updateAval);
          return;
        }
      }
    } catch (err) {
      console.log(err);
      res.send(err.message, 500);
      return;
    }
  }

  async insertBooking(req, res) {
    let vehicle_id = req.body.carId;
    let start_date = req.body.bookDate;
    let end_date = req.body.returnDate;
    let packageID = req.body.packageID;
    let id_no = req.userData.id;
    // let id_no = req.body.id;
    var id = uuid.v4();

    if (packageID === "") {
      packageID = null;
    }
    let result = await this.reservationDMC.createReservation(
      id,
      vehicle_id,
      id_no,
      packageID,
      start_date,
      end_date,
      "current"
    );
    return [result, id];
  }
}

module.exports = ReservationController;
