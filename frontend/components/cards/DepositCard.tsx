import React, { FC } from 'react';

import bank from '@bank/bank';

import { useState } from 'react';

import { FaCheck, FaTimes } from 'react-icons/fa';

import { useAddress } from '@thirdweb-dev/react';

import { useRouter } from 'next/router';

interface DepositCardProps {
  setCreateAccountStatus: (param: any) => void;
  setCreateAccountName: (param: any) => void;
}

const DepositCard: FC<DepositCardProps> = (props) => {
  const [accountName, setAccountName] = useState();
  const [accountNameStatus, setAccountNameStatus] = useState(false);
  const [showCheckDialog, setShowCheckDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const address = useAddress();
  const router = useRouter();

  const healthCheck = async () => {
    const res = await bank.methods.healthCheck().call();
    return res;
  };

  const checkAccountExist = async () => {
    if ((await healthCheck()) == 'OK') {
      if (accountName != undefined) {
        const res = await bank.methods.checkAccountExist(accountName).call();
        if (res) {
          setDialogMessage('Account name is already inuse');
        } else {
          setDialogMessage('Account name is able to use');
        }
        setAccountNameStatus(!res);
        setShowCheckDialog(true);
      } else {
        setDialogMessage('Account name is invalid');
        console.log('Account name invalid');
        setShowCheckDialog(true);
      }
    } else {
      console.log('Contract is not response');
    }
  };

  const createAccount = async () => {
    if ((await healthCheck()) == 'OK') {
      if (accountName != undefined) {
        bank.methods
          .creatAccount(accountName)
          .send({
            from: address,
            gas: 3000000,
          })
          .then((res) => {
            props.setCreateAccountStatus(true);
            props.setCreateAccountName(accountName);
            // router.push('/');
          })
          .catch((error) => {
            setDialogMessage(error);
            setAccountNameStatus(false);
            setShowCheckDialog(true);
          });
      } else {
        setDialogMessage('Account name is invalid');
        console.log('Account name invalid');
        setShowCheckDialog(true);
      }
    } else {
      console.log('Contract is not response');
    }

    // setAccountNameStatus(false);
  };

  const onAccountNameChangeHandler = (event) => {
    setAccountName(event.target.value);
    setAccountNameStatus(false);
    setShowCheckDialog(false);
  };

  return (
    <div className="border-dashed border-2 border-blue-700 grid place-items-stretch rounded-lg">
      <div className="p-16 flex items-center justify-center shadow-lg rounded-lg">
        <form className="w-full max-w-sm">
          <div className="flex items-center border-b border-blue-700 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="Enter account name"
              aria-label="Account name"
              onChange={onAccountNameChangeHandler}
              value={accountName}
            />

            <button
              className="flex-shrink-0 bg-blue-700 hover:bg-blue-900 border-blue-700 hover:border-blue-900 text-sm border-4 text-white py-1 px-2 rounded"
              type="button"
              onClick={checkAccountExist}
            >
              Check
            </button>
          </div>

          {showCheckDialog && (
            <div className="py-2">
              {accountNameStatus ? (
                <div className="w-3/4 mx-auto bg-green-700 hover:bg-green-900 border-green-700 hover:border-green-900 text-sm border-4 text-white py-1 rounded text-center">
                  <div className="flex justify-center">
                    <FaCheck size={20} className="mr-2" />
                    <span> {dialogMessage}</span>
                  </div>
                </div>
              ) : (
                <div className="w-3/4 mx-auto bg-red-700 hover:bg-red-900 border-red-700 hover:border-red-900 text-sm border-4 text-white py-1 rounded text-center">
                  <div className="flex justify-center">
                    <FaTimes size={20} className="mr-2" />
                    <span> {dialogMessage}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          <div>
            {accountNameStatus ? (
              <button
                className="w-full bg-blue-700 hover:bg-blue-900 border-blue-700 hover:border-blue-900 text-sm border-4 text-white py-1 rounded"
                type="button"
                onClick={createAccount}
              >
                Create new account
              </button>
            ) : (
              <button
                className="w-full bg-gray-300 border-gray-300 text-sm border-4 text-white py-1 rounded cursor-not-allowed"
                type="button"
                disabled
              >
                Create new account
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepositCard;
