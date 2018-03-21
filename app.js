const express = require('express');
const Web3 = require('web3');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

app.set('view engine', 'hbs');


app.get('/', (req, res) => {
	res.render('index');
});

app.listen(3000, () => {
	console.log("Listening on port 3000");
});