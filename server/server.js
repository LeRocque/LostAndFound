const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const itemController = require('./controllers/itemController');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req,res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
})

app.post('/', itemController.addItem, (req, res) => {

})

app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });