const fs = require('fs');
const xml2json = require('xml2json');
const readFileAsync = util.promisify(fs.readFile);

// create objects for the transactions to loop through data and apply rules
const processors = [
  {
    name: "TSYS",
    feeTransactionRule: 50.00,
    flatRateLow: 0.10,
    saleAmountPercentageLow: .01,
    flatRateHigh: 0.10,
    saleAmountPercentageHigh: .02,
  },
  {
    name: "firstData",
    feeTransactionRule: 50.00,
    flatRateLow: 0.08,
    saleAmountPercentageLow: .0125,
    flatRateHigh: 0.90,
    saleAmountPercentageHigh: .01,
  },
  {
    name: "EVO",
    feeTransactionRule: 50.00,
    flatRateLow: 0.09,
    saleAmountPercentageLow: .011,
    flatRateHigh: 0.20,
    saleAmountPercentageHigh: .015,
  },
]

class Transactions {
  read() {
    return readFileAsync('transaction/transactions.xml', 'utf8');
  }

  // convert xml to json and parsed from string to object. 
  getTransactionData() {
    return this.read().then((xml) => {
      let json = xml2json.toJson(xml, { object: true });
      // pass xml2json into converter npm package 
      // return json file 
      // parse json string into object
      return json;

    });
  }
  calculateTransactionTotals(data) {
    let salesData = data.transactions.tran;
    let processorFees = {};
    // Iterate over the objects in the array to get the total amount of transactions
    //   for (const { type, amount, refNo } of salesData) {
    //   total += Number(amount); 
    // }
    // loopng through processors objects and calculate transaction fees. 
    for (const { name, feeTransactionRule, flatRateLow, saleAmountPercentageLow, flatRateHigh, saleAmountPercentageHigh, feeTotal } of processors) {
      let total = 0.00;
      for (const { type, amount, refNo } of salesData) {
        if (amount <= feeTransactionRule) {
          total += (amount * saleAmountPercentageLow) + flatRateLow;
        }
        else {
          total += (amount * saleAmountPercentageHigh) + flatRateHigh;
        }
      }
      processorFees[name] = parseFloat(total).toFixed(2);
    }

      return processorFees;
  }
}


module.exports = new Transactions();
