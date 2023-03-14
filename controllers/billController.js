const BillDMC = require("../dmc/billDMC");
var uuid = require("uuid");

class BillController {
  constructor() {
    this.billDMC = new BillDMC();
    this.biilID = uuid.v4();
  }
  async createBill(
    amount_balance,
    tax_amount,
    total_amount,
    id_no,
    book_id,
    total_vehicleCost,
    total_packageCost
  ) {
    // console.log(amount_balance);
    // console.log(tax_amount);
    // console.log(total_amount);
    // console.log(id_no);
    // console.log(book_id);
    if (
      id_no == null ||
      amount_balance == null ||
      tax_amount == null ||
      total_amount == null ||
      book_id == null
    ) {
      console.log({ err: "parameters is undefine, create bill failed." });
      return { err: "parameters is undefine, create bill failed." };
    }

    let result = await this.billDMC.createBill(
      amount_balance,
      tax_amount,
      total_amount,
      book_id,
      this.biilID,
      total_vehicleCost,
      total_packageCost
    );

    if (result instanceof Error) {
      //   res.send(result, 500);
      return { err: result.Error };
    } else {
      //   console.log(result.length);
      let msg = { message: "created bill already.", BillID: this.biilID };
      return msg;
    }
    // try {
    //   let result = await db.query(sql, undefined);
    //   res.send(result);
    // } catch (err) {
    //   console.log(err);
    //   res.send(err, 500);
    //   return;
    // }
  }
}

module.exports = BillController;
