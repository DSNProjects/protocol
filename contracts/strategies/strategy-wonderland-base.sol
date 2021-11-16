// SPDX-License-Identifier: MIT
pragma solidity ^0.6.7;

import "../lib/ownable.sol"; 
import "../lib/safe-math.sol";
import "../lib/erc20.sol";

import "../interfaces/icequeen.sol";
import "../interfaces/globe.sol";
import "../interfaces/joe.sol";
import "../interfaces/wonderland.sol"; 
import "../interfaces/controller.sol";

//Wonderland Strategy Contract Basics
abstract contract TimeBase {

    using SafeMath for uint256;
    using SafeMath for uint32;
    using SafeERC20 for IERC20;

    // Tokens
    address public wantToken; 
    address public wavax = 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7;
    address public snob = 0xC38f41A296A4493Ff429F1238e030924A1542e50;
    address public immutable Time = 0xb54f16fB19478766A268F172C9480f8da1a7c9C3;
    address public immutable Memories = 0x136Acd46C134E8269052c62A67042D6bDeDde3C9;

    // Dex
    address public constant joeRouter = 0x60aE616a2155Ee3d9A68541Ba4544862310933d4;

    // xSnob Fee Distributor
    address public feeDistributor = 0xAd86ef5fD2eBc25bb9Db41A1FE8d0f2a322c7839;

    // Perfomance fees - start with 0%
    uint256 public performanceTreasuryFee = 0;
    uint256 public constant performanceTreasuryMax = 10000;

    uint256 public performanceDevFee = 0;
    uint256 public constant performanceDevMax = 10000;

    // How many rewards tokens to keep? start with 10% converted to Snowballss
    uint256 public keep = 1000;
    uint256 public constant keepMax = 10000;

    //portion to seend to fee distributor
    uint256 public revenueShare = 3000;
    uint256 public constant revenueShareMax = 10000;

    // Withdrawal fee 0%
    // - 0% to treasury
    // - 0% to dev fund
    uint256 public withdrawalTreasuryFee = 0;
    uint256 public constant withdrawalTreasuryMax = 100000;

    uint256 public withdrawalDevFundFee = 0;
    uint256 public constant withdrawalDevFundMax = 100000;

    // User accounts
    address public governance;
    address public controller;
    address public strategist;
    address public timelock;

    address public distributor;

    mapping(address => bool) public harvesters;


    constructor (
        address _wantToken,
        address _governance,
        address _strategist,
        address _controller,
        address _timelock
    ) public {
        require(_wantToken != address(0));
        require(_governance != address(0));
        require(_strategist != address(0));
        require(_controller != address(0));
        require(_timelock != address(0));

        wantToken = _wantToken;
        governance = _governance;
        strategist = _strategist;
        controller = _controller;
        timelock = _timelock;
    }

    // **** Modifiers **** //

    modifier onlyBenevolent {
        require(
            harvesters[msg.sender] ||
            msg.sender == governance ||
            msg.sender == strategist
        );
        _;
    }

    // **** Views **** //

     function balanceOfWant() public view returns (uint256) {
        return IERC20(wantToken).balanceOf(address(this));
    }

    function balanceOfPool() public virtual view returns (uint256);

    function balanceOf() public view returns (uint256) {
        return balanceOfWant().add(balanceOfPool());
    }

     function balanceOfTime() public virtual view returns (uint256);

    function getName() external virtual pure returns (string memory);
  
    function whitelistHarvester(address _harvester) external {
        require(msg.sender == governance ||
            msg.sender == strategist, "not authorized");
        harvesters[_harvester] = true;
    }

    function revokeHarvester(address _harvester) external {
        require(msg.sender == governance ||
             msg.sender == strategist, "not authorized");
        harvesters[_harvester] = false;
    }

     function setFeeDistributor(address _feeDistributor) external {
        require(msg.sender == governance, "not authorized");
        feeDistributor = _feeDistributor;
    }

    function setWithdrawalDevFundFee(uint256 _withdrawalDevFundFee) external {
        require(msg.sender == timelock, "!timelock");
        withdrawalDevFundFee = _withdrawalDevFundFee;
    }

    function setWithdrawalTreasuryFee(uint256 _withdrawalTreasuryFee) external {
        require(msg.sender == timelock, "!timelock");
        withdrawalTreasuryFee = _withdrawalTreasuryFee;
    }

    function setPerformanceDevFee(uint256 _performanceDevFee) external {
        require(msg.sender == timelock, "!timelock");
        performanceDevFee = _performanceDevFee;
    }

    function setPerformanceTreasuryFee(uint256 _performanceTreasuryFee)
        external
    {
        require(msg.sender == timelock, "!timelock");
        performanceTreasuryFee = _performanceTreasuryFee;
    }

        function setStrategist(address _strategist) external {
        require(msg.sender == governance, "!governance");
        strategist = _strategist;
    }

    function setGovernance(address _governance) external {
        require(msg.sender == governance, "!governance");
        governance = _governance;
    }

    function setTimelock(address _timelock) external {
        require(msg.sender == timelock, "!timelock");
        timelock = _timelock;
    }

    function setController(address _controller) external {
        require(msg.sender == timelock, "!timelock");
        controller = _controller;
    }

    // **** State mutations **** //
    function deposit() public virtual;

    function depositLP() public virtual;

    // Controller only function for creating additional rewards from dust
    function withdraw(IERC20 _asset) external returns (uint256 balance) {
        require(msg.sender == controller, "!controller");
        require(wantToken != address(_asset), "want");
        balance = _asset.balanceOf(address(this));
        _asset.safeTransfer(controller, balance);
    }

    // Withdraw partial funds, normally used with a globe withdrawal
    function withdraw(uint256 _amount) external {
        require(msg.sender == controller, "!controller");
        uint256 _balance = IERC20(wantToken).balanceOf(address(this));
        if (_balance < _amount) {
            _amount = _withdrawSome(_amount.sub(_balance));
            _amount = _amount.add(_balance);
        }

        uint256 _feeDev = _amount.mul(withdrawalDevFundFee).div(
            withdrawalDevFundMax
        );
        IERC20(wantToken).safeTransfer(IController(controller).devfund(), _feeDev);

        uint256 _feeTreasury = _amount.mul(withdrawalTreasuryFee).div(
            withdrawalTreasuryMax
        );
        IERC20(wantToken).safeTransfer(
            IController(controller).treasury(),
            _feeTreasury
        );

        address _globe = IController(controller).globes(address(wantToken));
        require(_globe != address(0), "!globe"); // additional protection so we don't burn the funds

        IERC20(wantToken).safeTransfer(_globe, _amount.sub(_feeDev).sub(_feeTreasury));
    }

    function harvest() public virtual;

    function reStake() public virtual;

    function _withdrawSome(uint256 _amount) internal virtual returns (uint256);

    function _swapTraderJoeWithPath(address[] memory path, uint256 _amount)
        internal
    {
        require(path[1] != address(0));

        IJoeRouter(joeRouter).swapExactTokensForTokens(
            _amount,
            0,
            path,
            address(this),
            now.add(60)
        );
    }

}