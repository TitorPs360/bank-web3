import React, { FC, useState, useEffect } from 'react';

// import Web3 from 'web3';
import web3 from '@bank/web3';
import bank from '@bank/bank';

import { useAddress } from '@thirdweb-dev/react';

import { FaTimes } from 'react-icons/fa';
import { BsPlusCircle } from 'react-icons/bs';

interface AccountProps {
  accountName: string;
  balance: string;
  fetchAccountInfo: () => void;
  healthCheck: () => Promise<any>;
}

const AddAccountCard: FC<AccountProps> = (props) => {
  const [option, setOption] = useState<string>('home');
  const [depositAmount, setDepositAmount] = useState<string>('');
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [transferAccountName, setTransferAccountName] = useState<string[]>(['aaa']);
  const [transferAmount, setTransferAmount] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorDialog, setErrorDialog] = useState<boolean>(false);

  const address = useAddress();

  const deposit = async () => {
    if ((await props.healthCheck()) == 'OK') {
      return bank.methods
        .deposit(props.accountName)
        .send({
          from: address,
          value: web3.utils.toWei(depositAmount, 'ether'),
        })
        .then(() => {
          console.log(`Deposit ${depositAmount} ETH to Account ${props.accountName} success`);
          setOption('home');
          props.fetchAccountInfo();
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(error.message);
          // setErrorMessage(error);
          setErrorDialog(true);
        });
    }
  };

  const handleChangeDepositAmount = (event) => {
    setDepositAmount(event.target.value);
    setErrorDialog(false);
  };

  const withdraw = async () => {
    if ((await props.healthCheck()) == 'OK') {
      return bank.methods
        .withdraw(props.accountName, web3.utils.toWei(withdrawAmount, 'ether'))
        .send({
          from: address,
          gas: 3000000,
        })
        .then(() => {
          console.log(`Withdraw ${withdrawAmount} ETH from Account ${props.accountName} success`);
          setOption('home');
          props.fetchAccountInfo();
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(error.message);
          setErrorDialog(true);
        });
    }
  };

  const handleChangeWithdrawAmount = (event) => {
    setWithdrawAmount(event.target.value);
    setErrorDialog(false);
  };

  const transfer = async () => {
    if ((await props.healthCheck()) == 'OK') {
      return bank.methods
        .bulkTransfer(
          props.accountName,
          transferAccountName,
          web3.utils.toWei(transferAmount, 'ether')
        )
        .send({
          from: address,
          gas: 3000000,
        })
        .then(() => {
          console.log(
            `Transfer ${transferAmount} ETH from Account ${props.accountName} to ${transferAccountName} success`
          );
          setOption('home');
          props.fetchAccountInfo();
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage(error.message);
          setErrorDialog(true);
        });
    }
  };

  const addNewAccountName = async () => {
    const changeTransferAccountName = [...transferAccountName];
    changeTransferAccountName.push('');
    await setTransferAccountName(changeTransferAccountName);
    console.log(changeTransferAccountName);
  };

  const handleChangeTransferAccountName = (event, i) => {
    const changeTransferAccountName = [...transferAccountName];
    changeTransferAccountName[i] = event.target.value;
    setTransferAccountName(changeTransferAccountName);
    setErrorDialog(false);
  };

  const handleChangeTransferAmount = (event) => {
    setTransferAmount(event.target.value);
    setErrorDialog(false);
  };

  return (
    <div className="grid place-items-stretch">
      {option == 'home' && (
        <div className="p-10 flex flex-col rounded-t-lg border-2 border-blue-700">
          <span className="text-xl font-semibold whitespace-nowrap text-white ">
            Account name: {props.accountName}
          </span>

          <span className="text-xl font-semibold whitespace-nowrap text-white ">
            Balance: <span className="text-logo_orange">{props.balance}</span> ETH
          </span>
        </div>
      )}

      {option == 'deposit' && (
        <div className="p-10 flex flex-col rounded-t-lg border-2 border-blue-700">
          <form className="w-full max-w-sm mx-auto">
            <div className="flex items-center border-b border-blue-700 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="number"
                placeholder="Deposit amount"
                aria-label="Deposit amount"
                onChange={handleChangeDepositAmount}
                value={depositAmount}
              />

              <div className="flex-shrink-0 text-white text-sm py-1 px-2">ETH</div>

              <button
                className="flex-shrink-0 bg-blue-700 hover:bg-blue-900 border-blue-700 hover:border-blue-900 text-sm border-4 text-white py-1 px-2 rounded"
                type="button"
                onClick={deposit}
              >
                Deposit
              </button>
            </div>
          </form>

          {errorDialog && (
            <div className="pt-2">
              <div className="w-3/4 mx-auto bg-red-700 hover:bg-red-900 border-red-700 hover:border-red-900 text-sm border-4 text-white py-1 rounded text-center">
                <div className="flex justify-center">
                  <FaTimes size={20} className="mr-2" />
                  <span> {errorMessage} </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {option == 'withdraw' && (
        <div className="p-10 flex flex-col rounded-t-lg border-2 border-blue-700">
          <form className="w-full max-w-sm mx-auto">
            <div className="flex items-center border-b border-blue-700 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="number"
                placeholder="Withdraw amount"
                aria-label="Withdraw amount"
                onChange={handleChangeWithdrawAmount}
                value={withdrawAmount}
              />

              <div className="flex-shrink-0 text-white text-sm py-1 px-2">ETH</div>

              <button
                className="flex-shrink-0 bg-blue-700 hover:bg-blue-900 border-blue-700 hover:border-blue-900 text-sm border-4 text-white py-1 px-2 rounded"
                type="button"
                onClick={withdraw}
              >
                Withdraw
              </button>
            </div>
          </form>

          {errorDialog && (
            <div className="pt-2">
              <div className="w-3/4 mx-auto bg-red-700 hover:bg-red-900 border-red-700 hover:border-red-900 text-sm border-4 text-white py-1 rounded text-center">
                <div className="flex justify-center">
                  <FaTimes size={20} className="mr-2" />
                  <span> {errorMessage} </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {option == 'transfer' && (
        <div className="p-10 flex flex-col rounded-t-lg border-2 border-blue-700">
          <form className="w-full max-w-sm mx-auto">
            <div className="flex items-center py-2 flex-col">
              {transferAccountName.map((accountName, i) => {
                return (
                  <div key={i} className="py-2 w-full flex items-center border-b border-blue-700">
                    <input
                      className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                      type="text"
                      placeholder="Tranfer to"
                      aria-label="Tranfer to"
                      onChange={(event) => handleChangeTransferAccountName(event, i)}
                      value={accountName}
                    />
                  </div>
                );
              })}

              <div className="pt-4 w-full">
                <button
                  className="border-dashed border-2 border-blue-700 w-full text-white py-1 px-2 leading-tight rounded"
                  type="button"
                  onClick={addNewAccountName}
                >
                  <div className="flex justify-center">
                    <BsPlusCircle size={20} className="mr-2" />
                    <span> Add others account</span>
                  </div>
                </button>
              </div>

              {/* <button
              className="w-full bg-blue-700 hover:bg-blue-900 border-blue-700 hover:border-blue-900 text-sm border-4 text-white py-1 rounded"
              type="button"
              onClick={transfer}
            >
              Transfer
            </button> */}
            </div>

            <div className="py-4">
              <div className="w-full border-t border-gray-300"></div>
            </div>

            <div className="flex items-center border-b border-blue-700">
              <input
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="number"
                placeholder="Transfer amount"
                aria-label="Transfer amount"
                onChange={handleChangeTransferAmount}
                value={transferAmount}
              />

              <div className="flex-shrink-0 text-white text-sm py-1 px-2">ETH</div>
            </div>
          </form>

          <div className="pt-2">
            <button
              className="w-full bg-blue-700 hover:bg-blue-900 border-blue-700 hover:border-blue-900 text-sm border-4 text-white py-1 rounded"
              type="button"
              onClick={transfer}
            >
              Transfer
            </button>
          </div>

          {errorDialog && (
            <div className="pt-2">
              <div className="w-3/4 mx-auto bg-red-700 hover:bg-red-900 border-red-700 hover:border-red-900 text-sm border-4 text-white py-1 rounded text-center">
                <div className="flex justify-center">
                  <FaTimes size={20} className="mr-2" />
                  <span> {errorMessage} </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-center rounded-b-lg border-r-2 border-l-2 border-b-2 border-blue-700">
        <div className="w-full inline-flex" role="group">
          {option == 'deposit' ? (
            <button
              type="button"
              className="rounded-bl-lg inline-block w-1/3 py-6 border-r-2 border-blue-700 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
              onClick={() => {
                setOption('home');
              }}
            >
              Home
            </button>
          ) : (
            <button
              type="button"
              className="rounded-bl-lg inline-block w-1/3 py-6 border-r-2 border-blue-700 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
              onClick={() => {
                setOption('deposit');
              }}
            >
              Deposit
            </button>
          )}

          {option == 'withdraw' ? (
            <button
              type="button"
              className="inline-block w-1/3 py-6 border-r-2 border-blue-700 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
              onClick={() => {
                setOption('home');
              }}
            >
              Home
            </button>
          ) : (
            <button
              type="button"
              className="inline-block w-1/3 py-6 border-r-2 border-blue-700 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
              onClick={() => {
                setOption('withdraw');
              }}
            >
              Withdraw
            </button>
          )}

          {option == 'transfer' ? (
            <button
              type="button"
              className="rounded-br-lg inline-block w-1/3 py-6 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
              onClick={() => {
                setOption('home');
              }}
            >
              Home
            </button>
          ) : (
            <button
              type="button"
              className="rounded-br-lg inline-block w-1/3 py-6 text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
              onClick={() => {
                setOption('transfer');
              }}
            >
              Transfer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddAccountCard;
