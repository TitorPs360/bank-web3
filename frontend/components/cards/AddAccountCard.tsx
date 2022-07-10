import React, { FC } from 'react';
import { BsPlusCircle } from 'react-icons/bs';

interface AddAccountProps {
  onClick: (param: any) => void;
}

const AddAccountCard: FC<AddAccountProps> = (props) => {
  return (
    <div
      className="border-dashed border-2 border-blue-700 grid place-items-stretch rounded-lg hover:bg-blue-700 hover:cursor-pointer"
      onClick={props.onClick}
    >
      <div className="p-16 flex items-center justify-center shadow-lg rounded-lg">
        <BsPlusCircle size={'2em'} color={'#ff6600'} />

        <span className="ml-2 self-center text-3xl font-semibold whitespace-nowrap text-white ">
          Create Bank Account
        </span>
      </div>
    </div>
  );
};

export default AddAccountCard;
