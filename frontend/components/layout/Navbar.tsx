import React, { FC } from 'react';
// import logo from '@assets/logo.png';
// import Image from 'next/image';

import { useRouter } from 'next/router';

import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';

const Navbar: FC = (props) => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  const router = useRouter();

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a onClick={() => router.push('/')} className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-logo_orange">
            DOG
          </span>

          <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
            BANK
          </span>
        </a>

        {address ? (
          <div className="flex mx-right gap-4">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
            >
              {String(address).substring(0, 5)}...{String(address).substring(38, 42)}
            </button>

            <button
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
              onClick={disconnectWallet}
            >
              Disconnect Wallet
            </button>
            {/* <button onClick={disconnectWallet}>Disconnect Wallet</button>
            <p>Your address: {address}</p> */}
          </div>
        ) : (
          <div className="flex md:order-2">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 "
              onClick={connectWithMetamask}
            >
              Connect Wallet
            </button>
          </div>

          // <button >Connect with Metamask</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
