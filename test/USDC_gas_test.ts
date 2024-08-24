import { assert } from "chai";
import { ethers, network } from "hardhat";
import { BigNumber } from "ethers";
import { fetchNetworkConfig, obtainTokenDetails } from "../utils/networkHelpers";
import { topUpAccount } from "../utils/accountFunding";

describe("Cross-Chain USDC Transfer Test", () => {
  let sender: any, receiver: any;
  let originNetwork = "avaxTestnet";
  let targetNetwork = "ethTestnet";
  let originConfig = fetchNetworkConfig(originNetwork);
  let targetConfig = fetchNetworkConfig(targetNetwork);
  let transferAmount: BigNumber = ethers.utils.parseUnits("10", 6);
  let initialGasEstimate: BigNumber = BigNumber.from(500000);
  let usdcTransferContract: any;
  let txOutcome: any;
  let actualGasConsumed: BigNumber;
  let refinedGasEstimate: BigNumber;

  beforeEach(async () => {
    [sender, receiver] = await ethers.getSigners();
    const usdcDetails = obtainTokenDetails("usdc");
    const linkDetails = obtainTokenDetails("link");

    await network.provider.request({
      method: "hardhat_reset",
      params: [{ forking: { url: originConfig.rpcUrl } }],
    });

    const USDCTransferFactory = await ethers.getContractFactory("TransferUSDC");
    usdcTransferContract = await USDCTransferFactory.deploy(
      originConfig.routerAddress,
      linkDetails.address,
      usdcDetails.address
    );
    await usdcTransferContract.deployed();

    await topUpAccount(linkDetails.address, linkDetails.whaleAddress, usdcTransferContract.address, "100", 18);
    await topUpAccount(usdcDetails.address, usdcDetails.whaleAddress, sender.address, "100", 6);

    await usdcTransferContract.connect(sender).allowlistDestinationChain(targetConfig.chainSelector, true);

    const usdcTokenContract = await ethers.getContractAt("IERC20", usdcDetails.address);
    await usdcTokenContract.connect(sender).approve(usdcTransferContract.address, transferAmount.mul(2));
  });

  it("should successfully transfer USDC across chains and optimize gas usage", async () => {
    const initialTransfer = await usdcTransferContract.connect(sender).transferUsdc(
      targetConfig.chainSelector,
      receiver.address,
      transferAmount,
      initialGasEstimate
    );
    txOutcome = await initialTransfer.wait();
    actualGasConsumed = txOutcome.gasUsed;
    assert.equal(txOutcome.status, 1, "Initial transfer failed");

    console.log('--- Initial Transfer ---');
    console.log(`Estimated gas: ${initialGasEstimate.toString()}`);
    console.log(`Actual gas used: ${actualGasConsumed.toString()}`);

    refinedGasEstimate = actualGasConsumed.mul(110).div(100);
    const optimizedTransfer = await usdcTransferContract.connect(sender).transferUsdc(
      targetConfig.chainSelector,
      receiver.address,
      transferAmount,
      refinedGasEstimate
    );
    txOutcome = await optimizedTransfer.wait();
    actualGasConsumed = txOutcome.gasUsed;
    assert.equal(txOutcome.status, 1, "Optimized transfer failed");

    console.log('--- Optimized Transfer ---');
    console.log(`Refined gas estimate: ${refinedGasEstimate.toString()}`);
    console.log(`Actual gas used: ${actualGasConsumed.toString()}`);
  });
});
