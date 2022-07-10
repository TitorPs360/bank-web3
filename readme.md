## About Bank Web3

_BankWeb3_ - a project that build a bank in the decentralized era.

In this project, I built a banking system based on smart contracts with deposit, withdrawal and transfer capabilities and user interface that wasy to use.

## Requirements

- NodeJS

## Install

```
git clone https://github.com/TitorPs360/bank-web3
cd bank-web3/frontend
yarn

cd ../..
cd bank-web3/smart-contract
yarn
```

## Usage

1. Build your contract artifact

   ```bash
   cd bank-web3/smart-contract
   yarn build
   ```

2. Copy `Bank.json` in `smart-contract\artifacts\contracts\Bank.sol\` to `C:\Users\paeto\Desktop\Work\scb10x\frontend\bank\build\contracts`

3. Start local testnet

   ```bash
   yarn chain
   ```

4. Deploy your contract

   ```bash
   yarn deploy
   ```

5. Get your contract andress and place it in `frontend\bank\web3.ts`

6. Start your frontend

   ```bash
   cd ../..
   cd bank-web3/frontend
   yarn dev
   ```

7. Test our function with user interface at [http://localhost:3000](http://localhost:3000)

8. Test smart contract

   ```bash
   cd ../..
   cd bank-web3/smart-contract
   yarn test:light
   ```
