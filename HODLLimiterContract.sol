pragma solidity ^0.4.19;

contract ERC20Interface {
    function totalSupply() public constant returns (uint);

    function balanceOf(address tokenOwner) public constant returns (uint balance);

    function allowance(address tokenOwner, address spender) public constant returns (uint remaining);

    function transfer(address to, uint tokens) public returns (bool success);

    function approve(address spender, uint tokens) public returns (bool success);

    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}

contract hodlForYouContractV3 {

    event Hodl(address indexed hodler, address token, uint  amount, uint timeLimit);

    event PanicSell(address indexed hodler, address token, uint  amount, uint timediff);

    event Withdrawal(address indexed hodler, address token, uint  amount);

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

        ERC20Interface(token).transferFrom(msg.sender, this, amount);
        Hodl(msg.sender, token, amount, timeLimit);

    }

    function withdraw(address token) {
        Hodler hodler = hodlers[msg.sender];
        require(block.timestamp > hodler.tokens[token].timeLimit);

        uint amount = hodler.tokens[token].tokenBalance;
        hodler.tokens[token].tokenBalance = 0;
        ERC20Interface(token).transfer(msg.sender, amount);

        Withdrawal(msg.sender, token, amount);

    }


    function panicSell(address token) {
        //This function should have a fee for quicker withdrawing without waiting
        Hodler hodler = hodlers[msg.sender];

        uint amount = hodler.tokens[token].tokenBalance;
        hodler.tokens[token].tokenBalance = 0;
        ERC20Interface(token).transfer(msg.sender, amount);

        PanicSell(msg.sender, token, amount, hodler.tokens[token].timeLimit - block.timestamp);

    }

}