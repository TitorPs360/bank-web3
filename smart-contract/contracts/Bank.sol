//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.15;

import "hardhat/console.sol";

contract Bank {
    struct Account { 
        address owner;
        uint balance;
    }

    address payable owner;
    address payable user;

    mapping(string => Account) accountName;
    mapping(string => bool) accountNameExist;
    mapping(address => string[]) accountList;
   
    modifier onlyOwner {
        require(payable(msg.sender) == owner, "Not owner"); 
        _;
    }
    
    constructor(){
        owner = payable(msg.sender);
    }

    function healthCheck() public pure returns (string memory) {
        return "OK";
    }

    function getOwner() public onlyOwner view returns (address) {
        return owner;
    }

    function getCurrentFund() public onlyOwner view returns (uint256) {
        return address(this).balance;
    }

    function creatAccount(string memory creatAccountName) public {
        address accountOwner = msg.sender;
        require(!accountNameExist[creatAccountName], "Account name already exist");
         _creatAccount(creatAccountName, accountOwner);
    }

    function _creatAccount(string memory creatAccountName, address accountOwner) private {
        accountName[creatAccountName].owner = accountOwner;
        accountName[creatAccountName].balance = 0;
        accountList[accountOwner].push(creatAccountName);
        accountNameExist[creatAccountName] = true;
    }

    function checkAccountExist(string memory checkAccountName) public view returns (bool) {
        if (accountNameExist[checkAccountName]) {
            return true;
        } else {
            return false;
        }
    }

    function getCurrentAccountList() public view returns (string[] memory) {
        return accountList[msg.sender];
    }

    function getAccountBalance(string memory checkAccountName) public view returns (uint) {
        require(accountName[checkAccountName].owner == msg.sender, "No permission in this account");
        return accountName[checkAccountName].balance;
    }

    function deposit(string memory toAccountName) public payable {
        require(accountNameExist[toAccountName], "Account name not found");
        uint256 amount = msg.value;
        require(amount > 0, "Invalid amount");
        uint256 previousSenderBalance = accountName[toAccountName].balance;
        _deposit(toAccountName, amount);
        assert(accountName[toAccountName].balance == previousSenderBalance + amount); 
    }

    function _deposit(string memory toAccountName, uint256 amount) private {
        accountName[toAccountName].balance += amount;
    }

    function bulkTransfer(string memory fromAccountName, string[] memory toAccountNames, uint256 amount) public {
        require(accountNameExist[fromAccountName], "Sender account not found");
        require(accountName[fromAccountName].balance >= toAccountNames.length * amount, "Balance not sufficient");
        require(amount > 0, "Invalid amount"); 
        for (uint i = 0; i < toAccountNames.length; i++) {
            transfer(fromAccountName, toAccountNames[i], amount);
        }
    }
    
    function transfer(string memory fromAccountName, string memory toAccountName, uint256 amount) public {
        require(accountNameExist[toAccountName], "Receiver account not found");
        uint256 previousSenderBalance = accountName[fromAccountName].balance; 
        uint256 previousRecieverBalance = accountName[toAccountName].balance;

        if (accountName[fromAccountName].owner == accountName[toAccountName].owner) {
            _transfer_nofee(fromAccountName, toAccountName, amount);
            assert(accountName[fromAccountName].balance == previousSenderBalance - amount && accountName[toAccountName].balance == previousRecieverBalance + amount); 
        } else {
            _transfer_withfee(fromAccountName, toAccountName, amount); 
            assert(accountName[fromAccountName].balance == previousSenderBalance - amount && accountName[toAccountName].balance == previousRecieverBalance + (amount * 99 / 100)); 
        }
    }
    
    function _transfer_nofee(string memory fromAccountName, string memory toAccountName, uint256 amount) private {
        accountName[fromAccountName].balance -= amount; 
        accountName[toAccountName].balance += amount; 
    }

    function _transfer_withfee(string memory fromAccountName, string memory toAccountName, uint256 amount) private {
        accountName[fromAccountName].balance -= amount; 
        accountName[toAccountName].balance += amount * 99 / 100; 
    }

    function withdraw (string memory fromAccountName, uint256 amount) public payable {
        require(accountNameExist[fromAccountName], "Account name not found");
        require(accountName[fromAccountName].owner == msg.sender, "No permission in this account");
        require(accountName[fromAccountName].balance >= amount, "Balance not sufficient");
        require(amount > 0, "Invalid amount");

        user = payable(msg.sender);
        uint256 previousBalance = accountName[fromAccountName].balance;
        _withdraw(fromAccountName, amount);
        assert(accountName[fromAccountName].balance == previousBalance - amount); 
        user.transfer(amount);
    }

    function _withdraw(string memory fromAccountName, uint256 amount) private {
        accountName[fromAccountName].balance -= amount;
    }
}