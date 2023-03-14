const { parse } = require("uuid");
const Vehicle = require("../DMC/Vehicle");
const VehicleModel = require("../DMC/Vehicle");
const BlobCarController = require("./blobCarController");
class VehicleController {
  constructor() {
    this.blobCarController = new BlobCarController();
  }
  static async addCar(req, res) {
    let vehicle_id = req.body.vehicle_id;
    let name = req.body.name;
    let brand = req.body.brand;
    let year = req.body.year;
    let availability = parseInt(req.body.availability);
    let cost = parseInt(req.body.cost);
    let type_id = parseInt(req.body.type_id);
    let vehicle_img = req.body.vehicle_img;
    let seats = req.body.seats;
    let doors = req.body.doors;
    let gear_type = req.body.gear_type;
    let imgFile = req.file;
    const vehicle = new VehicleModel(
      vehicle_id,
      name,
      brand,
      year,
      availability,
      cost,
      type_id,
      vehicle_img,
      seats,
      doors,
      gear_type
    );
    console.log(vehicle);
    console.log(imgFile);

    try {
      let imgURL = await this.blobCarController.uploadBlob(imgFile);
      vehicle.vehicle_img = imgURL;
      await vehicle.addCar();
      res.status(201).json(vehicle);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }

  static async getCar(req, res) {
    try {
      const vehicles = await VehicleModel.getCar();
      res.json(vehicles);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }

  static async deleteCar(req, res) {
    let car_id = req.params.car_id;
    try {
      const vehicles = await VehicleModel.deleteCar(car_id);
      if (!vehicles) {
        return res.status(404).json({ error: "Car not found" });
      }
      await VehicleModel.deleteCar(car_id);
      res.json({ message: "Car deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }

  static async updateCar(req, res) {
    let car_id = req.body;
    console.log(car_id);
    try {
      const vehicles = await VehicleModel.updateCar(car_id);
      if (!vehicles) {
        return res.status(404).json({ error: "Car card not found" });
      }
      await VehicleModel.updateCar(car_id);
      res.json({ message: "Car updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
}

module.exports = VehicleController;
