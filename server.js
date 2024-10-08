const express = require('express');
const multer = require('multer');
const path = require('path');
const invoiceController = require('./controllers/invoiceController');

const app = express();

// Set up storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');  // Specify the uploads folder
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);  // Keep the original filename
    }
});

// Initialize multer with the defined storage
const upload = multer({ storage: storage });

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
