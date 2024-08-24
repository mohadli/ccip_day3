import { ethers } from "hardhat";

export async function fundWallet(
  tokenAddress: string,
  holderAddress: string,
  recipientAddress: string,
  amount: string, // Pass the amount as a string for flexibility
  decimals: number = 18 // Default decimals to 18, but override for tokens like USDC with 6 decimals
) {
  // Impersonate the account that holds the tokens
  await ethers.provider.send("hardhat_impersonateAccount", [holderAddress]);
  const tokenHolder = await ethers.getSigner(holderAddress);

  // Get the token contract instance
  const tokenContract = await ethers.getContractAt("IERC20", tokenAddress);

  // Parse the amount into the appropriate format
  const amountToSend = ethers.parseUnits(amount, decimals);

  // Transfer tokens to the recipient
  const tx = await tokenContract.connect(tokenHolder).transfer(recipientAddress, amountToSend);
  await tx.wait();

  // Stop impersonating the account
  await ethers.provider.send("hardhat_stopImpersonatingAccount", [holderAddress]);

  console.log(`Transferred ${amount} tokens to ${recipientAddress}`);
}

