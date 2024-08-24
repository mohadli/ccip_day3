# Chainlink CCIP Starter Kit with TransferUSDC Test

This repository is based on the [Chainlink CCIP Starter Kit](https://github.com/smartcontractkit/ccip-starter-kit-hardhat/tree/main) and has been extended with additional features required for CCIP Bootcamp.

## Features

- **TransferUSDC.sol contract:** implements the cross-chain USDC transfer logic as provided in the [CCIP Day 3 Bootcamp Homework](https://cll-devrel.gitbook.io/ccip-bootcamp/day-3/day-3-homework).
- **Custom helpers:** added helper modules for managing token addresses, funding wallets, and handling other utilities.
- **CCIP fork simulator:** utilizes Chainlink's CCIP fork simulator to test cross-chain functionalities in a controlled environment.
- **Wallet funding with impersonation:** for testing, there is Hardhat's impersonation feature to fund wallets with required tokens.

## Setup Instructions

### 1. Clone the Repository

To get started, clone this repository:

```bash
git clone https://github.com/your-username/ccip-transfer-usdc-test.git
cd ccip-transfer-usdc-test
```

### 2. Install Dependencies

Install the necessary dependencies using npm:

```bash
npm install
```

### 3. Configure Environment Variables

This project uses the [@chainlink/env-enc](https://www.npmjs.com/package/@chainlink/env-enc) library for managing environment variables securely. Follow these steps to set up your environment variables:

1. Install the `@chainlink/env-enc` package if it's not already installed:

   ```bash
   npm install @chainlink/env-enc
   ```

2. Create an `.env.enc` file in the root directory for your encrypted environment variables. Refer to the [@chainlink/env-enc documentation](https://www.npmjs.com/package/@chainlink/env-enc) for encryption and decryption instructions.

3. Use the `env-enc` CLI to manage your environment variables securely.

### 4. Run the Tests

After setting up the environment variables, you can run the tests using Hardhat:

```bash
npx hardhat test
```

This will execute the tests, including the ones that utilize Chainlink's CCIP fork simulator to test the TransferUSDC.sol contract.

## Project Structure

- **contracts/**: the TransferUSDC.sol contract and any other Solidity contracts.
- **helpers/**: helper modules for token management, funding wallets, and other utilities.
- **test/**: the test files, including the test for TransferUSDC.sol.

## Useful Links

- [CCIP Day 3 Bootcamp Homework](https://cll-devrel.gitbook.io/ccip-bootcamp/day-3/day-3-homework): source of the TransferUSDC.sol contract and homework details.
- [Chainlink CCIP Starter Kit](https://github.com/smartcontractkit/ccip-starter-kit-hardhat/tree/main): the starter kit this project is based on.
- [CCIP Gas Estimation Tutorial](https://docs.chain.link/ccip/tutorials/ccipreceive-gaslimit#gas-estimation-on-a-testnet): guide on estimating gas usage for cross-chain interactions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
