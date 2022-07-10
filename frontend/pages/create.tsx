import type { NextPage } from 'next';

import { Navbar } from '@components/layout';
import { CreateAccountCard, CreateAccountSucessCard } from '@components/cards';

import web3 from '../bank/web3';
import bank from '../bank/bank';
import { useState, useEffect } from 'react';

const Home: NextPage = () => {
  // const { contract, isLoading, error } = useContract('0xBc6a522Ce7B262adb79602c4B9670C0064d367F7');
  const [createAccountStatus, setCreateAccountStatus] = useState(false);
  const [createAccountName, setCreateAccountName] = useState('');

  return (
    <div className="bg-background_color h-screen">
      <Navbar />
      <div className="grid grid-cols-12 gap-4 pt-8">
        <div className="col-span-2" />
        <div className="col-span-8">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            Create New Account
          </span>
        </div>
        <div className="col-span-2" />

        <div className="col-span-2" />
        <div className="col-span-8">
          {createAccountStatus ? (
            <CreateAccountSucessCard accountName={createAccountName} />
          ) : (
            <CreateAccountCard
              setCreateAccountStatus={setCreateAccountStatus}
              setCreateAccountName={setCreateAccountName}
            />
          )}
        </div>
        <div className="col-span-2" />
      </div>
    </div>
  );
};

export default Home;
