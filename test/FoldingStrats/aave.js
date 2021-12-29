const { doFoldingStrategyTest } = require("../folding-strategy-test");

// Leaving Strategy Address blank will make generic-test.js instead build and deploy a new Contract specified by stratABI
//const globeABI = require('./../abis/GlobeABI.json');
//const stratBaseABI = require('./../abis/StrategyAaveDai.json');
//const stratBaseABI = require('./../abis/BenqiStratBaseABI.json');

const tests = [

  {
    name: "AaveDai",
//    tokenAddress: "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
    strategyAddress: "0xfc26ec0c916b9f573bbdfd1eda87d5192339bd5b",
    snowglobeAddress: "0xE4543C234D4b0aD6d29317cFE5fEeCAF398f5649",
  },
  {
    name: "AaveUsdc",
//    tokenAddress: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
    strategyAddress: "0xfce6dee4805df0c8bb981549e92922485c90861e",
    snowglobeAddress: "0x0c33d6076F0Dce93db6e6103E98Ad951A0F33917",
  },
  {
    name: "AaveUsdt",
//    tokenAddress: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
    strategyAddress: "0x1c670e7d2b294e24f71d61f7e0abf5d51fad69fe",
    snowglobeAddress: "0x567350328dB688d49284e79F7DBfad2AAd094B7A",
  },

  {
    name: "AaveWavax",
//    tokenAddress: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    strategyAddress: "0xefb83d176c6632cf787214b7e130aaca99d936ff",
    snowglobeAddress: "0x951f6c751A9bC5A75a4E4d43be205aADa709D3B8",
    slot: 3
  },
  
  {
    name: "AaveWbtc",
//    tokenAddress: "0x50b7545627a5162F82A992c33b87aDc75187B218",
    strategyAddress: "0x569b2b8254b6887c6a9f310de220506c8e0e2256",
    snowglobeAddress: "0xcB707aA965aEB9cB03d21dFADf496e6581Cd7b96",
  },
  {
    name: "AaveWeth",
//    tokenAddress: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
    strategyAddress: "0x297991e25f6c4ecb3d10e9c6ee55767d6b727b8c",
    snowglobeAddress: "0x72b7AddaeFE3e4b6452CFAEcf7C0d11e5EBD05a0",
  },


   /**********/

  {
    name: "AaveDai",
    snowglobeAddress: "0xE4543C234D4b0aD6d29317cFE5fEeCAF398f5649",
  },
  {
    name: "AaveUsdc",
    snowglobeAddress: "0x0c33d6076F0Dce93db6e6103E98Ad951A0F33917",
  },
  {
    name: "AaveUsdt",
    snowglobeAddress: "0x567350328dB688d49284e79F7DBfad2AAd094B7A",
  },
  {
    name: "AaveWavax",
    snowglobeAddress: "0x951f6c751A9bC5A75a4E4d43be205aADa709D3B8",
    slot: 3
  },
  {
    name: "AaveWbtc",
    snowglobeAddress: "0xcB707aA965aEB9cB03d21dFADf496e6581Cd7b96",
  },
  {
    name: "AaveWeth",
    snowglobeAddress: "0x72b7AddaeFE3e4b6452CFAEcf7C0d11e5EBD05a0",
  },


];

describe("AAVE Folding", function () {
   for (const test of tests) {
      doFoldingStrategyTest(
         test.name,
         test.snowglobeAddress,
         test.strategyAddress,
         test.slot,
         test.fold,
         "aave"
      );
   }
})
