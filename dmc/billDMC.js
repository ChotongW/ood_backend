const db = require("../config/db");

class BillDMC {
  async createBill(
    amount_balance,
    tax_amount,
    total_amount,
    book_id,
    billID,
    total_vehicleCost,
    total_packageCost
  ) {
    var sql =
      "INSERT INTO billing (bill_id, bill_status, book_id, amount_balance, total_amount, tax_amount, vehicleCost, packageCost) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    try {
      var result = await db.query(sql, [
        billID,
        "pending",
        book_id,
        amount_balance,
        total_amount,
        tax_amount,
        total_vehicleCost,
        total_packageCost,
      ]);
      return;
    } catch (err) {
      console.log(err);
      //   res.send(err, 500);
      return err;
    }
  }
}

module.exports = BillDMC;
