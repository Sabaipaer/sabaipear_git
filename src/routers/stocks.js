const express = require("express");
const {getStocks, insert} = require("../controllers/stocks");
const router = express.Router();


router.get("/7-11/:barcode", getStocks);
router.post("/7-11", insert);

module.exports = router;