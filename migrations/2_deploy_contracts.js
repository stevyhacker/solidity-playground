var HodlTokensForYouContract = artifacts.require("HodlTokensForYouContract");

module.exports = function(deployer) {
    deployer.deploy(HodlTokensForYouContract);
};
