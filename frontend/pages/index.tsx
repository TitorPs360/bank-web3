import type { NextPage } from 'next';

import { Navbar } from '@components/layout';
import { AddAccountCard, AccountCard, LoginCard } from '@components/cards';

import web3 from '@bank/web3';
import bank from '@bank/bank';
import { useState, useEffect, useCallback } from 'react';

import { useRouter } from 'next/router';

import { useAddress } from '@thirdweb-dev/react';

type dataType = {
  accountName: string;
  balance: string;
};

const Home: NextPage = () => {
  const [currentAccountsInfo, setCurrentAccountsInfo] = useState<dataType[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const address = useAddress();

  const healthCheck = async () => {
    const res = await bank.methods.healthCheck().call();
    return res;
  };

  let fetchAccountInfo = useCallback(async () => {
    await healthCheck();

    bank.methods
      .getCurrentAccountList()
      .call({ from: address })
      .then(async (currentAccountList) => {
        const accountInfos: dataType[] = [];

        for (let i = 0; i < currentAccountList.length; i++) {
          await bank.methods
            .getAccountBalance(currentAccountList[i])
            .call({ from: address })
            .then((res: bigint) => {
              const calBalance = web3.utils.fromWei(res, 'ether').toString();
              const accountInfo = {
                accountName: currentAccountList[i],
                balance: calBalance,
              };
              accountInfos.push(accountInfo);
            })
            .catch((error) => {
              console.log(error);
              const accountInfo = {
                accountName: currentAccountList[i],
                balance: 'NaN',
              };
              accountInfos.push(accountInfo);
            });
        }
        console.log(accountInfos);
        setCurrentAccountsInfo(accountInfos);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [address]);

  useEffect(() => {
    fetchAccountInfo();
  }, [fetchAccountInfo]);

  const routeToCreate = (e) => {
    e.preventDefault();
    router.push('/create');
  };

  return (
    <>
      {address ? (
        <div className="bg-background_color min-h-screen">
          <Navbar />
          <div className="grid grid-cols-12 gap-4 pt-8">
            <div className="col-span-3" />
            <div className="col-span-6">
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                My Account:
              </span>
            </div>
            <div className="col-span-3" />

            {currentAccountsInfo.map((account, i) => {
              return (
                <div className="col-span-12 grid grid-cols-12 gap-4" key={i}>
                  <div className="col-span-3" />
                  <div className="col-span-6">
                    <AccountCard
                      accountName={account.accountName}
                      balance={account.balance}
                      fetchAccountInfo={fetchAccountInfo}
                      healthCheck={healthCheck}
                    />
                  </div>
                  <div className="col-span-3" />
                </div>
              );
            })}

            <div className="col-span-3" />
            <div className="col-span-6">
              <AddAccountCard onClick={routeToCreate} />
            </div>
            <div className="col-span-3" />
          </div>
        </div>
      ) : (
        <div className="bg-background_color min-h-screen">
          <Navbar />
          <div className="pt-4">
            <LoginCard />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
