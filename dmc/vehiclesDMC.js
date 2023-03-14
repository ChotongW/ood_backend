const db = require("../config/db");
const { deleteCar } = require("./Vehicle");

class VehiclesDMC {
  async getAllVehicles() {
    let sql = "SELECT * FROM vehicles WHERE availability != 0 ORDER BY brand";
    try {
      let result = await db.query(sql, undefined);
      return result;
      //   res.send(result);
    } catch (err) {
      console.log(err);
      //   res.send(err, 500);
      return err;
    }
  }
  async getVehiclesSearch(brand) {
    var search = `%${brand}%`;
    //console.log(search);
    var sql = "SELECT * FROM vehicles WHERE brand like ? ORDER BY year DESC";
    try {
      var result = await db.query(sql, search);
      return result;
      //   res.send(result);
    } catch (err) {
      console.log(err);
      //   res.send(err, 500);
      return err;
    }
  }
  async setAval(vehicleID) {
    var sql = "UPDATE vehicles SET availability = ? where vehicle_id = ?";
    try {
      await db.query(sql, [0, vehicleID]);

      return { message: "update vehicles availability already" };
    } catch (err) {
      //   console.log(err);
      //   res.send(err, 500);
      return err;
    }
  }

  async getVehicleCost(vehicleID) {
    var sql = "SELECT cost from vehicles where vehicle_id = ?";
    try {
      let result = await db.query(sql, vehicleID);
      let vehicle_cost = result[0].cost;
      return vehicle_cost;
    } catch (err) {
      console.log(err);
      //   res.send(err, 500);
      return err;
    }
  }

  async getVehiclesAval(vehicleID) {
    var sql = "SELECT availability FROM vehicles WHERE vehicle_id  = ?";
    try {
      var result = await db.query(sql, vehicleID);
      // if success does below
      //console.log(result);
      let availability = result[0].availability;
      //let book_id = result[0].book_id;
      if (availability === 0) {
        // res.send({ message: "this car is booked already" }, 400);
        return 0;
      } else {
        return availability;
      }
    } catch (err) {
      console.log(err);
      //   res.send(500, { message: err });
      return err;
    }
  }

  async getVehiclesID(vehicleID) {
    let sql = "SELECT vehicle_id FROM vehicles WHERE vehicle_id = ?";
    try {
      let result = await db.query(sql, vehicleID);
      // if success does below
      //console.log(result);
      let vehicle_id = result[0].vehicle_id;
      return vehicle_id;
    } catch (err) {
      console.log(err);
      //   res.send(500, { message: err });
      return err;
    }
  }

  async getVehiclesImg(vehicleID) {
    let sql = "SELECT vehicle_img FROM vehicles WHERE vehicle_id = ?";
    try {
      let result = await db.query(sql, vehicleID);
      // if success does below
      //console.log(result);
      let vehicle_img = result[0].vehicle_img;
      return vehicle_img;
    } catch (err) {
      console.log(err);
      //   res.send(500, { message: err });
      return err;
    }
  }

  async addCar(
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
  ) {
    let sql =
      "INSERT INTO vehicles (vehicle_id, name,  brand, year, availability, cost, type_id, seats, doors, gear_type, vehicle_img) \
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    try {
      await db.query(sql, [
        vehicleID,
        carName,
        brand,
        year,
        1,
        cost,
        type_id,
        seats,
        doors,
        gear_type,
        imgURL,
      ]);
      let msg = { message: "created vehicle already." };
      //   console.log(msg);
      return msg;
    } catch (err) {
      console.log(err);
      //   res.send(err, 500);
      return err;
    }
  }

  async deleteCar(vehicleID) {
    var sql = "SELECT cost from vehicles where vehicle_id = ?";
    try {
      let result = await db.query(sql, vehicleID);
      let vehicle_cost = result[0].cost;
      return vehicle_cost;
    } catch (err) {
      console.log(err);
      //   res.send(err, 500);
      return err;
    }
  }

  async updateCar(
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
  ) {
    var sql =
      "INSERT INTO vehicles (vehicle_id, name,  brand, year, availability, cost, type_id, seats, doors, gear_type, vehicle_img) \
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    try {
      await db.query(sql, [
        vehicleID,
        carName,
        brand,
        year,
        1,
        cost,
        type_id,
        seats,
        doors,
        gear_type,
        imgURL,
      ]);
      let msg = { message: "update vehicle already." };
      //   console.log(msg);
      return msg;
    } catch (err) {
      console.log(err);
      //   res.send(err, 500);
      return err;
    }
  }
}

module.exports = VehiclesDMC;
