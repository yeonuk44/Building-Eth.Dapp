pragma solidity ^0.4.0;

contract SimpleCoin {
    
    mapping (address => uint256) public coinBalance;
    
    constructor() public {
        coinBalance
        [0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C] = 10000;
    }
    
    
    
    function transfer(address _to, uint256 _amount) public {
        coinBalance[msg.sender] -= _amount;
        coinBalance[_to] += _amount;
    }
}