import React, { FC } from 'react';

// import web3 from '@bank/web3';
// import bank from '@bank/bank';

import { useState } from 'react';

// import { FaCheck, FaTimes } from 'react-icons/fa';

import { useRouter } from 'next/router';

interface CreateAccountSucessCardProps {
  accountName: string;
}

const CreateAccountSucessCard: FC<CreateAccountSucessCardProps> = (props) => {
  const router = useRouter();

  const returnHome = (e) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <div className="border-dashed border-2 border-blue-700 grid place-items-stretch rounded-lg">
      <div className="p-16 flex flex-col items-center justify-center shadow-lg rounded-lg">
        <div>
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white inline-block align-middle">
            Create account successful
          </span>
        </div>

        <span className="self-center text-3xl font-semibold whitespace-nowrap text-white inline-block align-middle py-8">
          {props.accountName}
        </span>

        <button
          className="flex-shrink-0 bg-blue-700 hover:bg-blue-900 border-blue-700 hover:border-blue-900 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
          onClick={returnHome}
        >
          Return home
        </button>
      </div>
    </div>
  );
};

export default CreateAccountSucessCard;
