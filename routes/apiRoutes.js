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
// GET "/api/transactions/total responds with total of all transactions
router.get('/transactions/total', (req, res) => {
  transaction
    .getTransactionData()
    .then((data) => {
      const total = transaction.calculateTransactionTotals(data);
      return res.json({total: total});
    })
    .catch((err) => res.status(500).json(err));


});


module.exports = router;
