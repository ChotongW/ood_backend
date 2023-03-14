const db = require("../config/db");

class ReservationDMC {
  async getPackageCost(packageID) {
    var sql = "SELECT packageCost from package where packageID = ?";
    try {
      var result = await db.query(sql, packageID);
      if (result.length == 0) {
        // var packageCost = 0;
        return 0;
      } else {
        // console.log(result[0].packageCost);
        let packageCost = result[0].packageCost;
        return packageCost;
      }
    } catch (err) {
      console.log(err);
      //   res.send(err, 500);
      return err;
    }
  }

  async createReservation(
    book_id,
    vehicleID,
    id_no,
    packageID,
    start_date,
    end_date,
    status
  ) {
    var sql =
      "INSERT INTO reservation (book_id, vehicle_id, id_no, packageID, start_date, end_date, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
    try {
      await db.query(sql, [
        book_id,
        vehicleID,
        id_no,
        packageID,
        start_date,
        end_date,
        status,
      ]);
      let msg = { message: "created reservation already." };
      //   console.log(msg);
      return msg;
    } catch (err) {
      console.log(err);
      //   res.send(err, 500);
      return err;
    }
  }

  async cancleReservation(book_id) {
    var sql = "DELETE FROM reservation WHERE book_id = ?;";
    try {
      await db.query(sql, book_id);
      //   console.log({ message: "delete reservation already" });
      return { message: "delete reservation already" };
    } catch (err) {
      //   console.log(err);
      return err;
    }
  }
}

module.exports = ReservationDMC;
