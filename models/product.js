const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    username: { type: String },
    itemsids: { type: mongoose.Schema.Types.Mixed },
    itemsnames: { type: mongoose.Schema.Types.Mixed },

    itemsno: { type: mongoose.Schema.Types.Mixed },
    totalprice: { type: mongoose.Schema.Types.Mixed },
    totaldiscountprice: { type: mongoose.Schema.Types.Mixed },
    totaldiscount: { type: mongoose.Schema.Types.Mixed },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel;
