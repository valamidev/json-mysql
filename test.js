const json_mysql = require(".");

let test_json = {
  symbol: "BNBUSDT",
  priceChange: "0.25700000",
  priceChangePercent: "1.141",
  weightedAvgPrice: "22.87744015",
  prevClosePrice: "22.52620000",
  lastPrice: "22.79040000",
  lastQty: "360.70000000",
  bidPrice: "22.79030000",
  bidQty: "50.00000000",
  askPrice: "22.80000000",
  askQty: "109.10000000",
  openPrice: "22.53340000",
  highPrice: "23.17720000",
  lowPrice: "22.50180000",
  volume: "1373730.45000000",
  quoteVolume: "31427436.15064300",
  openTime: 1556979660157,
  closeTime: 1557066060157,
  firstId: 25595647,
  lastId: 25639825,
  count: 44179
};

let table = new json_mysql("Candlechart", test_json);

console.log(table.query);

let test_array = [1563494940000, 10583.8, 10595.9, 10570.8, 10581.2, 41.40723];

let table2 = new json_mysql("Candlechart array", test_array);

console.log(table2.query);
