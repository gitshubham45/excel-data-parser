const invoiceService = require('../services/invoiceService');
const processInvoices = require('../utils/processInvoice');

exports.uploadAndProcessFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    const result = await invoiceService.processFile(req.file.path);
    processInvoices(result?.processedData);
    res.json({ message: 'File processed successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error processing file', error: error.message });
  }
};
