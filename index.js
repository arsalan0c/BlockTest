
const blockchain = require('./my_blockchain');

blockchain.initBlockchain();
blockchain.addNewBlock(blockchain.createNewBlock('First'));
blockchain.addNewBlock(blockchain.createNewBlock('Second'));

console.log(blockchain.blocks);