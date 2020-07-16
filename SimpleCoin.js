



var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var abi = "[{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_amount\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[],\"payable\":false,\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"coinBalance\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"type\":\"function\"},{\"inputs\":[{\"name\":\"_initialSupply\",\"type\":\"uint256\"}],\"payable\":false,\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"}]"
var SimpleCoinContractFactory = web3.eth.contract(JSON.parse(abi));
// Deploy SimpleCoin on Ganache with a deployment script and place the contract addess below:
var simpleCoinContractInstance = SimpleCoinContractFactory.at('0x773dc5fc8fc3ebbf671c036a3326b4e02529c708');
var accounts = web3.eth.accounts;

function refreshAccountsTable() {
	var innerHtml = "<tr><td>Account</td><td>Balance</td>";

	for (var i = 0; i < accounts.length; i++) {
		var account = accounts[i];
		var balance = simpleCoinContractInstance.coinBalance(account);
		innerHtml = innerHtml + "<tr><td>" + account + "</td><td>" + balance + "</td></tr>";
	}
	
	$("#accountsBalanceTable").html(innerHtml);
}


function transferCoins() {
	var sender = $("#from").val();
	var recipient = $("#to").val();
	var tokensToTransfer = $("#amount").val();
	simpleCoinContractInstance.transfer(recipient, tokensToTransfer, {
							from:sender,gas:200000},//);
							function(error, result){
								 if(!error)
									 refreshAccountsTable();
								 else
									 console.error(error);
							 });
}


$( document ).ready(function() {
	refreshAccountsTable();
});