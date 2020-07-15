pragma solidity ^0.4.24;

contract ERC20 {
    string public constant name = "Token Name";
    string public constant symbol = "KYU";
    
    uint8 public constant decimals = 18;
    uint256 public totalSupply;
    
    function balanceOf(address _owner) public view returns (uint256 balance);
    function transfer(address _to, uint256 _value) public returns (bool success);
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success);
    function approve(address _owner, address _spender) public returns (bool success);
    function allowance(address _owner, address _spender) public view returns (uint256 remaining);
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}