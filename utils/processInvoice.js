const { createInvoice } = require('../services/invoiceService');  // Assuming the service is in a file named invoiceService.js

// After validation, you would loop through valid invoices like this:
async function processInvoices(invoices) {
    console.log(invoices);
  for (const invoice of invoices) {
    const result = await createInvoice(invoice);
    
    if (result.success) {
      console.log(`Invoice ${invoice['Invoice Number']} processed successfully.`);
    } else {
      console.log(`Invoice ${invoice['Invoice Number']} failed to process.`);
    }
  }
}

module.exports = processInvoices;
