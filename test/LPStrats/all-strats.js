const {doLPStrategyTest} = require("../lp-strategy-test");

const globeABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_token","internalType":"address"},{"type":"address","name":"_governance","internalType":"address"},{"type":"address","name":"_timelock","internalType":"address"},{"type":"address","name":"_controller","internalType":"address"}]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"available","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"controller","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"decreaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"subtractedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"depositAll","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"earn","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getRatio","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"governance","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"harvest","inputs":[{"type":"address","name":"reserve","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"increaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"addedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"max","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"min","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setController","inputs":[{"type":"address","name":"_controller","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGovernance","inputs":[{"type":"address","name":"_governance","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setMin","inputs":[{"type":"uint256","name":"_min","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setTimelock","inputs":[{"type":"address","name":"_timelock","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"timelock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC20"}],"name":"token","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"sender","internalType":"address"},{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_shares","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawAll","inputs":[]}];
const stratABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_governance","internalType":"address"},{"type":"address","name":"_strategist","internalType":"address"},{"type":"address","name":"_controller","internalType":"address"},{"type":"address","name":"_timelock","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOfPool","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOfWant","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"controller","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"deposit","inputs":[]},{"type":"function","stateMutability":"payable","outputs":[{"type":"bytes","name":"response","internalType":"bytes"}],"name":"execute","inputs":[{"type":"address","name":"_target","internalType":"address"},{"type":"bytes","name":"_data","internalType":"bytes"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getHarvestable","inputs":[]},{"type":"function","stateMutability":"pure","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"getName","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"governance","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"harvest","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"harvesters","inputs":[{"type":"address","name":"","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"keepPNG","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"keepPNGMax","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"pangolinRouter","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"performanceDevFee","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"performanceDevMax","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"performanceTreasuryFee","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"performanceTreasuryMax","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"png","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"png_avax_snob_lp","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"png_avax_snob_lp_rewards","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"revokeHarvester","inputs":[{"type":"address","name":"_harvester","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"rewards","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setController","inputs":[{"type":"address","name":"_controller","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGovernance","inputs":[{"type":"address","name":"_governance","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setKeepPNG","inputs":[{"type":"uint256","name":"_keepPNG","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setPerformanceDevFee","inputs":[{"type":"uint256","name":"_performanceDevFee","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setPerformanceTreasuryFee","inputs":[{"type":"uint256","name":"_performanceTreasuryFee","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setStrategist","inputs":[{"type":"address","name":"_strategist","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setTimelock","inputs":[{"type":"address","name":"_timelock","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setWithdrawalDevFundFee","inputs":[{"type":"uint256","name":"_withdrawalDevFundFee","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setWithdrawalTreasuryFee","inputs":[{"type":"uint256","name":"_withdrawalTreasuryFee","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"snob","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"strategist","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"timelock","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"token1","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"want","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"wavax","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"whitelistHarvester","inputs":[{"type":"address","name":"_harvester","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"balance","internalType":"uint256"}],"name":"withdraw","inputs":[{"type":"address","name":"_asset","internalType":"contract IERC20"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"balance","internalType":"uint256"}],"name":"withdrawAll","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"balance","internalType":"uint256"}],"name":"withdrawForSwap","inputs":[{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"withdrawalDevFundFee","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"withdrawalDevFundMax","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"withdrawalTreasuryFee","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"withdrawalTreasuryMax","inputs":[]}];
const tests = [
    // {
    //   name: "PngAvaxPng",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x621207093D2e65Bf3aC55dD8Bf0351B980A63815",
    // },
    // {
    //   name: "PngSnobPng",
    //   controllerAddress: "0xacc69deef119ab5bbf14e6aaf0536eafb3d6e046",
    //   snowglobeAddress: "0xB4db531076494432eaAA4C6fCD59fcc876af2734",
    // },
    // {
    //   name: "PngAvaxSnob",
    //   controllerAddress: "0xacc69deef119ab5bbf14e6aaf0536eafb3d6e046",
    //   snowglobeAddress: "0xF4072358C1E3d7841BD7AfDE31F61E17E8d99BE7",
    // },
    // {
    //   name: "PngAvaxVso",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x888Ab4CB2279bDB1A81c49451581d7c243AffbEf",
    // },
    // {
    //   name: "PngVsoPng",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x8309C64390F376fD778BDd701d54d1F8DFfe1F39",
    // },
    // {
    //   name: "PngAvaxSpore",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x27f8FE86a513bAAF18B59D3dD15218Cc629640Fc",
    // },
  //  {
  //     name: "PngSporePng",
  //     controllerAddress: "",
  //     snowglobeAddress: "0xa39785a4E4CdDa7509751ed152a00f3D37FbFa9F",
  //   },
  //   {
  //       name: "PngAvaxGb",
  //       controllerAddress: "",
  //       snowglobeAddress: "0xc3C68a28361Fa6ba292528Fe192cD59296fB2d73",
  //     },
  //   // {
    //   name: "PngAvaxBnb",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x39BF214A93EC72e42bC0B9b8C07BE1af6Fe169dA",
    // },
    // {
    //   name: "PngXavaPng",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xF23c55a05C9f24177FFF5934e8192461AeE4f304",
    // },
    // {
    //   name: "PngAvaxXava",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x6AB8DAC517c244f53D86a155a14064E86c2dE653",
    // },
    // {
    //   name: "PngAvaxPefi",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x5fb4d08bCBD444fDD5a0545fdB0C86783D186382",
    // },
    // {
    //   name: "PngPefiPng",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xf5b4Ba166b8b351C0dF92BdD6bf7d46d537185fB",
    // },
    // {
    //   name: "PngAvaxSherpa",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x5B8eE2c0a4f249e16f26d31636F1ed79df5405f9",
    // },
    // {
    //   name: "PngAvaxTryb",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xEb1010B9CF8484fcA2650525d477DD002fa889cE",
    // },
    // {
    //   name: "PngAvaxUsdtE",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x7CC8068AB5FC2D8c843C4b1A6572a1d1E742D7c8",
    // },
    // {
    //   name: "PngAvaxDaiE",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x56A6e103D860FBb991eF1Afd24250562a292b2a5",
    // },
    // {
    //   name: "PngAvaxSushiE",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x5cce813cd2bBbA5aEe6fddfFAde1D3976150b860",
    // },
    // {
    //   name: "PngAvaxLinkE",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x08D5Cfaf58a10D306937aAa8B0d2eb40466f7461",
    // },
  
    // {
    //   name: "PngAvaxWbtcE",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x04A3B139fcD004b2A4f957135a3f387124982133",
    // },
    // {
    //   name: "PngAvaxEthE",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xfEC005280ec0870A5dB1924588aE532743CEb90F",
    // },
    // {
    //   name: "PngAvaxYfiE",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x2ad520b64e6058654FE6E67bc790221772b63ecE",
    // },
    // {
    //   name: "PngAvaxUniE",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xf2596c84aCf1c7350dCF6941604DEd359dD506DB",
    // },
    // {
    //   name: "PngAvaxAaveE",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x7F8E7a8Bd63A113B202AE905877918Fb9cA13091",
    // },
    // {
    //   name: "PngUsdtEPng",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xb3DbF3ff266a604A66dbc1783257377239792828",
    // },
    // {
    //   name: "PngDaiEPng",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x45981aB8cE749466c1d2022F50e24AbBEE71d15A",
    // },
    // {
    //   name: "PngLinkEPng",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x92f75Da67c5E647D86A56a5a3D6C9a25e887504A",
    // },
    // {
    //   name: "PngWbtcEPng",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x857f9A61C97d175EaE9E0A8bb74CF701d45a18dc",
    // },
    // {
    //   name: "PngEthEPng",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xEC7dA05C3FA5612f708378025fe1C0e1904aFbb5",
    // },
    // {
    //   name: "PngAvaxYak",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x1BF90bdeb965a76Af56024EF3e70439DEa89bF3f",
    // },
    // {
    //   name: "PngYakPng",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xA829397Af2AdD7C6564a74DC072b3D9095581d70",
    // },
    // {
    //   name: "PngAvaxQi",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xeEc21abC6daD38A8515a7C3388E5ef962Cd960e6",
    // },
    // {
    //   name: "PngQiPng",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x9EC50ee696bB1c6f8f4e2181f61ad687700005cF",
    // },
    // {
    //   name: "PngAvaxDyp",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xf4a591BeaC3A4D864C3293477bBD3f86880ADa16",
    // },
    // {
    //   name: "PngAvaxWalbt",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x322094FDB02677E7a993E735826c9E183fc605a6",
    // },
    // {
    //   name: "PngAvaxUsdcE",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xd63359ff51BF1217730ae2C37979242B1a3f7c53",
    // },
    // {
    //   name: "PngUsdcEPng",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x39259A07C7B21189BF1bC2Bd75967565b3C1F16e",
    // },
    // {
    //   name: "PngAvaxTusd",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xfe1A87Cc4a2144f7eBb7d731bE80bF0e4CC6E909",
    // },
    // {
    //   name: "PngAvaxLyd",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x3F2b777d055dbD4D0812f3750Ee71190431D3Fc8",
    // },
    // {
    //   name: "PngAvaxHusky",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x150Bc67072c2dB7c55D83302B7dA7D930Eed1c3E",
    // },
    // {
    //   name: "PngAvaxGaj",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xa3528E975ed30326e4930c8F70b01F9d9608D8b1",
    // },
    // {
    //   name: "PngAvaxAve",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xD579719d3a58492D803c7d60E3565733a4ba3DEa",
    // },
    // {
    //   name: "PngAvePng",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x2B30b282405C3ee946843901dDbEc1a82562a1fC",
    // },
    // {
    //   name: "PngAvaxEle",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x096bAE6C45b0047eF3F1cf1f1c8a56eF0cd58cdE",
    // },
    // {
    //   name: "PngAvaxGdl",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x342476c1F9436277acBC088788D0De53b8b34106",
    // },
    // {
    //   name: "PngAvaxMfi",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x2F2Ba207f86b46b05a1c79e50b9f980e267719B8",
    // },
    // {
    //   name: "PngMfiPng",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x51B03A4A57da8ea9FC4549d1C54f6ccd678e2892",
    // },
    // {
    //   name: "PngAvaxFrax",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xD0686AC7d0CfFd00A29567D37774058452210D57",
    // },
    // {
    //   name: "PngAvaxFxs",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x07E837D2ae3F2fB565ABdAa80797d47412FC3a94",
    // },
    // {
    //   name: "PngAvaxStart",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x973509A4e6DfAA2B5753fC8FB4f85F861fFbA8BB",
    // },
    // {
    //   name: "PngAvaxSwap",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x7Fc1954FbC383e5c477b81c0E1CFBf3846D0dE10",
    // },
    // {
    //   name: "PngAvaxTundra",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x05Bba89E406792D2d73d6D4022347c3893b02a20",
    // },
    // {
    //   name: "PngAvaxYts",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xee4F816ac2333A346B7B3a76579F0b5342511822",
    // },
    // {
    //   name: "PngAvaxYay",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xD7601D15ce8D207Ef01f2e45c6e24Fc5A34c393f",
    // },
    // {
    //   name: "PngAvaxStorm",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x86C70CE247Cd76b776748687634382a1830b3aC4",
    // },
    // {
    //   name: "PngAvaxIce",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x42c3Fa6514Ac55F0f2CA4E910D897282829c0Ab2",
    // },
    // {
    //   name: "PngAvaxWow",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xca26bF455974B85df3Ed9cfdbf0B620D616738BF",
    // },
    // {
    //   name: "PngAvaxTeddy",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x42E1CDd48884C9027E965600B4A725a91D27255b",
    // },
    // {
    //   name: "PngAvaxMyak",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xc88477DD929837B0e6Aeafeb9Dd2Dd238505E698",
    // },
    // {
    //   name: "PngAvaxApein",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x192ae260676Ba79ccc57A6f4Ed692Bfe371658b9",
    // },
    // {
    //   name: "PngAvaxCnr",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xEf28DbfDB08c4475f5fA07Ac2aD4B8C1cFE2938a",
    // },
    // {
    //   name: "PngAvaxCycle",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x4c885E844283D9FAf10607106963768113342543",
    // },
    // {
    //   name: "PngAvaxBifi",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x07e7dF7F0612B7dc6789ba402b17c7108c932d05",
    // },
    // {
    //   name: "JoeAvaxPng",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x962ECf51A169090002CC88B4Bf16e447d2E13100",
    // },
      {
        name: "JoeAvaxJoe",
        controllerAddress: "",
        snowglobeAddress: "0xcC757081C972D0326de42875E0DA2c54af523622",
      },
    // {
    //   name: "JoeAvaxSnob",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x8b2E1802A7E0E0c7e1EaE8A7c636058964e21047",
    // },
      {
        name: "JoeAvaxXava",
        controllerAddress: "",
        snowglobeAddress: "0x0B2C4f6C54182EDeE30DFF69Be972f9E04888321",
      },
    // {
    //   name: "JoeAvaxPefi",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x68691a1e8eAAE3dFDcC300BbC0d6D3902bA06E8d",
    // },
    // {
    //   name: "JoeAvaxElk",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x6440365E1c9282F50477b1F00289b3A7218E47Ef",
    // },
    // {
    //   name: "JoeAvaxVso",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xFB3ba5884aD5eBD93C7CB095e4cE08B1C365c2ea",
    // },
    // {
    //   name: "JoeAvaxSherpa",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x75312b14Ce830EC078D93Ac8FA667b14BEAC18E6",
    // },
      {
        name: "JoeAvaxYak",
        controllerAddress: "",
        snowglobeAddress: "0x9854F6615f73e533940F90FfE8DB1eAFB424A3c7",
      },
    // {
    //   name: "JoeUsdteJoe",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xB26A7f2bCA1De2E6BFf411D2ce04ca6C3285e0E8",
    // },
    // {
    //   name: "JoeAvaxEthE",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xe13E1a491eDc640b0591D70390897620f31bbF6E",
    // },
    // {
    //   name: "JoeAvaxWbtcE",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x5c52587bD441A6e6916D2C2d32A84735b9Ee4ccD",
    // },
    // {
    //   name: "JoeAvaxUsdtE",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xc72901E3dBE5258728B329352fC4742f4966Bc1f",
    // },
    // {
    //   name: "JoeAvaxLinkE",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xfAa4f21A8Ef346370d00F1a7693FdC5D87C3e12a",
    // },
    // {
    //   name: "JoeUsdtEDaiE",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xfe19f34873fC2C7ddcB8e392791b97526B4d22e0",
    // },
    // {
    //   name: "JoeWbtcEUsdtE",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x6941618661205d5AAd2C880A0B123d19615916b0",
    // },
    // {
    //   name: "JoeUsdtEEthE",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x67b2D2579E631512faFbB1534214eA2D3403563B",
    // },
    // {
    //   name: "JoeUsdtELinkE",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x0666B3db2441A50B6a1C1d330d2f36Df18Ad5651",
    // },
    // {
    //   name: "JoeAvaxUsdcE",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xf25f6f5dad18a16033d05c1f2F558119665fDEF4",
    // },
    // {
    //   name: "JoeDaiEUsdcE",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x6C915564607d62B007D203c04473152bc090EE93",
    // },
    // {
    //   name: "JoeAvaxQi",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x9937dD4aaaCfD77BD34a88f9282fAe36fAE364f9",
    // },
    // {
    //   name: "JoeAvaxMim",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xf561EAE92039ab1540a75FDFD50ce8C6800bC078",
    // },
    // {
    //   name: "JoeAvaxTime",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x3AF37B647a08D443ef08Aff8cDdeAE33bBa56779",
    // },
    // {
    //   name: "JoeAvaxFrax",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x8ba8d732109A4eE78b0F8976B21FC88009280bd7",
    // },
    // {
    //   name: "JoeAvaxSyn",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x810CF29576E61695BA7Fe1e4D493663185691854",
    // },
    // {
    //   name: "JoeAvaxEle",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xD865B861365c777b3942122933Ff6F8aD1cD28E3",
    // },
    // {
    //   name: "JoeAvaxWet",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x34B5f24Ab10A36Cf1e82ea95c9C611162D6e3f60",
    // },
    // {
    //   name: "JoeUsdtEUsdcE",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xd596136ee746BaeE7ac159B3c21E71b3aeb81A68",
    // },
      {
        name: "JoeAvaxSpell",
        controllerAddress: "",
        snowglobeAddress: "0xec54A22B53EE66a77C5F26F860c6913472199661",
      },
    // {
    //   name: "JoeUsdcEMai",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x81Be7fBF66cF52A5cC6AD77f32361C5F3BBDAAd8",
    // },
    // {
    //   name: "JoeAvaxAavee",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xE7FfFc0D15fc238F8F1AcC40Db5B5A0240Fb116a",
    // },
    // {
    //   name: "JoeAvaxBifi",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xb58fA0e89b5a32E3bEeCf6B16704cabF8471F0E1",
    // },
    // {
    //   name: "JoeAvaxBnb",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xc33b19c3d166CcD844aeDC475A989F5C0FC79E43",
    // },
    // {
    //   name: "JoeAvaxChart",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x916aEbEE43E2bE7ed126A21208db4092392d80AD",
    // },
    // {
    //   name: "JoeAvaxKlo",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xf6E8432EF7d85Ae1202Dc537106D3696eBB27769",
    // },
    // {
    //   name: "JoeAvaxMai",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x29BF8c19e044732b110faA1Ff0Cc59CA35c13f17",
    // },
    // {
    //   name: "JoeAvaxMyak",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xb81159B533F517f0E36978b7b8e9E8409fb9C169",
    // },
    // {
    //   name: "JoeAvaxRelay",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x8C4185D7303c7865a45B46d705F40a8FAAd43Add",
    // },
    // {
    //   name: "JoeAvaxTeddy",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xb357bA896818ccCd020fb3781a443E3d3f93beFf",
    // },
    // {
    //   name: "JoeAvaxTsd",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xcEBFFa4C80291e80EA0684E4C8884124d6a81197",
    // },
    // {
    //   name: "JoeUsdceLinke",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xc28F8a82018c0b92C903Fc2D3013381b7e6ae3d5",
    // },
    // {
    //   name: "JoeUsdceEthe",
    //   controllerAddress: "",
    //   snowglobeAddress: "0x5586630339C015dF34EAB3Ae0343D37BE89671f9",
    // },
    // {
    //   name: "JoeUsdceJoe",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xDe9f979fEdf595FcfD1D09c85d194C700678cC83",
    // }, 
    // {
    //   name: "JoeUsdceWbtce",
    //   controllerAddress: "",
    //   snowglobeAddress: "0xAFB27fB1c5bd91A80d18A321D6dC09aDd6a94219",
    // },
];

for (const test of tests) {
    describe(test.name, async () => {
        doLPStrategyTest(test.name, test.snowglobeAddress, test.controllerAddress, globeABI, stratABI, 1);
    });
}
