const connection = require("../services/database");

 const getStocks =async (req, res)=>{
    const barcode = req.params.barcode
    const [stocks] = await connection.query('select * from product where barcode ='+barcode);
    // const [stocks] = await connection.query('select * from stocks ');
    console.log(stocks);
    res.status(200).send(stocks);
 }

 const insert =async (req, res)=>{
    const num = req.body.num
    const id = req.body.id
    const name = req.body.name
    const qty = req.body.qty
    const price = req.body.price
    const sum = req.body.sum

    const [stocks] = await connection.query(`INSERT INTO slips (receipNo, productNo, productName, qty, price, priceSum) VALUES (?,?,?,?,?,?)`,[num, id, name, qty, price, sum]);

    console.log(stocks);
    res.status(200).send(stocks);
 }
//  const putStock = async (req,res)=>{
//     const productCode =req.body.productCode;
//     const barcode = req.body.barcode;
//     const price = req.body.price;
//     const productName = req.body.productName;
//     const groupProductCode = req.body.groupProductCode;
    
//     const [stock] = await connection.query(``);
//     res.status(200).send(stock)
//  }

module.exports = {
    getStocks,
    insert
}