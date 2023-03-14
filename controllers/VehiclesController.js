const VehiclesDMC = require("../dmc/vehiclesDMC");
const BlobCarController = require("./blobCarController");
const fs = require("fs");
class VehiclesController {
  constructor() {
    this.vehiclesDMC = new VehiclesDMC();
    this.blobCarController = new BlobCarController();
  }
  async getAllVehicles(req, res) {
    let result = await this.vehiclesDMC.getAllVehicles();

    if (result instanceof Error) {
      res.send(result, 500);
      return;
    } else if (result.length === 0) {
      res.send({ msg: "no data found" }, 200);
      return;
    } else {
      //   console.log(result.length);
      res.send(result, 200);
      return;
    }
  }

  async getVehiclesSearch(req, res) {
    let brand = req.query.brand;
    let result = await this.vehiclesDMC.getVehiclesSearch(brand);
    if (result instanceof Error) {
      res.send(result, 500);
      return;
    } else if (result.length === 0) {
      res.send({ msg: "no data found" }, 200);
      return;
    } else {
      //   console.log(result.length);
      res.send(result, 200);
      return;
    }
  }
  async setAval(vehicleID) {
    let result = await this.vehiclesDMC.setAval(vehicleID);
    if (result instanceof Error) {
      //   res.send(result, 500);
      return result;
    } else if (result.length === 0) {
      //   res.send({ msg: "no data found" }, 200);
      return { msg: "no data found" };
    } else {
      //   console.log(result.length);
      //   res.send(result, 200);
      return result;
    }
  }

  async addCar(req, res) {
    let vehicleID = req.body.carId;
    let carModel = req.body.carName;
    let cost = parseInt(req.body.price, 10);
    let type_id = parseInt(req.body.typeId, 10);
    let seats = req.body.seats;
    let doors = req.body.doors;
    let gear_type = req.body.gear_type;
    let imgFile = req.file;

    let brand = carModel.split(" ")[0];
    let carName = carModel.split(" ")[1];
    let year = carModel.split(" ")[2];

    try {
      let imgURL = await this.blobCarController.uploadBlob(imgFile);
      fs.unlink(imgFile.path, (err) => {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log("Local file deleted!");
      });
      // vehicle.vehicle_img = imgURL;
      let response = await this.vehiclesDMC.addCar(
        vehicleID,
        carName,
        brand,
        year,
        cost,
        type_id,
        seats,
        doors,
        gear_type,
        imgURL
      );
      if (response instanceof Error) {
        res.send(response, 500);
        return;
      } else {
        //   console.log(response.length);
        res.status(200).send(response);
        return;
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
      return;
    }
  }

  async updateCar(req, res) {
    let vehicleID = req.body.carId;
    let imgFile = req.file;

    if (imgFile == null) {
      let imgURL = await this.vehiclesDMC.getVehiclesImg(vehicleID);
      this.doEdit(req, imgURL, vehicleID);
    } else {
      try {
        let imgURL = await this.blobCarController.uploadBlob(imgFile);
        let response = this.doEdit(req, imgURL, vehicleID);

        if (response instanceof Error) {
          res.send(response, 500);
        } else {
          //   console.log(response.length);
          res.send(response, 200);
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
      }
    }
  }

  async doEdit(req, imgURL, vehicleID) {
    let carName = req.body.carName;
    let brand = req.body.brand;
    let year = req.body.year;
    let cost = parseInt(req.body.cost);
    let type_id = parseInt(req.body.type_id);
    let seats = req.body.seats;
    let doors = req.body.doors;
    let gear_type = req.body.gear_type;

    try {
      let response = await this.vehiclesDMC.updateCar(
        vehicleID,
        carName,
        brand,
        year,
        cost,
        type_id,
        seats,
        doors,
        gear_type,
        imgURL
      );
      return response;
    } catch (err) {
      // console.error(err);
      // res.status(500).json({ error: "Server error" });
      return err;
    }
  }

  async deleteCar(req, res) {
    let vehicleID = req.params.car_id;
    try {
      let check = await this.vehiclesDMC.getVehiclesID(vehicleID);
      if (!check) {
        res.status(404).send({ error: "Car not found" });
      }
      await this.vehiclesDMC.deleteCar(car_id);
      res.status(404).send({ message: "Car deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Server error" });
    }
  }
}

module.exports = VehiclesController;
