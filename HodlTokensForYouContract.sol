pragma solidity ^0.4.19;

import "zeppelin-solidity/contracts/token/StandardToken.sol";
import "zeppelin-solidity/contracts/math/SafeMath.sol";

contract HodlTokensForYouContract {

    event Hodl(address indexed hodler, address token, uint amount, uint timeLimit);

    event PanicSell(address indexed hodler, address token, uint amount, uint timediff);

    event Withdrawal(address indexed hodler, address token, uint amount);

    struct Hodler {
        uint etherBalance;
        address hodler;
        mapping(address => Token) tokens;
    }

    struct Token {
        bytes32 symbol;
        uint tokenBalance;
        address tokenAddress;
        uint timeLimit;
    }

    mapping(address => Hodler) public hodlers;


    function hodlDeposit(address token, byte tokenSymbol, uint256 amount, uint256 timeLimit) {

        hodlers[msg.sender] = Hodler(0, msg.sender);
        hodlers[msg.sender].tokens[token] = Token(tokenSymbol, amount, token, timeLimit);

        StandardToken(token).transferFrom(msg.sender, this, amount);
        Hodl(msg.sender, token, amount, timeLimit);

    }

    function withdraw(address token) {
        Hodler hodler = hodlers[msg.sender];
        require(block.timestamp > hodler.tokens[token].timeLimit);

        uint amount = hodler.tokens[token].tokenBalance;
        hodler.tokens[token].tokenBalance = 0;
        StandardToken(token).transfer(msg.sender, amount);

        Withdrawal(msg.sender, token, amount);

    }


    function panicSell(address token) {
        //This function should have a fee for quicker withdrawing without waiting
        Hodler hodler = hodlers[msg.sender];

        uint amount = hodler.tokens[token].tokenBalance;
        hodler.tokens[token].tokenBalance = 0;
        StandardToken(token).transfer(msg.sender, amount);

        PanicSell(msg.sender, token, amount, hodler.tokens[token].timeLimit - block.timestamp);

    }

}