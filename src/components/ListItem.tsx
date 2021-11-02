import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  id: number;
  full_name: string;
  stargazers_count: number;
  language: string;
}

const ListItem = ({ id, full_name, stargazers_count, language }: Props) => {
  return (
    <Link
      className='p-3 block bg-green-200 my-2 no-underline'
      to={{
        pathname: `/${id}`,
      }}
    >
      <p className='text-black'>
        <span className='font-semibold text-black'>Repo Name:</span> {full_name}
      </p>
      <p className='text-black'>
        <span className='font-semibold text-black'>Language:</span> {language}
      </p>
    </Link>
  );
};

export default ListItem;
