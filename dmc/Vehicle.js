const { rejects } = require("assert");
const { resolve } = require("path");
const db = require("../config/db");

class Vehicle {
  constructor(
    vehicle_id,
    carName,
    brand,
    year,
    availability,
    cost,
    type_id,
    vehicle_img,
    seats,
    doors,
    gear_type
  ) {
    this.vehicle_id = vehicle_id;
    this.name = carName;
    this.brand = brand;
    this.year = year;
    this.availability = availability;
    this.cost = cost;
    this.type_id = type_id;
    this.vehicle_img = vehicle_img;
    this.seats = seats;
    this.doors = doors;
    this.gear_type = gear_type;
  }

  async addCar() {
    const query = `INSERT INTO vehicles
                       VALUE ('${this.vehicle_id}', '${this.name}','${this.brand}','${this.year}','${this.cost}','${this.availability}','${this.type_id}','${this.vehicle_img}','${this.doors}','${this.gear_type}','${this.seats}')`;
    return new Promise((resolve, rejects) => {
      connection.query(query, (error, results) => {
        if (error) {
          rejects(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static async getCar() {
    const query = `SELECT * FROM vehicles`;

    return new Promise((resolve, rejects) => {
      connection.query(query, (error, results) => {
        if (error) {
          rejects(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static async deleteCar(vehicle_id) {
    let id = vehicle_id;
    const query = `DELETE FROM vehicles WHERE vehicle_id = '${id}'`;

    return new Promise((resolve, reject) => {
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  static async updateCar(vehicle) {
    let id = vehicle.vehicle_id;
    const words = vehicle.name.split(/\s+/);
    const query = `UPDATE vehicles SET seats = '${vehicle.seats}', doors = '${vehicle.doors}', gear_type = '${vehicle.gear_type}', vehicle_img = '${vehicle.vehicle_img}', name = '${words[1]}', brand = '${words[0]}', year = '${words[2]}', cost = '${vehicle.cost}', type_id = '${vehicle.type_id}' where  vehicle_id = '${id}'`;

    return new Promise((resolve, reject) => {
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = Vehicle;
