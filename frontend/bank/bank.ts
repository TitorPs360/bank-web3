import web3 from './web3';
import bank from './build/contracts/bank.json';

const instance = new web3.eth.Contract(bank.abi, '0x5FbDB2315678afecb367f032d93F642f64180aa3');

export default instance;
