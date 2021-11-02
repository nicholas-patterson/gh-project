import React from 'react';
import { IData, SortConfig } from '../types';
import Controls from './Controls';
import ListItem from './ListItem';

interface Props {
  filteredRepos: IData[];
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  setFilterWord: React.Dispatch<React.SetStateAction<string>>;
  setFilteredRepos: React.Dispatch<React.SetStateAction<IData[]>>;
  setRepos: React.Dispatch<React.SetStateAction<IData[]>>;
  setSortDirection: React.Dispatch<React.SetStateAction<SortConfig>>;
  handleSearchClick: () => void;
}

const List = ({
  filteredRepos,
  searchWord,
  setFilterWord,
  setSearchWord,
  setSortDirection,
  handleSearchClick,
  setFilteredRepos,
  setRepos,
}: Props) => {
  return (
    <div className='px-4'>
      <Controls
        {...{
          setFilterWord,
          setSearchWord,
          setSortDirection,
          handleSearchClick,
          setFilteredRepos,
          setRepos,
          searchWord,
        }}
      />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
        {filteredRepos.length > 0 &&
          filteredRepos.map(
            ({ id, full_name, stargazers_count, language }, idx) => (
              <ListItem
                key={id}
                {...{ id, full_name, stargazers_count, language }}
              />
            )
          )}
      </div>
    </div>
  );
};

export default List;
