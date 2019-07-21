# JSON-MySQL

- Small package to generate MySQL Table structure from a given JSON or Array. 

**Changelog**
- Version 1.1: 
- Add BIGINT(20) support for Timestamps
- Fix a bug where DEFAULT were EFAULT

# How to use

```
// From JSON:

const json_mysql = require("json_mysql");

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

/*
CREATE TABLE IF NOT EXISTS `Candlechart` (
`symbol` VARCHAR (255)  NOT NULL,
`priceChange` FLOAT DEFAULT '0',
`priceChangePercent` FLOAT DEFAULT '0',
`weightedAvgPrice` FLOAT DEFAULT '0',
`prevClosePrice` FLOAT DEFAULT '0',
`lastPrice` FLOAT DEFAULT '0',
`lastQty` FLOAT DEFAULT '0',
`bidPrice` FLOAT DEFAULT '0',
`bidQty` INT (10)  DEFAULT '0',
`askPrice` FLOAT DEFAULT '0',
`askQty` FLOAT DEFAULT '0',
`openPrice` FLOAT DEFAULT '0',
`highPrice` FLOAT DEFAULT '0',
`lowPrice` FLOAT DEFAULT '0',
`volume` FLOAT DEFAULT '0',
`quoteVolume` FLOAT DEFAULT '0',
`openTime` BIGINT (20)  DEFAULT '0',
`closeTime` BIGINT (20)  DEFAULT '0',
`firstId` INT (10)  DEFAULT '0',
`lastId` INT (10)  DEFAULT '0',
`count` INT (10)  DEFAULT '0'
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;
*/

// From array:

let test_array = [1563494940000, 10583.8, 10595.9, 10570.8, 10581.2, 41.40723];

let table2 = new json_mysql("Candlechart array", test_array);

console.log(table2.query);

/*
CREATE TABLE IF NOT EXISTS `Candlechart array` (
`0` BIGINT (20)  DEFAULT '0',
`1` FLOAT DEFAULT '0',
`2` FLOAT DEFAULT '0',
`3` FLOAT DEFAULT '0',
`4` FLOAT DEFAULT '0',
`5` FLOAT DEFAULT '0'
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4;
*/


```
