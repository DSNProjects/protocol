const { ethers } = require("hardhat");
require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

async function main() {
  const names = [
    // "JoeAvaxAavee",
    // "JoeAvaxBifi",
    // "JoeAvaxBnb",
    // "JoeAvaxChart",
    // "JoeAvaxKlo",
    // "JoeAvaxMai",
    // "JoeAvaxMyak",
    // "JoeAvaxRelay",
    // "JoeAvaxTeddy",
    "JoeAvaxTsd"
  ];
  
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const controller_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_governance","internalType":"address"},{"type":"address","name":"_strategist_addr","internalType":"address"},{"type":"address","name":"_timelock","internalType":"address"},{"type":"address","name":"_devfund","internalType":"address"},{"type":"address","name":"_treasury","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"approveGlobeConverter","inputs":[{"type":"address","name":"_converter","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"approveStrategy","inputs":[{"type":"address","name":"_token","internalType":"address"},{"type":"address","name":"_strategy","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approvedGlobeConverters","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approvedStrategies","inputs":[{"type":"address","name":"","internalType":"address"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"_token","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"burn","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"convenienceFee","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"convenienceFeeMax","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"converters","inputs":[{"type":"address","name":"","internalType":"address"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"devfund","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"earn","inputs":[{"type":"address","name":"_token","internalType":"address"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"expected","internalType":"uint256"}],"name":"getExpectedReturn","inputs":[{"type":"address","name":"_strategy","internalType":"address"},{"type":"address","name":"_token","internalType":"address"},{"type":"uint256","name":"parts","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"globes","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"governance","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"inCaseStrategyTokenGetStuck","inputs":[{"type":"address","name":"_strategy","internalType":"address"},{"type":"address","name":"_token","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"inCaseTokensGetStuck","inputs":[{"type":"address","name":"_token","internalType":"address"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"max","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"onesplit","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"revokeGlobeConverter","inputs":[{"type":"address","name":"_converter","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"revokeStrategy","inputs":[{"type":"address","name":"_token","internalType":"address"},{"type":"address","name":"_strategy","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setConvenienceFee","inputs":[{"type":"uint256","name":"_convenienceFee","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setDevFund","inputs":[{"type":"address","name":"_devfund","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGlobe","inputs":[{"type":"address","name":"_token","internalType":"address"},{"type":"address","name":"_globe","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGovernance","inputs":[{"type":"address","name":"_governance","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setOneSplit","inputs":[{"type":"address","name":"_onesplit","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setSplit","inputs":[{"type":"uint256","name":"_split","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setStrategist_addr","inputs":[{"type":"address","name":"_strategist_addr","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setStrategy","inputs":[{"type":"address","name":"_token","internalType":"address"},{"type":"address","name":"_strategy","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setTimelock","inputs":[{"type":"address","name":"_timelock","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setTreasury","inputs":[{"type":"address","name":"_treasury","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"split","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"strategies","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"strategist_addr","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"swapExactGlobeForGlobe","inputs":[{"type":"address","name":"_fromGlobe","internalType":"address"},{"type":"address","name":"_toGlobe","internalType":"address"},{"type":"uint256","name":"_fromGlobeAmount","internalType":"uint256"},{"type":"uint256","name":"_toGlobeMinAmount","internalType":"uint256"},{"type":"address[]","name":"_targets","internalType":"address payable[]"},{"type":"bytes[]","name":"_data","internalType":"bytes[]"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"timelock_addr","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"treasury","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"address","name":"_token","internalType":"address"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawAll","inputs":[{"type":"address","name":"_token","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"yearn","inputs":[{"type":"address","name":"_strategy","internalType":"address"},{"type":"address","name":"_token","internalType":"address"},{"type":"uint256","name":"parts","internalType":"uint256"}]}];
  const gaugeproxy_ABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IceQueen"}],"name":"MASTER","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"SNOWBALL","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"SNOWCONE","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"TOKEN","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"acceptGovernance","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"addGauge","inputs":[{"type":"address","name":"_token","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"collect","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"distribute","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"gauges","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"getGauge","inputs":[{"type":"address","name":"_token","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"governance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"length","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"pendingGovernance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"pid","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"poke","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"reset","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGovernance","inputs":[{"type":"address","name":"_governance","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setPID","inputs":[{"type":"uint256","name":"_pid","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"tokenVote","inputs":[{"type":"address","name":"","internalType":"address"},{"type":"uint256","name":"","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address[]","name":"","internalType":"address[]"}],"name":"tokens","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalWeight","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"usedWeights","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"vote","inputs":[{"type":"address[]","name":"_tokenVote","internalType":"address[]"},{"type":"uint256[]","name":"_weights","internalType":"uint256[]"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"votes","inputs":[{"type":"address","name":"","internalType":"address"},{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"weights","inputs":[{"type":"address","name":"","internalType":"address"}]}];
  const multisig_ABI = [{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":""}],"name":"owners","inputs":[{"type":"uint256","name":""}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"removeOwner","inputs":[{"type":"address","name":"owner"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"revokeConfirmation","inputs":[{"type":"uint256","name":"transactionId"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bool","name":""}],"name":"isOwner","inputs":[{"type":"address","name":""}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bool","name":""}],"name":"confirmations","inputs":[{"type":"uint256","name":""},{"type":"address","name":""}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"count"}],"name":"getTransactionCount","inputs":[{"type":"bool","name":"pending"},{"type":"bool","name":"executed"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"addOwner","inputs":[{"type":"address","name":"owner"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bool","name":""}],"name":"isConfirmed","inputs":[{"type":"uint256","name":"transactionId"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"count"}],"name":"getConfirmationCount","inputs":[{"type":"uint256","name":"transactionId"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"destination"},{"type":"uint256","name":"value"},{"type":"bytes","name":"data"},{"type":"bool","name":"executed"}],"name":"transactions","inputs":[{"type":"uint256","name":""}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address[]","name":""}],"name":"getOwners","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256[]","name":"_transactionIds"}],"name":"getTransactionIds","inputs":[{"type":"uint256","name":"from"},{"type":"uint256","name":"to"},{"type":"bool","name":"pending"},{"type":"bool","name":"executed"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address[]","name":"_confirmations"}],"name":"getConfirmations","inputs":[{"type":"uint256","name":"transactionId"}],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":""}],"name":"transactionCount","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"changeRequirement","inputs":[{"type":"uint256","name":"_required"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"confirmTransaction","inputs":[{"type":"uint256","name":"transactionId"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"uint256","name":"transactionId"}],"name":"submitTransaction","inputs":[{"type":"address","name":"destination"},{"type":"uint256","name":"value"},{"type":"bytes","name":"data"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":""}],"name":"MAX_OWNER_COUNT","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":""}],"name":"required","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"replaceOwner","inputs":[{"type":"address","name":"owner"},{"type":"address","name":"newOwner"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"executeTransaction","inputs":[{"type":"uint256","name":"transactionId"}],"constant":false},{"type":"constructor","stateMutability":"nonpayable","payable":false,"inputs":[{"type":"address[]","name":"_owners"},{"type":"uint256","name":"_required"}]},{"type":"fallback","stateMutability":"payable","payable":true},{"type":"event","name":"Confirmation","inputs":[{"type":"address","name":"sender","indexed":true},{"type":"uint256","name":"transactionId","indexed":true}],"anonymous":false},{"type":"event","name":"Revocation","inputs":[{"type":"address","name":"sender","indexed":true},{"type":"uint256","name":"transactionId","indexed":true}],"anonymous":false},{"type":"event","name":"Submission","inputs":[{"type":"uint256","name":"transactionId","indexed":true}],"anonymous":false},{"type":"event","name":"Execution","inputs":[{"type":"uint256","name":"transactionId","indexed":true}],"anonymous":false},{"type":"event","name":"ExecutionFailure","inputs":[{"type":"uint256","name":"transactionId","indexed":true}],"anonymous":false},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"sender","indexed":true},{"type":"uint256","name":"value","indexed":false}],"anonymous":false},{"type":"event","name":"OwnerAddition","inputs":[{"type":"address","name":"owner","indexed":true}],"anonymous":false},{"type":"event","name":"OwnerRemoval","inputs":[{"type":"address","name":"owner","indexed":true}],"anonymous":false},{"type":"event","name":"RequirementChange","inputs":[{"type":"uint256","name":"required","indexed":false}],"anonymous":false}];

  const governance_addr = "0x294aB3200ef36200db84C4128b7f1b4eec71E38a";
  const timelock_addr = governance_addr;
  const strategist_addr = "0xc9a51fB9057380494262fd291aED74317332C0a2";
  const controller_addr = "0xf7B8D9f8a82a7a6dd448398aFC5c77744Bd6cb85";
  const gaugeproxy_addr = "0x215D5eDEb6A6a3f84AE9d72962FEaCCdF815BF27";

  const Controller = new ethers.Contract(controller_addr, controller_ABI, deployer);

  const deploy = async (name) => {
    console.log(`run deploy with ${name}`);
    const strategy_name = `Strategy${name}Lp`;
    const snowglobe_name = `SnowGlobe${name}`;
  
    const strategy = await ethers.getContractFactory(strategy_name);
    const globe = await ethers.getContractFactory(snowglobe_name);
  
    /* Deploy Strategy */
    const Strategy = await strategy.deploy(governance_addr, strategist_addr, controller_addr, timelock_addr);
    console.log(`deployed ${strategy_name} at : ${Strategy.address}`);

    /* Deploy Snowglobe */
    const lp = await Strategy.want();
    const SnowGlobe = await globe.deploy(lp, governance_addr, timelock_addr, controller_addr);
    console.log(`deployed ${snowglobe_name} at : ${SnowGlobe.address}`);
  
    /* Set Globe */
    const setGlobe = await Controller.setGlobe(lp, SnowGlobe.address);
    const tx_setGlobe = await setGlobe.wait(1);
    if (!tx_setGlobe.status) {
      console.error("Error setting the globe for: ",name);
      return;
    }
    console.log("Set Globe in the Controller for: ",name);

    /* Approve Strategy */
    const approveStrategy = await Controller.approveStrategy(lp, Strategy.address);
    const tx_approveStrategy = await approveStrategy.wait(1);
    if (!tx_approveStrategy.status) {
      console.error("Error approving the strategy for: ",name);
      return;
    }
    console.log("Approved Strategy in the Controller for: ",name);

    /* Set Strategy */
    const setStrategy = await Controller.setStrategy(lp, Strategy.address);
    const tx_setStrategy = await setStrategy.wait(1);
    if (!tx_setStrategy.status) {
      console.error("Error setting the strategy for: ",name);
      return;
    }
    console.log("Set Strategy in the Controller for: ",name);
  
    /* Whitelist Harvester */
    await Strategy.whitelistHarvester("0x096a46142C199C940FfEBf34F0fe2F2d674fDB1F");
    console.log('whitelisted the harvester for: ',name);
  
    /* Add Gauge */
    // const MultiSig = new ethers.Contract(governance_addr, multisig_ABI, deployer);
    // const iGaugeProxy = new ethers.utils.Interface(gaugeproxy_ABI);
    // const encoding = iGaugeProxy.encodeFunctionData("addGauge", [SnowGlobe.address]);
    
    // const addGauge = await MultiSig.submitTransaction(gaugeproxy_addr, 0, encoding);
    const GaugeProxy = new ethers.Contract(gaugeproxy_addr, gaugeproxy_ABI, deployer);
    const addGauge = await GaugeProxy.addGauge(SnowGlobe.address);
    const tx_addGauge = await addGauge.wait(1);
    if (!tx_addGauge.status) {
      console.error("Error adding the gauge to multisig transaction list for: ",name);
      return;
    }
    console.log(`addGauge for ${name}`);

    const gauge = await GaugeProxy.getGauge(SnowGlobe.address);
    console.log(`deployed Gauge${name} at: ${gauge}`);
    
    return;
  };

  for (const name of names) {
    await deploy(name);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });