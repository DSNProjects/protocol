const { doFoldingStrategyTest } = require("../folding-strategy-test");

const stratBaseABI = require('./../abis/BenqiStratBaseABI.json');

const tests = [
  // {
  //   name: "BenqiUsdcE",
  // },
  // {
  //   name: "BenqiLinkE",
  // },
  {
    name: "BenqiQi",
    fold: false,
    slot: 1
  },
  // {
  //   name: "BenqiWbtcE",
  // },
  // {
  //   name: "BenqiEthE",
  // },
  // {
  //   name: "BenqiWavax",
  // },
];

for (const test of tests) {
  describe(test.name, async () => {
    doFoldingStrategyTest(
      test.name,
      test.snowglobeAddress,
      test.strategyAddress,
      test.slot, // slot
      test.fold, // fold?
      "benqi");
  });
}
