const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var assert = require('assert');

const source = fs.readFileSync('/Users/gim-yeon-ug/Desktop/Building-Eth.Dapp/ethereum/mocha/SimpleCoin/SimpleCoin.sol', 'utf8');
const compiledContract = solc.compile(source, 1);
const abi = compiledContract.contracts[':SimpleCoin'].interface;
const bytecode = '0x' + compiledContract.contracts[':SimpleCoin'].bytecode;
const gasEstimate = web3.eth.estimateGas({ data: bytecode }) + 100000;

const SimpleCoinContractFactory = web3.eth.contract(JSON.parse(abi));

describe('SimpleCoin', function() {
  this.timeout(5000);
  describe('SimpleCoin constructor', function() {	
    it('Contract owner is sender', function(done) {
	    //arrange 
		let sender = web3.eth.accounts[1];
		let initialSupply = 10000;

		//act
		let simpleCoinInstance = SimpleCoinContractFactory.new(initialSupply, {
			from: sender, data: bytecode, gas: gasEstimate}, 
			function (e, contract){
			if (typeof contract.address !== 'undefined') {
				//assert
				assert.equal(contract.owner(), sender);
				done();
			}
		});
    });
	
    it('Contract owner balance is equal to initialSupply', function(done) {
	    //arrange 
		let sender = web3.eth.accounts[1];
		let initialSupply = 10000;

		//act
		let simpleCoinInstance = SimpleCoinContractFactory.new(initialSupply, {
			from: sender, data: bytecode, gas: gasEstimate}, 
			function (e, contract){
			if (typeof contract.address !== 'undefined') {
				//assert
				assert.equal(contract.coinBalance(contract.owner()), initialSupply);
				done();
			}
		});
    });		
  });
  
  describe('transfer', function() {	
    it('Cannot transfer a number of tokens higher than number of tokens owned', function(done) {
	    //arrange 
		let sender = web3.eth.accounts[1];
		let initialSupply = 10000;
		let recipient = web3.eth.accounts[2];
		let tokensToTransfer = 12000;
		
		let simpleCoinInstance = SimpleCoinContractFactory.new(initialSupply, {
			from: sender, data: bytecode, gas: gasEstimate}, 
			function (e, contract){
			if (typeof contract.address !== 'undefined') {
				//act and assert
				assert.throws(
					()=> {
						contract.transfer(recipient, tokensToTransfer, {
							from:sender,gas:200000});
					},
					/VM Exception while processing transaction/
				);
				done();
			}
		});
    });
	it('Successful transfer: final sender and recipient balances are correct', function(done) {
	    //arrange 
		let sender = web3.eth.accounts[1];
		let initialSupply = 10000;
		let recipient = web3.eth.accounts[2];
		let tokensToTransfer = 200;
		
		let simpleCoinInstance = SimpleCoinContractFactory.new(initialSupply, {
			from: sender, data: bytecode, gas: gasEstimate}, 
			function (e, contract){
			if (typeof contract.address !== 'undefined') {
			
				//act
				contract.transfer(recipient, tokensToTransfer, {
					from:sender,gas:200000});
					
				//assert
				const expectedSenderBalance = 9800;
				const expectedRecipientBalance = 200;
				
				let actualSenderBalance = contract.coinBalance(sender);
				let actualRecipientBalance = contract.coinBalance(recipient);
				
				assert.equal(actualSenderBalance, expectedSenderBalance);
				assert.equal(actualRecipientBalance, expectedRecipientBalance);
	
				done();
			}
		});
    });
  });  
  
  describe('authorize', function() {	
	it('Successful authorization: the allowance of the authorized account is set correctly', function(done) {
	    //arrange 
		let sender = web3.eth.accounts[1];
		let initialSupply = 10000;
		let authorizer = web3.eth.accounts[2];
		let authorized = web3.eth.accounts[3];
		let allowance = 300;
		
		let simpleCoinInstance = SimpleCoinContractFactory.new(initialSupply, {
			from: sender, data: bytecode, gas: gasEstimate}, 
			function (e, contract){
			if (typeof contract.address !== 'undefined') {
			
				//act
				let result = contract.authorize(authorized, allowance, {
					from:authorizer,gas:200000});
														
				//assert
				assert.equal(contract.allowance(authorizer, authorized), 300);				
	
				done();
			}
		});
    });
  });  
  
  describe('transferFrom', function() {	
	it('Cannot transfer number of tokens higher than that owned by authorizer', function(done) {
	    //arrange 
		let sender = web3.eth.accounts[1];
		let initialSupply = 10000;
		let authorizer = web3.eth.accounts[2];
		let authorized = web3.eth.accounts[3];
		let toAccount = web3.eth.accounts[5];
		let allowance = 300;
		let initialBalanceOfAuthorizer = 400;
		let tokensToTransferFromAuthorizerToAuthorized = 450;
		
		let simpleCoinInstance = SimpleCoinContractFactory.new(initialSupply, {
			from: sender, data: bytecode, gas: gasEstimate}, 
			function (e, contract){
			if (typeof contract.address !== 'undefined') {
			
				//arrange
				contract.authorize(authorized, allowance, {
					from:authorizer,gas:200000});
					
				contract.transfer(authorizer, initialBalanceOfAuthorizer, {
					from:sender,gas:200000});					
				
				//act and assert
				assert.throws(
					()=> {
						contract.transferFrom(authorizer, toAccount, tokensToTransferFromAuthorizerToAuthorized,  {
							from:authorized,gas:200000});
					},
					/VM Exception while processing transaction/
				);			
	
				done();
			}
		});
    });
	
	it('Cannot transfer tokens from an account that has not authorized any account', function(done) {
	    //arrange 
		let sender = web3.eth.accounts[1];
		let initialSupply = 10000;
		let authorizer = web3.eth.accounts[2];
		let authorized = web3.eth.accounts[3];
		let toAccount = web3.eth.accounts[5];
		let allowance = 300;
		let initialBalanceOfAuthorizer = 400;
		
		let fromAccount = web3.eth.accounts[4];		
		let initialBalanceOfFromAccount = 400;
		
		let tokensToTransfer = 250;
		
		let simpleCoinInstance = SimpleCoinContractFactory.new(initialSupply, {
			from: sender, data: bytecode, gas: gasEstimate}, 
			function (e, contract){
			if (typeof contract.address !== 'undefined') {
			
				//arrange
				contract.authorize(authorized, allowance, {
					from:authorizer,gas:200000});
					
				contract.transfer(fromAccount, initialBalanceOfFromAccount, {
					from:sender,gas:200000});					
				
				//act and assert
				assert.throws(
					()=> {
						contract.transferFrom(fromAccount, toAccount, tokensToTransfer,  {
							from:authorized,gas:200000});
					},
					/VM Exception while processing transaction/
				);			
	
				done();
			}
		});
    });	
	
	it('Cannot transfer tokens by an account that has not been authorized', function(done) {
	    //arrange 
		let sender = web3.eth.accounts[1];
		let initialSupply = 10000;
		let authorizer = web3.eth.accounts[2];
		let authorized = web3.eth.accounts[3];
		let toAccount = web3.eth.accounts[5];
		let allowance = 300;
		let initialBalanceOfAuthorizer = 400;	

		let transferExecuter = web3.eth.accounts[4];		
		
		let tokensToTransfer = 250;
		
		let simpleCoinInstance = SimpleCoinContractFactory.new(initialSupply, {
			from: sender, data: bytecode, gas: gasEstimate}, 
			function (e, contract){
			if (typeof contract.address !== 'undefined') {
			
				//arrange
				contract.authorize(authorized, allowance, {
					from:authorizer,gas:200000});
					
				contract.transfer(authorizer, initialBalanceOfAuthorizer, {
					from:sender,gas:200000});					
				
				//act and assert
				assert.throws(
					()=> {
						contract.transferFrom(authorizer, toAccount, tokensToTransfer,  {
							from:transferExecuter,gas:200000});
					},
					/VM Exception while processing transaction/
				);			
	
				done();
			}
		});
    });	
	
	it('Successful transfer from authorizer to authorized: final source and destination balances are correct and allowance is reduced as expected', function(done) {
	    //arrange 
		let sender = web3.eth.accounts[1];
		let initialSupply = 10000;
		let authorizer = web3.eth.accounts[2];
		let authorized = web3.eth.accounts[3];
		let toAccount = web3.eth.accounts[5];
		let allowance = 300;
		let initialBalanceOfAuthorizer = 400;		
		
		let tokensToTransfer = 250;
		
		let simpleCoinInstance = SimpleCoinContractFactory.new(initialSupply, {
			from: sender, data: bytecode, gas: gasEstimate}, 
			function (e, contract){
			if (typeof contract.address !== 'undefined') {
			
				//arrange
				contract.authorize(authorized, allowance, {
					from:authorizer,gas:200000});
					
				contract.transfer(authorizer, initialBalanceOfAuthorizer, {
					from:sender,gas:200000});					
				
				//act
				contract.transferFrom(authorizer, toAccount, tokensToTransfer, {
					from:authorized,gas:200000});
							
				//assert
				assert.equal(150, contract.coinBalance(authorizer));
				assert.equal(250, contract.coinBalance(toAccount));				
				assert.equal(50, contract.allowance(authorizer, authorized));
				
				done();
			}
		});
    });	
  });  
  
  describe('mint', function() {	
	it('Cannot mint from non-owner account', function(done) {
		//arrange 
		let sender = web3.eth.accounts[1];
		let initialSupply = 10000;
		
		let minter = web3.eth.accounts[2];
		let recipient = web3.eth.accounts[3];
		let mintedCoins = 3000;

		let simpleCoinInstance = SimpleCoinContractFactory.new(initialSupply, {
			from: sender, data: bytecode, gas: gasEstimate}, 
			function (e, contract){
			if (typeof contract.address !== 'undefined') {
				//act and assert
				assert.throws(
					()=> {
						contract.mint(recipient, mintedCoins,  {
							from:minter,gas:200000});
					},
					/VM Exception while processing transaction/
				);	
				
				done();
			}
		});
	});
	
	it('Successful minting: the recipient has the correct balance', function(done) {
		//arrange 
		let sender = web3.eth.accounts[1];
		let initialSupply = 10000;
		
		let recipient = web3.eth.accounts[3];
		let mintedCoins = 3000;

		let simpleCoinInstance = SimpleCoinContractFactory.new(initialSupply, {
			from: sender, data: bytecode, gas: gasEstimate}, 
			function (e, contract){
			if (typeof contract.address !== 'undefined') {
				//act
				contract.mint(recipient, mintedCoins,  {
							from:sender,gas:200000});
				
				//assert
				assert.equal(contract.coinBalance(recipient), mintedCoins);
				done();
			}
		});
	});	
  });
  
  describe('freezeAccount', function() {	
	it('Cannot freezing from no owner account', function(done) {
		//arrange 
		let sender = web3.eth.accounts[1];
		let initialSupply = 10000;
		
		let freezer = web3.eth.accounts[2];
		let frozen = web3.eth.accounts[3];

		let simpleCoinInstance = SimpleCoinContractFactory.new(initialSupply, {
			from: sender, data: bytecode, gas: gasEstimate}, 
			function (e, contract){
			if (typeof contract.address !== 'undefined') {
				//act and assert
				assert.throws(
					()=> {
						contract.freezeAccount(frozen, true,  {
							from:freezer,gas:200000});
					},
					/VM Exception while processing transaction/
				);	
				
				done();
			}
		});
	});
	
	it('Successful freezing: verify the account has been frozen', function(done) {
		//arrange 
		let sender = web3.eth.accounts[1];
		let initialSupply = 10000;
		
		let frozen = web3.eth.accounts[3];

		let simpleCoinInstance = SimpleCoinContractFactory.new(initialSupply, {
			from: sender, data: bytecode, gas: gasEstimate
			}, function (e, contract){
			if (typeof contract.address !== 'undefined') {
				//act
				contract.freezeAccount(frozen, true,  {
							from:sender,gas:200000});
											
				//assert
				assert.equal(contract.frozenAccount(frozen), true);
				done();
			}
		});
	});	
  });
  
});