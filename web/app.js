$(function () {  // equivalent to $(document).ready(...)
    if (typeof(web3) === "undefined") {
        error("Unable to find web3. " +
            "Please run MetaMask (or something else that injects web3).");
    } else {
        console.log("Found injected web3.");
        web3 = new Web3(window.web3.currentProvider);
        if (web3.version.network != 3) {
            error("Wrong network detected. Please switch to the Ropsten test network.");
        } else {
            console.log("Connected to the Ropsten test network.");
        }


        //HodlContract
        var hodlContractAddress = "0xd7EdACf9e276AdA5bCeb686fA040919E9B75672e";
        var hodlContractABI = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"hodlers","outputs":[{"name":"etherBalance","type":"uint256"},{"name":"hodler","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"tokenSymbol","type":"bytes1"},{"name":"amount","type":"uint256"},{"name":"timeLimit","type":"uint256"}],"name":"hodlDeposit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"}],"name":"panicSell","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"hodler","type":"address"},{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"timeLimit","type":"uint256"}],"name":"Hodl","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"hodler","type":"address"},{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"timediff","type":"uint256"}],"name":"PanicSell","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"hodler","type":"address"},{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Withdrawal","type":"event"}];

        //StevanToken
        var tokenContractAddress = "0xaA1e5EeF4C1116F33A4207b6A274b1004E0C3233";
        var tokenContractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];

        tokenContract = web3.eth.contract(tokenContractABI).at(tokenContractAddress);

        tokenContract.balanceOf.call(web3.eth.defaultAccount, function (err, result) {
            if (err) {
                return console.log(err);
            } else {
                console.log("getCount call executed successfully.");
            }
            alert(result);
            // Use the function's return value
        });

        // counter.increment.sendTransaction(function (err, hash) {
        //     if (err) {
        //         return error(err);
        //     }
        //
        //     waitForReceipt(hash, function () {
        //         log("Transaction succeeded.");
        //     });
        // });


    }
});