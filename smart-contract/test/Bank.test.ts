import {ethers} from 'hardhat';
import chai from 'chai';

import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';

const {expect} = chai;

console.log('Start testing');

describe('Bank Contract', async () => {
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addrs: SignerWithAddress[];

  let bank: any;

  beforeEach(async () => {
    // eslint-disable-next-line no-unused-vars
    // [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    const Bank = await ethers.getContractFactory('Bank');
    bank = await Bank.deploy();
  });

  // const Bank = await ethers.getContractFactory('Bank');
  // const bank = await Bank.deploy();

  describe('Deployment', async () => {
    it('Should have the right owner', async () => {
      expect(await bank.getOwner()).to.equal(owner.address);
    });
  });

  describe('Create Account', async () => {
    it(`Address1 should create account name 'myaccount_01'`, async () => {
      await bank.connect(addr1).creatAccount('myaccount_01');
      expect(await bank.connect(addr1).getCurrentAccountList()).to.eql(['myaccount_01']);
    });

    it(`Address1 should not able to create account name 'myaccount_01' again`, async () => {
      try {
        await bank.connect(addr1).creatAccount('myaccount_01');
        await bank.connect(addr1).creatAccount('myaccount_01');
      } catch (err) {
        expect(err).to.match(/(?:Account name already exist)/);
      }
    });

    it(`Address2 should not able to create account name 'myaccount_01'`, async () => {
      try {
        await bank.connect(addr1).creatAccount('myaccount_01');
        await bank.connect(addr2).creatAccount('myaccount_01');
      } catch (err) {
        expect(err).to.match(/(?:Account name already exist)/);
      }
    });

    it(`Address1 should create account name 'myaccount_02'`, async () => {
      await bank.connect(addr1).creatAccount('myaccount_01');
      await bank.connect(addr1).creatAccount('myaccount_02');
      expect(await bank.connect(addr1).getCurrentAccountList()).to.eql(['myaccount_01', 'myaccount_02']);
    });

    it(`Address2 should create account name 'myaccount_03'`, async () => {
      await bank.connect(addr2).creatAccount('myaccount_03');
      expect(await bank.connect(addr2).getCurrentAccountList()).to.eql(['myaccount_03']);
    });
  });

  describe('Transaction', async () => {
    it(`'myaccount_01' of Address1 should have 0 balance`, async () => {
      bank.connect(addr1).creatAccount('myaccount_01');
      expect(await bank.connect(addr1).getCurrentAccountList()).to.eql(['myaccount_01']);
      expect(await bank.connect(addr1).getAccountBalance('myaccount_01')).to.eql(ethers.utils.parseEther('0'));
    });

    it(`Address2 shouldn't able to view 'myaccount_01' balance`, async () => {
      try {
        bank.connect(addr1).creatAccount('myaccount_01');
        await bank.connect(addr2).getAccountBalance('myaccount_01');
      } catch (err) {
        expect(err).to.match(/(?:No permission in this account)/);
      }
    });

    describe('Deposit', async () => {
      it(`Address1 should deposit 400 ETH to 'myaccount_01'`, async function () {
        bank.connect(addr1).creatAccount('myaccount_01');

        await bank.connect(addr1).deposit('myaccount_01', {value: ethers.utils.parseEther('400')});
        expect(await bank.connect(addr1).getAccountBalance('myaccount_01')).to.equal(ethers.utils.parseEther('400'));
      });

      it(`Address2 should deposit 100 ETH to 'myaccount_01'`, async function () {
        bank.connect(addr1).creatAccount('myaccount_01');

        await bank.connect(addr1).deposit('myaccount_01', {value: ethers.utils.parseEther('400')});
        await bank.connect(addr2).deposit('myaccount_01', {value: ethers.utils.parseEther('100')});
        expect(await bank.connect(addr1).getAccountBalance('myaccount_01')).to.equal(ethers.utils.parseEther('500'));
      });

      it(`Address1 shouldn't able to deposit 20000 ETH to 'myaccount_01'`, async function () {
        try {
          await await bank.connect(addr1).deposit('myaccount_01', {value: ethers.utils.parseEther('20000')});
        } catch (err) {
          expect(err).to.match(/(?:sender doesn't have enough funds)/);
        }
      });

      it(`Address1 shouldn't able to deposit -500 ETH to 'myaccount_01'`, async function () {
        try {
          await await bank.connect(addr1).deposit('myaccount_01', {value: ethers.utils.parseEther('-500')});
        } catch (err) {
          expect(err).to.match(/(?:invalid hex string)/);
        }
      });

      it(`Address1 shouldn't able to deposit 100 ETH to 'myaccount_05'`, async function () {
        try {
          await await bank.connect(addr1).deposit('myaccount_05', {value: ethers.utils.parseEther('100')});
        } catch (err) {
          expect(err).to.match(/(?:Account name not found)/);
        }
      });
    });

    describe('Withdraw', async () => {
      it(`Address1 should withdraw 100 ETH from 'myaccount_01'`, async function () {
        bank.connect(addr1).creatAccount('myaccount_01');
        bank.connect(addr1).creatAccount('myaccount_02');
        bank.connect(addr2).creatAccount('myaccount_03');
        await bank.connect(addr1).deposit('myaccount_01', {value: ethers.utils.parseEther('500')});
        await bank.connect(addr1).transfer('myaccount_01', 'myaccount_02', ethers.utils.parseEther('100'));
        await bank.connect(addr1).transfer('myaccount_01', 'myaccount_03', ethers.utils.parseEther('100'));
        await bank.connect(addr1).withdraw('myaccount_01', ethers.utils.parseEther('100'));
        expect(await bank.connect(addr1).getAccountBalance('myaccount_01')).to.equal(ethers.utils.parseEther('200'));
      });

      it(`Address1 shouldn't able to withdraw 500 ETH from 'myaccount_01'`, async function () {
        bank.connect(addr1).creatAccount('myaccount_01');
        bank.connect(addr1).creatAccount('myaccount_02');
        bank.connect(addr2).creatAccount('myaccount_03');
        await bank.connect(addr1).deposit('myaccount_01', {value: ethers.utils.parseEther('500')});
        await bank.connect(addr1).transfer('myaccount_01', 'myaccount_02', ethers.utils.parseEther('100'));
        await bank.connect(addr1).transfer('myaccount_01', 'myaccount_03', ethers.utils.parseEther('100'));
        await bank.connect(addr1).withdraw('myaccount_01', ethers.utils.parseEther('100'));

        try {
          await bank.connect(addr1).withdraw('myaccount_01', ethers.utils.parseEther('500'));
        } catch (err) {
          expect(err).to.match(/(?:Balance not sufficient)/);
        }
      });

      it(`Address2 shouldn't able to withdraw 100 ETH from 'myaccount_01'`, async function () {
        bank.connect(addr1).creatAccount('myaccount_01');
        bank.connect(addr1).creatAccount('myaccount_02');
        bank.connect(addr2).creatAccount('myaccount_03');
        await bank.connect(addr1).deposit('myaccount_01', {value: ethers.utils.parseEther('500')});
        await bank.connect(addr1).transfer('myaccount_01', 'myaccount_02', ethers.utils.parseEther('100'));
        await bank.connect(addr1).transfer('myaccount_01', 'myaccount_03', ethers.utils.parseEther('100'));
        await bank.connect(addr1).withdraw('myaccount_01', ethers.utils.parseEther('100'));

        try {
          await bank.connect(addr1).withdraw('myaccount_01', ethers.utils.parseEther('100'));
        } catch (err) {
          expect(err).to.match(/(?:No permission in this account)/);
        }
      });

      it(`Address1 shouldn't able to withdraw -100 ETH from 'myaccount_01'`, async function () {
        bank.connect(addr1).creatAccount('myaccount_01');
        bank.connect(addr1).creatAccount('myaccount_02');
        bank.connect(addr2).creatAccount('myaccount_03');
        await bank.connect(addr1).deposit('myaccount_01', {value: ethers.utils.parseEther('500')});
        await bank.connect(addr1).transfer('myaccount_01', 'myaccount_02', ethers.utils.parseEther('100'));
        await bank.connect(addr1).transfer('myaccount_01', 'myaccount_03', ethers.utils.parseEther('100'));
        await bank.connect(addr1).withdraw('myaccount_01', ethers.utils.parseEther('100'));

        try {
          await bank.connect(addr1).withdraw('myaccount_01', ethers.utils.parseEther('-100'));
        } catch (err) {
          expect(err).to.match(/(?:value out-of-bounds)/);
        }
      });

      it(`Address1 shouldn't able to withdraw 100 ETH from 'myaccount_05'`, async function () {
        bank.connect(addr1).creatAccount('myaccount_01');
        bank.connect(addr1).creatAccount('myaccount_02');
        bank.connect(addr2).creatAccount('myaccount_03');
        await bank.connect(addr1).deposit('myaccount_01', {value: ethers.utils.parseEther('500')});
        await bank.connect(addr1).transfer('myaccount_01', 'myaccount_02', ethers.utils.parseEther('100'));
        await bank.connect(addr1).transfer('myaccount_01', 'myaccount_03', ethers.utils.parseEther('100'));
        await bank.connect(addr1).withdraw('myaccount_01', ethers.utils.parseEther('100'));

        try {
          await bank.connect(addr1).withdraw('myaccount_05', ethers.utils.parseEther('100'));
        } catch (err) {
          expect(err).to.match(/(?:Account name not found)/);
        }
      });
    });

    describe('Transfer', async () => {
      it(`Address1 should transfer 100 ETH from 'myaccount_01' to 'myaccount_02' with no fee`, async function () {
        bank.connect(addr1).creatAccount('myaccount_01');
        bank.connect(addr1).creatAccount('myaccount_02');
        bank.connect(addr2).creatAccount('myaccount_03');
        await bank.connect(addr1).deposit('myaccount_01', {value: ethers.utils.parseEther('500')});
        await bank.connect(addr1).transfer('myaccount_01', 'myaccount_02', ethers.utils.parseEther('100'));
        expect(await bank.connect(addr1).getAccountBalance('myaccount_01')).to.equal(ethers.utils.parseEther('400'));
        expect(await bank.connect(addr1).getAccountBalance('myaccount_02')).to.equal(ethers.utils.parseEther('100'));
      });

      it(`Address1 should transfer 100 ETH from 'myaccount_01' to 'myaccount_03' with 1% fee`, async function () {
        bank.connect(addr1).creatAccount('myaccount_01');
        bank.connect(addr1).creatAccount('myaccount_02');
        bank.connect(addr2).creatAccount('myaccount_03');
        await bank.connect(addr1).deposit('myaccount_01', {value: ethers.utils.parseEther('500')});
        await bank.connect(addr1).transfer('myaccount_01', 'myaccount_02', ethers.utils.parseEther('100'));
        await bank.connect(addr1).transfer('myaccount_01', 'myaccount_03', ethers.utils.parseEther('100'));
        expect(await bank.connect(addr1).getAccountBalance('myaccount_01')).to.equal(ethers.utils.parseEther('300'));
        expect(await bank.connect(addr2).getAccountBalance('myaccount_03')).to.equal(ethers.utils.parseEther('99'));
      });

      it(`Address1 shouldn't able to transfer -100 ETH from 'myaccount_01' to 'myaccount_02`, async function () {
        bank.connect(addr1).creatAccount('myaccount_01');
        bank.connect(addr1).creatAccount('myaccount_02');
        bank.connect(addr2).creatAccount('myaccount_03');
        await bank.connect(addr1).deposit('myaccount_01', {value: ethers.utils.parseEther('500')});
        await bank.connect(addr1).transfer('myaccount_01', 'myaccount_02', ethers.utils.parseEther('100'));
        await bank.connect(addr1).transfer('myaccount_01', 'myaccount_03', ethers.utils.parseEther('100'));

        try {
          await bank.connect(addr1).transfer('myaccount_01', 'myaccount_02', ethers.utils.parseEther('-100'));
        } catch (err) {
          // console.log(err);
          expect(err).to.match(/(?:value out-of-bounds)/);
        }
      });

      it(`Address1 shouldn't able to transfer from 'myaccount_01' to 'myaccount_05'`, async function () {
        bank.connect(addr1).creatAccount('myaccount_01');
        bank.connect(addr1).creatAccount('myaccount_02');
        bank.connect(addr2).creatAccount('myaccount_03');

        await bank.connect(addr1).deposit('myaccount_01', {value: ethers.utils.parseEther('500')});
        await bank.connect(addr1).transfer('myaccount_01', 'myaccount_02', ethers.utils.parseEther('100'));
        await bank.connect(addr1).transfer('myaccount_01', 'myaccount_03', ethers.utils.parseEther('100'));

        try {
          await bank.connect(addr1).bulkTransfer('myaccount_01', ['myaccount_05'], ethers.utils.parseEther('100'));
        } catch (err) {
          expect(err).to.match(/(?:Receiver account not found)/);
        }
      });

      it(`Address1 shouldn't able to transfer from 'myaccount_05' to 'myaccount_01'`, async function () {
        bank.connect(addr1).creatAccount('myaccount_01');
        bank.connect(addr1).creatAccount('myaccount_02');
        bank.connect(addr2).creatAccount('myaccount_03');

        await bank.connect(addr1).deposit('myaccount_01', {value: ethers.utils.parseEther('500')});
        await bank.connect(addr1).transfer('myaccount_01', 'myaccount_02', ethers.utils.parseEther('100'));
        await bank.connect(addr1).transfer('myaccount_01', 'myaccount_03', ethers.utils.parseEther('100'));

        try {
          await bank.connect(addr1).bulkTransfer('myaccount_05', ['myaccount_01'], ethers.utils.parseEther('100'));
        } catch (err) {
          expect(err).to.match(/(?:Sender account not found)/);
        }
      });

      it(`Address1 bulk transfer from 'myaccount_01' to 'myaccount_02' and 'myaccount_03' 100 ETH`, async function () {
        bank.connect(addr1).creatAccount('myaccount_01');
        bank.connect(addr1).creatAccount('myaccount_02');
        bank.connect(addr2).creatAccount('myaccount_03');
        await bank.connect(addr1).deposit('myaccount_01', {value: ethers.utils.parseEther('500')});

        await bank
          .connect(addr1)
          .bulkTransfer('myaccount_01', ['myaccount_02', 'myaccount_03'], ethers.utils.parseEther('100'));

        expect(await bank.connect(addr1).getAccountBalance('myaccount_01')).to.equal(ethers.utils.parseEther('300'));
        expect(await bank.connect(addr1).getAccountBalance('myaccount_02')).to.equal(ethers.utils.parseEther('100'));
        expect(await bank.connect(addr2).getAccountBalance('myaccount_03')).to.equal(ethers.utils.parseEther('99'));
      });

      it(`Address1 shouldn't able bulk transfer from 'myaccount_01' to 'myaccount_02' and 'myaccount_05' 100 ETH`, async function () {
        bank.connect(addr1).creatAccount('myaccount_01');
        bank.connect(addr1).creatAccount('myaccount_02');
        bank.connect(addr2).creatAccount('myaccount_03');
        await bank.connect(addr1).deposit('myaccount_01', {value: ethers.utils.parseEther('500')});

        try {
          await bank
            .connect(addr1)
            .bulkTransfer('myaccount_01', ['myaccount_02', 'myaccount_05'], ethers.utils.parseEther('100'));
        } catch (err) {
          expect(err).to.match(/(?:Receiver account not found)/);
        }
      });
    });
  });
});
