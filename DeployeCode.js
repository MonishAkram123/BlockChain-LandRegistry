const fs = require('fs');
const sol = require('solc');
const Web3 = require('web3');

const pathToSolidity = __dirname +'/SolidityCode/';
code = fs.readFileSync(pathToSolidity +'code.sol').toString();

compiledCode = sol.compile(code);
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


abiDefinition = JSON.parse(compiledCode.contracts[':Registry'].interface);
Registry = web3.eth.contract(abiDefinition);

byteCode = '0x' +compiledCode.contracts[':Registry'].bytecode;
interface = compiledCode.contracts[':Registry'].interface;
dc = Registry.new([], {data: byteCode, from: web3.eth.coinbase, gas: 4700000});
console.log('Address is ', dc.address);
fs.writeFileSync(pathToSolidity +'interface.json', interface);
if(dc != undefined)
	fs.writeFileSync(pathToSolidity +'contractAddress', dc.address);