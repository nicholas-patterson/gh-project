import React, { useRef } from 'react';
import { IData, SortConfig } from '../types';

interface Props {
  setFilteredRepos: React.Dispatch<React.SetStateAction<IData[]>>;
  searchWord: string;
  setRepos: React.Dispatch<React.SetStateAction<IData[]>>;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  setFilterWord: React.Dispatch<React.SetStateAction<string>>;
  setSortDirection: React.Dispatch<React.SetStateAction<SortConfig>>;
  handleSearchClick: () => void;
}

const Controls = ({
  setSearchWord,
  setFilterWord,
  setSortDirection,
  handleSearchClick,
  setFilteredRepos,
  setRepos,
  searchWord,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className='max-w-md'>
      <label>
        Search:
        <input
          ref={inputRef}
          className='w-full mb-4 p-4 box-border'
          type='text'
          placeholder='search for repository'
          onChange={(e) => setSearchWord(e.target.value)}
          value={searchWord}
        />
      </label>
      <div className='flex'>
        <button
          type='button'
          className='block bg-green-500 text-white py-2 px-3 border-none w-1/2 text-lg mb-4 mr-4'
          onClick={() => {
            inputRef.current?.setAttribute('disabled', 'true');
            handleSearchClick();
          }}
        >
          Search
        </button>
        <button
          className='block bg-gray-500 text-white py-2 px-3 border-none w-1/2 text-lg mb-4'
          onClick={() => {
            inputRef.current?.removeAttribute('disabled');
            setSearchWord('');
            setFilterWord('');
            setRepos([]);
            setFilteredRepos([]);
          }}
        >
          Clear
        </button>
      </div>

      <label>
        Filter:
        <input
          className='mb-4 w-full p-4 box-border'
          type='text'
          placeholder='langauge'
          onChange={(e) => setFilterWord(e.target.value)}
        />
      </label>

      <label className='block'>Sort:</label>
      <button
        className='w-1/4 mr-4 p-4 text-white bg-green-500 border-none'
        onClick={() => setSortDirection('asc')}
      >
        asc
      </button>
      <button
        className='w-1/4 p-4 text-white bg-green-500 border-none'
        onClick={() => setSortDirection('desc')}
      >
        desc
      </button>
    </div>
  );
};

export default Controls;
