const express = require('express')
const {sendPdf } = require('./pdfController')
const pdfRoute = express.Router()

const multer  = require("multer")
const storage = multer.memoryStorage() // or use disk storage
const upload = multer({ storage })

pdfRoute.post('/sendPdf', upload.single("file"), sendPdf);

// pdfRoute.post('/sendPdf',sendPdf) //sent pdf to mail 

module.exports = pdfRoute