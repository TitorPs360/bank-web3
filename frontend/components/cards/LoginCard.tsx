import React, { FC } from 'react';

// import web3 from '@bank/web3';
import bank from '@bank/bank';

import { useState, useEffect } from 'react';

import { FaWallet } from 'react-icons/fa';

import { useRouter } from 'next/router';

import { useMetamask } from '@thirdweb-dev/react';

const LoginCard: FC = (props) => {
  const connectWithMetamask = useMetamask();

  return (
    <div className="w-1/2 mx-auto border-dashed border-2 border-blue-700 grid place-items-stretch rounded-lg">
      <div className="p-16 flex flex-col items-center justify-center shadow-lg rounded-lg">
        <div>
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white inline-block align-middle">
            Please connect to your wallet
          </span>
        </div>

        <div className="pt-4">
          <button
            className="flex-shrink-0 bg-blue-700 hover:bg-blue-900 border-blue-700 hover:border-blue-900 text-sm border-4 text-white text-xl py-1 px-2 rounded"
            type="button"
            onClick={connectWithMetamask}
          >
            <div className="flex justify-center">
              <FaWallet size={20} className="mr-2" />
              <span> Connect Wallet</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
