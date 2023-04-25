const router = require('express').Router();
const transaction = require('../transaction/transactions');

// GET "/api/transactions/data" responds with all notes from the database
router.get('/transactions/data', (req, res) => {
  transaction
    .getTransactionData()
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => res.status(500).json(err));
});
// GET "/api/transactions/total responds with total of all transactions and append to HTML page
router.get('/transactions/total', (req, res) => {
  transaction
    .getTransactionData()
    .then((data) => {
      const total = transaction.calculateTransactionTotals(data);
      // const totalElement = document.createElement('h3');
      // totalElement.textContent = `Total Transactions: $${total}`;
      return res.json({ total: total });
    })
    .catch((err) => res.status(500).json(err));

});


module.exports = router;
