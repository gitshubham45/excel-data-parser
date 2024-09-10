const fs = require('fs');
const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');
const xlsx = require('xlsx');

// Function to write CSV with errors
exports.writeCSVWithErrors = async (filePath, rows) => {

  const csvWriter = createObjectCsvWriter({
    path: filePath,
    header: [
      { id: 'Invoice Number', title: 'Invoice Number' },
      { id: 'Date', title: 'Date' },
      { id: 'Customer Name', title: 'Customer Name' },
      { id: 'Total Amount', title: 'Total Amount' },
      { id: 'Item Description', title: 'Item Description' },
      { id: 'Item Quantity', title: 'Item Quantity' },
      { id: 'Item Price', title: 'Item Price' },
      { id: 'Item Total', title: 'Item Total' },
      { id: 'Errors', title: 'Errors' }  // New column for errors
    ]
  });

  await csvWriter.writeRecords(rows);
};

// Function to write Excel with errors
exports.writeExcelWithErrors = async (filePath, rows) => {

  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Ensure that the Errors column is present in the original sheet
  const headers = xlsx.utils.sheet_to_json(worksheet, { header: 1 })[0];
  if (!headers.includes('Errors')) {
    headers.push('Errors');  // Add Errors header if missing
  }

  // Prepare the modified data
  const modifiedData = rows.map(row => ({
    ...row,
    Errors: row.Errors || ''
  }));

  // Convert the modified rows back into sheet format
  const newWorksheet = xlsx.utils.json_to_sheet(modifiedData, { header: headers });
  workbook.Sheets[sheetName] = newWorksheet;

  // Define the new file path for the Excel file with errors
  const newFilePath = path.join(path.dirname(filePath), `${path.basename(filePath, '.xlsx')}-with-errors.xlsx`);

  // Write the new Excel file
  xlsx.writeFile(workbook, newFilePath);

};
