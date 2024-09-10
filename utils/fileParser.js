const csv = require('csv-parser');
const fs = require('fs');
const xlsx = require('xlsx');

exports.parseCSV = async (filePath) => {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => rows.push(data))
      .on('end', () => resolve(rows))
      .on('error', (error) => reject(error));
  });
};

exports.parseExcel = async (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(worksheet);
};


exports.convertToInvoiceJSON = (row) => {
  return {
    invoiceNumber: row['Invoice Number'],
    date: row.Date,
    customerName: row['Customer Name'],
    totalAmount: parseFloat(row['Total Amount']),
    item: [
      {
        description: row['Item Description'],
        quantity: parseInt(row['Item Quantity'], 10),
        price: parseFloat(row['Item Price']),
        total: parseFloat(row['Item Total']),
      },
    ],
  };
};
