import React from 'react';
import { Link } from 'react-router-dom';
import { IData } from '../types';

interface Props {
  filteredRepos: IData[];
  match: {
    id: string;
  };
}

const DetailView = ({ filteredRepos, match }: Props) => {
  const repoInfo = filteredRepos.find((r) => r.id === parseInt(match.id));

  if (!repoInfo)
    return (
      <h1>
        Details for repo does not exist - <Link to='/'>Go Back</Link>
      </h1>
    );

  return (
    <div className='max-w-lg mx-auto bg-green-500 text-center p-4'>
      <div>
        <div>
          <h4>Repository Name</h4>
          <p>{repoInfo.full_name}</p>
        </div>
        <div>
          <h4>Owner Name</h4>
          <p>{repoInfo.owner.login}</p>
        </div>
        <div>
          <h4>Description</h4>
          <p>{repoInfo.description}</p>
        </div>
        <div>
          <h4>Number Of Stars</h4>
          <p>{repoInfo.stargazers_count}</p>
        </div>
        <div>
          <h4>Language</h4>
          <p>{repoInfo.language}</p>
        </div>
      </div>
      <Link
        className='text-white p-4 font-semibold no-underline bg-black mt-8 block'
        to='/'
      >
        Go Back
      </Link>
    </div>
  );
};

export default DetailView;
