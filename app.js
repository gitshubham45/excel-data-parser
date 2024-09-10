const express = require('express');
const multer = require('multer');
const path = require('path');
const invoiceController = require('./controllers/invoiceController');

const app = express();



// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

// Route to render the upload form
app.get('/', (req, res) => {
    res.render('upload');  // Render the EJS form
});

// Route to handle the file upload
app.post('/upload', upload.single('file'), invoiceController.uploadAndProcessFile);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
