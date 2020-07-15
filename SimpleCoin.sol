pragma solidity ^0.4.0;

import "./Ownable.sol";
import "./ERC20.sol";

contract SimpleCoin is Ownable, ERC20 {
    
    mapping (address => uint256) internal coinBalance;
    mapping (address => mapping (address => uint256)) internal allowances;
    mapping (address => bool) public frozenAccount;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed authorizer, address indexed authorized, uint256 value);
    event FrozenAccount(address target, bool frozen);
    
    modifier onlyOwner {
        if (msg.sender != owner) revert();
        _;
    }
    
    constructor(uint256 _initialSupply) public {
        owner = msg.sender;
        mint(owner, _initialSupply);
    }
    
    function balanceOf(address _account) public view returns (uint256 balance) {
        return coinBalance[_account];
    }
    function transfer(address _to, uint256 _amount) public returns (bool) {
        require(_to != 0x0);
        require(coinBalance[msg.sender] >= _amount);
        require(coinBalance[_to] + _amount 
            >= coinBalance[_to]);
        coinBalance[msg.sender] -= _amount;
        coinBalance[_to] += _amount;
        emit Transfer(msg.sender, _to, _amount);
        return true;
    }
    function approve(address _authorizedAccount, uint256 _allowance) public returns (bool success) {
        allowances[msg.sender][_authorizedAccount] = _allowance;
        emit Approval(msg.sender, _authorizedAccount, _allowance);
        return true;
    }
    function transferFrom(address _from, address _to, uint256 _amount) public returns (bool success) {
        require(_to != 0x0);
        require(coinBalance[_from] > _amount);
        require(coinBalance[_to] + _amount >= coinBalance[_to]);
        require(_amount <= allowances[_from][msg.sender]);
        coinBalance[_from] -= _amount;
        coinBalance[_to] += _amount;
        allowances[_from][msg.sender] -= _amount;
        emit Transfer(_from, _to, _amount);
        return true;
    }
    function allowance(address _authorizer, address _authorizedAccount) public view returns (uint256) {
        return allowances[_authorizer][_authorizedAccount];
    }
    function mint(address _recipient, uint256 _mintedAmount) onlyOwner public {
        coinBalance[_recipient] += _mintedAmount;
        emit Transfer(owner, _recipient, _mintedAmount);
    }
    function freezeAccount(address target, bool freeze) onlyOwner public {
        frozenAccount[target] = freeze;
        emit FrozenAccount(target, freeze);
    }
}