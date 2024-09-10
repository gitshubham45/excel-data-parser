const fs = require('fs');
const path = require('path');
const fileParser = require('../utils/fileParser');
const validators = require('../utils/validators');
const fileWriters = require('../utils/fileWriters');
const { constants } = require('buffer');

exports.processFile = async (filePath) => {
    const fileExtension = path.extname(filePath);
  
    let rows = [];
    if (fileExtension === '.csv') {
      rows = await fileParser.parseCSV(filePath);
    } else if (fileExtension === '.xlsx') {
      rows = await fileParser.parseExcel(filePath);
    } else {
      throw new Error('Unsupported file format');
    }

  
    // Validate the rows
    const validationErrors = validators.validateInvoiceData(rows);
  
    // Add validation errors to each row in the file
    validationErrors.forEach((errorObj) => {
      const { row, errors } = errorObj;
      rows[row - 1].Errors = errors.join(', ');
    });
  

    // Write errors back to file
    if (fileExtension === '.csv') {
      await fileWriters.writeCSVWithErrors(filePath, rows);
    } else if (fileExtension === '.xlsx') {
      await fileWriters.writeExcelWithErrors(filePath, rows);
    }
  
  
    return { processedData: rows.filter(row => !row.Errors), errors: validationErrors };
  };



  exports.createInvoice = async (invoice) => {
    return new Promise((resolve) => {
      console.log('Creating Invoice:', invoice);
  
      // Simulate success or failure
      const isSuccess = Math.random() > 0.2;  // Simulate 80% success rate
      if (isSuccess) {
        console.log('Invoice created successfully.');
        resolve({ success: true });
      } else {
        console.log('Failed to create invoice.');
        resolve({ success: false });
      }
    });
  };