/*  .. one hash per block
    .. nonce: an integer
    .. data: composed of date, message, previous hash and index
    .. hash/block: composed of nonce + data + hashing algorithm for security [affects validity]
    .. hash validity: number of zeroes hash starts with [affects difficulty]
    .. hash difficulty: the higher the difficulty, the longer it takes to get a valid hash [affects time]
    				   If hash is not valid, data must change. So, nonce is incremented each time hash isn't valid
    .. Genesis block: necessary first block in the chain whose hash is composed of arbitrary data (there is no previous hash for it to use)
    .. If one block is changed, all subsequent blocks have to be changed (due to the previous hash requirement)
    .. In the case of differing blockchains, majority wins

*/

const sha256 = require('js-sha256').sha256;

const blockchain = (function() {
	const blocks = []; // array that holds the blocks of the blockchain

	// creates genesis block
	const initBlockchain = function() {
		console.log("Initializing the blockchain");
		const message = 'Hello World';
		const timestamp = new Date();
		const previousHash = 0;
		const index = 0;
		const genBlock = createBlock(message, timestamp, previousHash, index); // create and hash genesis block
		return addNewBlock(genBlock);

	};

	// adds new blocks to the chain
	const addNewBlock = function(block) {
		return blocks.push(block);
	};

	// creates only new blocks
	const createNewBlock = function(message) {
		const previousHash = getPreviousHash(blocks);
		const index = blocks.length;
		const newBlock = createBlock(message, new Date(), previousHash, index); // create the new block
		return newBlock;
	};

	// creates a block - new/genesis
	const createBlock = function(message, timestamp, previousHash, index) {
		let block = '';
		let nonce = 0;

		// keep 
		while (!isHashValid(block)) {
			let data = `${message}${timestamp}${previousHash}${index}${nonce}`; 
			block = sha256(data); // create a block (hashed by definition)
			nonce += 1;
			//console.log(block);
		}

		console.log(nonce);
		return block;
	};

	// needed to create a new block
	const getPreviousHash = function(blocks) {
		return blocks.slice(-1)[0]; // retrieves last element of blocks array, puts it in an array and then returns that element
	};

	// check validity of hash
	const isHashValid = function(hash) {
		return hash.startsWith('0000'); // hash difficulty - flexible set
	};

	// get array of all blocks
	const getAllBlocks = function() {
		return blocks;
	};

	return {
		initBlockchain,
		addNewBlock,
		createNewBlock,
		createBlock,
		getAllBlocks,
		blocks
	};
})();

module.exports = blockchain;