const moment = require('moment');

exports.validateInvoiceData = (rows) => {
  const errors = [];
  const invoiceNumbers = new Set();


  // Iterate through all rows and validate them
  rows.forEach((row, index) => {
    const rowErrors = [];

    // Required field validation
    if (!row['Invoice Number']) {
      rowErrors.push('Invoice Number is required');
    }
    if (!row['Date']) {
      rowErrors.push('Date is required');
    }
    if (!row['Customer Name']) {
      rowErrors.push('Customer Name is required');
    }
    if (!row['Total Amount']) {
      rowErrors.push('Total Amount is required');
    }
    if (!row['Item Description']) {
      rowErrors.push('Item Description is required');
    }
    if (!row['Item Quantity']) {
      rowErrors.push('Item Quantity is required');
    }
    if (!row['Item Price']) {
      rowErrors.push('Item Price is required');
    }
    if (!row['Item Total']) {
      rowErrors.push('Item Total is required');
    }

    // Date format validation
    if (row['Date'] && !moment(row['Date'], 'YYYY-MM-DD', true).isValid()) {
      rowErrors.push('Invalid date format (must be YYYY-MM-DD)');
    }

    // Numeric value validation
    if (row['Total Amount'] && isNaN(row['Total Amount'])) {
      rowErrors.push('Total Amount must be a valid number');
    }
    if (row['Item Quantity'] && isNaN(row['Item Quantity'])) {
      rowErrors.push('Item Quantity must be a valid number');
    }
    if (row['Item Price'] && isNaN(row['Item Price'])) {
      rowErrors.push('Item Price must be a valid number');
    }
    if (row['Item Total'] && isNaN(row['Item Total'])) {
      rowErrors.push('Item Total must be a valid number');
    }

    // Unique invoice number validation
    if (row['Invoice Number']) {
      if (invoiceNumbers.has(row['Invoice Number'])) {
        rowErrors.push(`Duplicate invoice number found: ${row['Invoice Number']}`);
      } else {
        invoiceNumbers.add(row['Invoice Number']);
      }
    }

    // Add errors to the errors array
    if (rowErrors.length > 0) {
      errors.push({
        row: index + 1,  // For better readability, start from 1
        errors: rowErrors
      });
    }
  });

  return errors;
};
