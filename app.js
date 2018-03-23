const express = require('express');
const Web3 = require('web3');
const hbs = require('hbs');
const fs = require('fs');
const parser = require('body-parser');
const sha = require('sha256');

const pathToSolidity = __dirname +'/SolidityCode/';
var urlencodedParser = parser.urlencoded({ extended: true });
const app = express();
app.use(urlencodedParser);

app.set('view engine', 'hbs');


web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

abiDefinition = JSON.parse(fs.readFileSync(pathToSolidity +'interface.json'));
RegistryContract = web3.eth.contract(abiDefinition);

contractInstance = RegistryContract.at(fs.readFileSync(pathToSolidity +'contractAddress').toString());


app.get('/', (req, res) => {
	res.render('index');
});

app.post('/registerLand', (req, res) => {
	var name = req.body.owner;
	var city = req.body.city;
	var area = req.body.area;
	var khasraNumber = req.body.khasraNumber;
	var date = req.body.date;
	var transactionId = contractInstance.newRegistry(parseInt(sha(city +area +khasraNumber)), khasraNumber, name, date, {from: web3.eth.coinbase});
	console.log(transactionId);
	res.render('index');
});

app.post('/getLand', (req, res) => {
	var city = req.body.city;
	var area = req.body.area;
	var khasraNumber = req.body.khasraNumber;
	var result = contractInstance.getRegistry.call(parseInt(sha(city +area +khasraNumber)));
	res.send(result);
	console.log(result);
});


app.listen(3000, () => {
	console.log("Listening on port 3000");
});