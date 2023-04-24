const getTransactions = () =>
  fetch('/api/transactions/total', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });



 





