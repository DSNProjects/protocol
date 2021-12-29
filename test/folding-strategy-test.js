/* eslint-disable no-undef */
const { ethers, network } = require("hardhat");
const chai = require("chai");
//const solidity = require("ethereum-waffle");
const chaiRoughly = require('chai-roughly');
const chaiAsPromised = require('chai-as-promised');
//chai.use(solidity);
chai.use(chaiAsPromised);
chai.use(chaiRoughly);

const { BigNumber } = require("@ethersproject/bignumber");
const { increaseTime, overwriteTokenAmount, increaseBlock, returnSigner, fastForwardAWeek } = require("./utils/helpers");
const { expect } = chai;
const { setupSigners, snowball_addr, treasury_addr} = require("./utils/static");

function doFoldingStrategyTest (
    name,
    snowglobe_addr,
    strategy_addr,
    slot = 0,
    fold = true,
    controller = "main",
) {

    const wallet_addr = process.env.WALLET_ADDR;
    let stratABI
    let assetContract, Controller;
    let governanceSigner, strategistSigner, timelockSigner;
    let globeABI
    let SnowGlobe, Strategy;
    let strategyBalance, controller_addr, asset_addr;
    const txnAmt = "25000000000000000000000";

    describe("Folding Strategy tests for: " + name, function () {

        //These reset the state after each test is executed 
        beforeEach(async function () {
            snapshotId = await ethers.provider.send('evm_snapshot');
        });
        afterEach(async function () {
            await ethers.provider.send('evm_revert', [snapshotId]);
        });

        before(async function () {
            const strategyName = `Strategy${name}`;
            const snowglobeName = `SnowGlobe${name}`;

            stratABI = (await ethers.getContractFactory(strategyName)).interface;
            globeABI = (await ethers.getContractFactory(snowglobeName)).interface;

            await network.provider.send('hardhat_impersonateAccount', [wallet_addr]);
            console.log(`impersonating account: ${wallet_addr}`);
            walletSigner = ethers.provider.getSigner(wallet_addr);
            [timelockSigner, strategistSigner, governanceSigner] = await setupSigners();

            //Add a new case here when including a new family of folding strategies
            switch (controller) {
                case "main": controller_addr = "0xf7B8D9f8a82a7a6dd448398aFC5c77744Bd6cb85";break;
                case "backup": controller_addr = "0xACc69DEeF119AB5bBf14e6Aaf0536eAFB3D6e046"; break;
                case "aave": controller_addr = "0x425A863762BBf24A986d8EaE2A367cb514591C6F"; break;
                case "bankerJoe": controller_addr = "0xFb7102506B4815a24e3cE3eAA6B834BE7a5f2807"; break;
                case "benqi": controller_addr = "0x252B5fD3B1Cb07A2109bF36D5bDE6a247c6f4B59"; break;
                // case "benqi": controller_addr = "0x8bfBA506B442f0D93Da2aDFd1ab70b7cB6a77B76"; break; //old
                default : break;
            }

            console.log(`using controller: ${controller_addr}`);
            console.log(name)

            walletSigner = await returnSigner(wallet_addr);
            Controller = await ethers.getContractAt("ControllerV4", controller_addr, governanceSigner);
            timelock_addr = await Controller.timelock();
            console.log(`timelock_addr: `,timelock_addr);
            timelockSigner = await returnSigner(timelock_addr);
            console.log(`timelockSigner: ${timelockSigner}`);

            //If strategy address not supplied then we should deploy and setup a new strategy
            if (!strategy_addr) {

                console.log("the strat address was NOT provided")
                console.log(`deploying strategy ${strategyName}`);
                const stratFactory = await ethers.getContractFactory(strategyName);
                // Now we can deploy the new strategy
                console.log(`${governanceSigner._address}, ${strategistSigner._address}, ${controller_addr}, ${timelock_addr}`);
                Strategy = await stratFactory.connect(walletSigner).deploy(governanceSigner._address, strategistSigner._address, controller_addr, timelock_addr);
                console.log(`deployed new strategy at ${Strategy.address}`);
                asset_addr = await Strategy.want();
                console.log(`asset address: ${asset_addr}`);
                strategy_addr = Strategy.address;
                
                const approveStrategy = await Controller.connect(timelockSigner).approveStrategy(asset_addr,strategy_addr);
                const tx_approveStrategy = await approveStrategy.wait(1);
                if (!tx_approveStrategy.status) {
                    console.error("Error approving the strategy for: ",name);
                    return;
                }
                console.log("Approved Strategy in the Controller for: ",name);

                /* Handle old strategy */
                const oldStrategy_addr = await Controller.strategies(asset_addr);
                if (oldStrategy_addr != 0) {
                    const oldStrategy = new ethers.Contract(oldStrategy_addr, stratABI, governanceSigner);
                    const harvest = await oldStrategy.connect(governanceSigner).harvest();
                    const tx_harvest = await harvest.wait(1);
                    if (!tx_harvest.status) {
                        console.error("Error harvesting the old strategy for: ",name);
                        return;
                    }
                    console.log("Harvested the old strategy for: ",name);
                    if (fold) {
                        // Before we can setup new strategy we must deleverage from old one
                        const deleverage = await oldStrategy.connect(governanceSigner).deleverageToMin();
                        const tx_deleverage = await deleverage.wait(1);
                        if (!tx_deleverage.status) {
                            console.error("Error deleveraging the old strategy for: ",name);
                            return;
                        }
                        console.log("Deleveraged the old strategy for: ",name);
                    }
                }

            } else {            
                Strategy = new ethers.Contract(strategy_addr, stratABI, governanceSigner);
                let timelock_addr = await Strategy.timelock();
                timelockSigner = await returnSigner(timelock_addr);
            }

            asset_addr = await Strategy.connect(walletSigner).want();
               
            const setStrategy = await Controller.connect(timelockSigner).setStrategy(asset_addr,strategy_addr);
            const tx_setStrategy = await setStrategy.wait(1);
            if (!tx_setStrategy.status) {
                console.error("Error setting the strategy for: ",name);
                return;
            }
            console.log("Set Strategy in the Controller for: ",name);

            const whitelist = await Strategy.connect(governanceSigner).whitelistHarvester(wallet_addr);
            const tx_whitelist = await whitelist.wait(1);
            if (!tx_whitelist.status) {
                console.error("Error whitelisting harvester for: ",name);
                return;
            }
            console.log('whitelisted the harvester for: ',name);

            const keeper = await Strategy.connect(governanceSigner).addKeeper(wallet_addr);
            const tx_keeper = await keeper.wait(1);
            if (!tx_keeper.status) {
               console.error("Error adding keeper for: ",name);
               return;
            }
            console.log('added keeper for: ',name);

            
            if (!snowglobe_addr) {
                snowglobe_addr = await Controller.globes(asset_addr);
                console.log("controller_addr: ",controller_addr);
                console.log("snowglobe_addr: ",snowglobe_addr);
                if (snowglobe_addr != 0) {
                    SnowGlobe = new ethers.Contract(snowglobe_addr, globeABI, governanceSigner);
                    console.log(`connected to snowglobe at ${SnowGlobe.address}`);
                }
                else {
                    const globeFactory = await ethers.getContractFactory(snowglobeName);
                    SnowGlobe = await globeFactory.deploy(asset_addr, governanceSigner._address, timelockSigner._address, controller_addr);
                    console.log(`deployed new snowglobe at ${SnowGlobe.address}`);
                    const setGlobe = await Controller.setGlobe(asset_addr, SnowGlobe.address);
                    const tx_setGlobe = await setGlobe.wait(1);
                    if (!tx_setGlobe.status) {
                        console.error("Error setting the globe for: ",name);
                        return;
                    }
                    console.log("Set Globe in the Controller for: ",name);
                    snowglobe_addr = SnowGlobe.address;
                }
            }
            else {
                SnowGlobe = new ethers.Contract(snowglobe_addr, globeABI, governanceSigner);
                console.log(`connected to snowglobe at ${SnowGlobe.address}`);
            }
            const earn = await SnowGlobe.earn();
            const tx_earn = await earn.wait(1);
            if (!tx_earn.status) {
                console.error("Error calling earn in the Snowglobe for: ",name);
                return;
            }
            console.log("Called earn in the Snowglobe for: ",name);

            if (fold) {
                // Now leverage to max
                console.log("leverageToMax START")
                const leverage = await Strategy.connect(governanceSigner).leverageToMax();
                console.log("leverageToMax END")
                const tx_leverage = await leverage.wait(1);
                if (!tx_leverage.status) {
                    console.error("Error leveraging the strategy for: ",name);
                    return;
                }
                console.log("Leveraged the strategy for: ",name);
            }

            /* Gauges */
            const gaugeproxy_ABI = require('./abis/GaugeProxy2.json');
            const gaugeproxy_addr = "0x215D5eDEb6A6a3f84AE9d72962FEaCCdF815BF27";

            const GaugeProxy = new ethers.Contract(gaugeproxy_addr, gaugeproxy_ABI, governanceSigner);
            const gauge_governance_addr = await GaugeProxy.governance();
            console.log(`gaugeProxy governance: ${gauge_governance_addr}`);
            const gaugeGovernanceSigner = await returnSigner(gauge_governance_addr);
            const gauge = await GaugeProxy.getGauge(SnowGlobe.address);
            if (gauge == 0) {
                const addGauge = await GaugeProxy.connect(gaugeGovernanceSigner).addGauge(SnowGlobe.address);
                const tx_addGauge = await addGauge.wait(1);
                if (!tx_addGauge.status) {
                    console.error(`Error adding the gauge for: ${name}`);
                    return;
                }
                console.log(`addGauge for ${name}`);
            }

            assetContract = await ethers.getContractAt("ERC20", asset_addr, walletSigner);
            console.log(`${asset_addr}, ${wallet_addr}, ${txnAmt}, ${slot}`);
            await overwriteTokenAmount(asset_addr, wallet_addr, txnAmt, slot);
        });

         async function harvester() {
            await overwriteTokenAmount(asset_addr, wallet_addr, txnAmt, slot);
            let amt = await assetContract.connect(walletSigner).balanceOf(wallet_addr);

            let balBefore = await assetContract.connect(walletSigner).balanceOf(snowglobe_addr);
            
            await assetContract.connect(walletSigner).approve(snowglobe_addr, amt);
            await SnowGlobe.connect(walletSigner).deposit(amt);
            await SnowGlobe.connect(walletSigner).earn();
            let userBal = await assetContract.connect(walletSigner).balanceOf(wallet_addr);
//            expect(userBal).to.be.equals(BigNumber.from("0x0"));
            let balAfter = await assetContract.connect(walletSigner).balanceOf(snowglobe_addr);
            //expect(balBefore).to.be.lt(balAfter);

            await fastForwardAWeek();

//            let harvestable = await Strategy.connect(walletSigner).getHarvestable();
//            console.log("\tHarvestable, pre harvest: ",harvestable.toString());
            let initialBalance = await Strategy.balanceOf();
            await Strategy.connect(walletSigner).harvest();
            await increaseBlock(2);
//            harvestable = await Strategy.getHarvestable();
//            console.log("\tHarvestable, post harvest: ",harvestable.toString());
            return [amt, initialBalance];
        };

        it("user wallet contains asset balance", async function () {
            let BNBal = await assetContract.balanceOf(await walletSigner.getAddress());
            const BN = ethers.BigNumber.from(txnAmt)._hex.toString();
            expect(BNBal).to.be.equals(BN);
        });

        it("Globe initialized with zero balance for user", async function () {
            let BNBal = await SnowGlobe.balanceOf(walletSigner._address);
            expect(BNBal).to.be.equals(BigNumber.from("0x0"));
        });

        it("Should be able to be configured correctly", async function () {
            expect(await Controller.globes(asset_addr)).to.contains(snowglobe_addr);
            //expect(await Controller.strategies(asset_addr)).to.be.equals(strategy_addr);
        });

        it("Should be able to deposit/withdraw money into globe", async function () {
            await assetContract.approve(snowglobe_addr, "2500000000000000000000000000");
            let balBefore = await assetContract.connect(walletSigner).balanceOf(snowglobe_addr);
            await SnowGlobe.connect(walletSigner).depositAll();

            let userBal = await assetContract.connect(walletSigner).balanceOf(wallet_addr);
            expect(userBal).to.be.equals(BigNumber.from("0x0"));

            let balAfter = await assetContract.connect(walletSigner).balanceOf(snowglobe_addr);
            expect(balBefore).to.be.lt(balAfter);

            await SnowGlobe.connect(walletSigner).withdrawAll();

            userBal = await assetContract.connect(walletSigner).balanceOf(wallet_addr);
            expect(userBal).to.be.gt(BigNumber.from("0x0"));
        });

        it("Harvests should make some money!", async function () {
            let initialBalance;
            [, initialBalance] = await harvester();

            let newBalance = await Strategy.balanceOf();
            //console.log(`initial balance: ${initialBalance}`);
            //console.log(`new balance: ${newBalance}`);
            expect(newBalance).to.be.gt(initialBalance);
        });

        it("Strategy loaded with initial balance", async function () {
            await assetContract.approve(snowglobe_addr,"2500000000000000000000000000");
            await SnowGlobe.connect(walletSigner).depositAll();

            await SnowGlobe.connect(walletSigner).earn();

            strategyBalance = await Strategy.balanceOf();
            expect(strategyBalance).to.not.be.equals(BigNumber.from("0x0"));
        });

        it("Users should earn some money!", async function () {
            await overwriteTokenAmount(asset_addr, wallet_addr, txnAmt, slot);
            let amt = await assetContract.connect(walletSigner).balanceOf(wallet_addr);

            await assetContract.connect(walletSigner).approve(snowglobe_addr, amt);
            await SnowGlobe.connect(walletSigner).deposit(amt);
            await SnowGlobe.connect(walletSigner).earn();

            await fastForwardAWeek();

            await Strategy.connect(walletSigner).harvest();
            await increaseBlock(1);

            await SnowGlobe.connect(walletSigner).withdrawAll();
            let newAmt = await assetContract.connect(walletSigner).balanceOf(wallet_addr);

            expect(amt).to.be.lt(newAmt);
        });

        // Issue raised at: https://github.com/Snowball-Finance/protocol/issues/76
        it("should take no commission when fees not set", async function () {

            await overwriteTokenAmount(asset_addr,wallet_addr,txnAmt,slot);
            let amt = await assetContract.connect(walletSigner).balanceOf(wallet_addr);

            await assetContract.connect(walletSigner).approve(snowglobe_addr,amt);
            await SnowGlobe.connect(walletSigner).deposit(amt);
            await SnowGlobe.connect(walletSigner).earn();

            await fastForwardAWeek();

            // Set PerformanceTreasuryFee
            await Strategy.connect(timelockSigner).setPerformanceTreasuryFee(0);

            // Set KeepPNG
            await Strategy.connect(timelockSigner).setKeep(0);
            let snobContract = await ethers.getContractAt("ERC20",snowball_addr,walletSigner);

            const globeBefore = await SnowGlobe.balance();
            const treasuryBefore = await assetContract.connect(walletSigner).balanceOf(treasury_addr);
            const snobBefore = await snobContract.balanceOf(treasury_addr);

            await Strategy.connect(walletSigner).harvest();
            await increaseBlock(1);
            const globeAfter = await SnowGlobe.balance();
            const treasuryAfter = await assetContract.connect(walletSigner).balanceOf(treasury_addr);
            const snobAfter = await snobContract.balanceOf(treasury_addr);
            const earnt = globeAfter.sub(globeBefore);
            const earntTTreasury = treasuryAfter.sub(treasuryBefore);
            const snobAccrued = snobAfter.sub(snobBefore);
            // console.log("\t💸Snowglobe profit after harvest: ", earnt.toString());
            // console.log("\t💸Treasury profit after harvest: ", earntTTreasury.toString());
            // console.log("\t💸Snowball token accrued : " + snobAccrued.toString());
            expect(snobAccrued).to.be.lt(BigNumber.from(1));
            expect(earntTTreasury).to.be.lt(BigNumber.from(1));
        }); 

        it("should take some commission when fees are set", async function () {
            // Set PerformanceTreasuryFee
            await Strategy.connect(timelockSigner).setPerformanceTreasuryFee(0);
            // Set KeepPNG
            await Strategy.connect(timelockSigner).setKeep(1000);

            let snobContract = await ethers.getContractAt("ERC20", snowball_addr, walletSigner);

            const globeBefore = await SnowGlobe.balance();
            const treasuryBefore = await assetContract.connect(walletSigner).balanceOf(treasury_addr);
            const snobBefore = await snobContract.balanceOf(treasury_addr);
            //console.log("snobBefore: ", snobBefore.toString());

            let initialBalance;
            [, initialBalance] = await harvester();

            let newBalance = await Strategy.balanceOf();
            //console.log(`initial balance: ${initialBalance}`);
            //console.log(`new balance: ${newBalance}`);

            const globeAfter = await SnowGlobe.balance();
            const treasuryAfter = await assetContract.connect(walletSigner).balanceOf(treasury_addr);
            const snobAfter = await snobContract.balanceOf(treasury_addr);
            //console.log("snobAfter: ",snobAfter.toString());
            const earnt = globeAfter.sub(globeBefore);
            const earntTTreasury = treasuryAfter.sub(treasuryBefore);
            const snobAccrued = snobAfter.sub(snobBefore);
            // console.log("\t💸Snowglobe profit after harvest: ", earnt.toString());
            // console.log("\t💸Treasury profit after harvest: ", earntTTreasury.toString());
            // console.log("\t💸Snowball token accrued : " + snobAccrued);
            expect(snobAccrued).to.be.gt(BigNumber.from(1));
            // expect(earntTTreasury).to.be.gt(BigNumber.from(1));
        });
    });
};

module.exports = { doFoldingStrategyTest };
