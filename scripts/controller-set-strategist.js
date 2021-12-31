const { ethers } = require("hardhat");
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

async function main() {
  const multisig_ABI = [{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":""}],"name":"owners","inputs":[{"type":"uint256","name":""}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"removeOwner","inputs":[{"type":"address","name":"owner"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"revokeConfirmation","inputs":[{"type":"uint256","name":"transactionId"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bool","name":""}],"name":"isOwner","inputs":[{"type":"address","name":""}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bool","name":""}],"name":"confirmations","inputs":[{"type":"uint256","name":""},{"type":"address","name":""}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":""}],"name":"calcMaxWithdraw","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"count"}],"name":"getTransactionCount","inputs":[{"type":"bool","name":"pending"},{"type":"bool","name":"executed"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":""}],"name":"dailyLimit","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":""}],"name":"lastDay","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"addOwner","inputs":[{"type":"address","name":"owner"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bool","name":""}],"name":"isConfirmed","inputs":[{"type":"uint256","name":"transactionId"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"count"}],"name":"getConfirmationCount","inputs":[{"type":"uint256","name":"transactionId"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"destination"},{"type":"uint256","name":"value"},{"type":"bytes","name":"data"},{"type":"bool","name":"executed"}],"name":"transactions","inputs":[{"type":"uint256","name":""}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address[]","name":""}],"name":"getOwners","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256[]","name":"_transactionIds"}],"name":"getTransactionIds","inputs":[{"type":"uint256","name":"from"},{"type":"uint256","name":"to"},{"type":"bool","name":"pending"},{"type":"bool","name":"executed"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address[]","name":"_confirmations"}],"name":"getConfirmations","inputs":[{"type":"uint256","name":"transactionId"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":""}],"name":"transactionCount","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"changeRequirement","inputs":[{"type":"uint256","name":"_required"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"confirmTransaction","inputs":[{"type":"uint256","name":"transactionId"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"uint256","name":"transactionId"}],"name":"submitTransaction","inputs":[{"type":"address","name":"destination"},{"type":"uint256","name":"value"},{"type":"bytes","name":"data"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"changeDailyLimit","inputs":[{"type":"uint256","name":"_dailyLimit"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":""}],"name":"MAX_OWNER_COUNT","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":""}],"name":"required","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"replaceOwner","inputs":[{"type":"address","name":"owner"},{"type":"address","name":"newOwner"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"executeTransaction","inputs":[{"type":"uint256","name":"transactionId"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":""}],"name":"spentToday","inputs":[],"constant":true},{"type":"constructor","stateMutability":"nonpayable","payable":false,"inputs":[{"type":"address[]","name":"_owners"},{"type":"uint256","name":"_required"},{"type":"uint256","name":"_dailyLimit"}]},{"type":"fallback","stateMutability":"payable","payable":true},{"type":"event","name":"DailyLimitChange","inputs":[{"type":"uint256","name":"dailyLimit","indexed":false}],"anonymous":false},{"type":"event","name":"Confirmation","inputs":[{"type":"address","name":"sender","indexed":true},{"type":"uint256","name":"transactionId","indexed":true}],"anonymous":false},{"type":"event","name":"Revocation","inputs":[{"type":"address","name":"sender","indexed":true},{"type":"uint256","name":"transactionId","indexed":true}],"anonymous":false},{"type":"event","name":"Submission","inputs":[{"type":"uint256","name":"transactionId","indexed":true}],"anonymous":false},{"type":"event","name":"Execution","inputs":[{"type":"uint256","name":"transactionId","indexed":true}],"anonymous":false},{"type":"event","name":"ExecutionFailure","inputs":[{"type":"uint256","name":"transactionId","indexed":true}],"anonymous":false},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"sender","indexed":true},{"type":"uint256","name":"value","indexed":false}],"anonymous":false},{"type":"event","name":"OwnerAddition","inputs":[{"type":"address","name":"owner","indexed":true}],"anonymous":false},{"type":"event","name":"OwnerRemoval","inputs":[{"type":"address","name":"owner","indexed":true}],"anonymous":false},{"type":"event","name":"RequirementChange","inputs":[{"type":"uint256","name":"required","indexed":false}],"anonymous":false}];
  const controller_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_governance","internalType":"address"},{"type":"address","name":"_strategist","internalType":"address"},{"type":"address","name":"_timelock","internalType":"address"},{"type":"address","name":"_devfund","internalType":"address"},{"type":"address","name":"_treasury","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"approveGlobeConverter","inputs":[{"type":"address","name":"_converter","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"approveStrategy","inputs":[{"type":"address","name":"_token","internalType":"address"},{"type":"address","name":"_strategy","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approvedGlobeConverters","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approvedStrategies","inputs":[{"type":"address","name":"","internalType":"address"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"_token","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"burn","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"convenienceFee","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"convenienceFeeMax","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"converters","inputs":[{"type":"address","name":"","internalType":"address"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"devfund","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"earn","inputs":[{"type":"address","name":"_token","internalType":"address"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"expected","internalType":"uint256"}],"name":"getExpectedReturn","inputs":[{"type":"address","name":"_strategy","internalType":"address"},{"type":"address","name":"_token","internalType":"address"},{"type":"uint256","name":"parts","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"globes","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"governance","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"inCaseStrategyTokenGetStuck","inputs":[{"type":"address","name":"_strategy","internalType":"address"},{"type":"address","name":"_token","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"inCaseTokensGetStuck","inputs":[{"type":"address","name":"_token","internalType":"address"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"max","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"onesplit","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"revokeGlobeConverter","inputs":[{"type":"address","name":"_converter","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"revokeStrategy","inputs":[{"type":"address","name":"_token","internalType":"address"},{"type":"address","name":"_strategy","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setConvenienceFee","inputs":[{"type":"uint256","name":"_convenienceFee","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setDevFund","inputs":[{"type":"address","name":"_devfund","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGlobe","inputs":[{"type":"address","name":"_token","internalType":"address"},{"type":"address","name":"_globe","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGovernance","inputs":[{"type":"address","name":"_governance","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setOneSplit","inputs":[{"type":"address","name":"_onesplit","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setSplit","inputs":[{"type":"uint256","name":"_split","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setStrategist","inputs":[{"type":"address","name":"_strategist","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setStrategy","inputs":[{"type":"address","name":"_token","internalType":"address"},{"type":"address","name":"_strategy","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setTimelock","inputs":[{"type":"address","name":"_timelock","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setTreasury","inputs":[{"type":"address","name":"_treasury","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"split","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"strategies","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"strategist","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"swapExactGlobeForGlobe","inputs":[{"type":"address","name":"_fromGlobe","internalType":"address"},{"type":"address","name":"_toGlobe","internalType":"address"},{"type":"uint256","name":"_fromGlobeAmount","internalType":"uint256"},{"type":"uint256","name":"_toGlobeMinAmount","internalType":"uint256"},{"type":"address[]","name":"_targets","internalType":"address payable[]"},{"type":"bytes[]","name":"_data","internalType":"bytes[]"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"timelock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"treasury","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"address","name":"_token","internalType":"address"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawAll","inputs":[{"type":"address","name":"_token","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"yearn","inputs":[{"type":"address","name":"_strategy","internalType":"address"},{"type":"address","name":"_token","internalType":"address"},{"type":"uint256","name":"parts","internalType":"uint256"}]}];
  

  const [signer] = await ethers.getSigners();

  // SNOB addresses
  const treasury_addr = "0x294aB3200ef36200db84C4128b7f1b4eec71E38a";
  const council_addr = "0x028933a66DD0cCC239a3d5c2243b2d96672f11F5";
  const timelock_controller = "0x3d88b8022142ea2693ba43BA349F89256392d59b";

  const new_strategist = timelock_controller;

  const Council = new ethers.Contract(council_addr, multisig_ABI, signer);
  const IMultiSig = new ethers.utils.Interface(multisig_ABI);
  const IController = new ethers.utils.Interface(controller_ABI);
  const controller_addr = "0x8bfBA506B442f0D93Da2aDFd1ab70b7cB6a77B76";

  const first_encoding = IController.encodeFunctionData("setStrategist", [new_strategist]);

  const second_encoding = IMultiSig.encodeFunctionData("submitTransaction", [controller_addr, 0, first_encoding]);
  
  // var options = { gasPrice: 35000000000, gasLimit: 8000000 };
  const submission = await Council.submitTransaction(treasury_addr, 0, second_encoding);
  const tx_submission = await submission.wait(1);
  if (!tx_submission.status) {
    console.error(`Error submitting transaction: setStrategist for ${controller_addr} to ${new_strategist}`);
    return;
  }
  console.log(`transaction submitted: setStrategist for ${controller_addr} to ${new_strategist}`);
 

  return;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });