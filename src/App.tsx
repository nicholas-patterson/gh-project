/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import List from './components/List';
import { IData, SortConfig } from './types';
import DetailView from './components/Details';

const App = () => {
  const [sortDirection, setSortDirection] = useState<SortConfig>(null);
  const [filterWord, setFilterWord] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [repos, setRepos] = useState<IData[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<IData[]>([]);

  const queryConfig = encodeURIComponent(
    `${searchWord} in:name language:${filterWord}`
  );

  const queryString = `q=${queryConfig}`;

  // Runs when search button is clicked.
  const handleSearchClick = () => {
    fetchRepositories();
  };

  const fetchRepositories = async () => {
    const repos = await fetch(
      `https://api.github.com/search/repositories?${queryString}`
    );

    const res = await repos.json();
    console.log(res);
    setRepos(res.items);
    setFilteredRepos(res.items);
  };

  const filterByLanguage = useCallback(() => {
    const newRepos = repos.filter((repo) => {
      return repo.language.toLowerCase().includes(filterWord.toLowerCase());
    });

    if (sortDirection === 'asc' || sortDirection === 'desc') {
      newRepos.sort((a, b) => {
        const diff = a.stargazers_count - b.stargazers_count;

        if (diff === 0) return 0;

        const sign = Math.abs(diff) / diff;

        return sortDirection === 'asc' ? sign : -sign;
      });
    }
    setFilteredRepos(newRepos);
  }, [filterWord, sortDirection, searchWord]);

  useEffect(() => {
    filterByLanguage();
  }, [filterByLanguage]);

  return (
    <div className='container box-border'>
      <header className='bg-green-500 m-0 text-white py-4 px-2 mb-4'>
        <div>
          <h1 className='m-0 text-xl'>Github Project</h1>
        </div>
      </header>
      <main>
        <Router>
          <Switch>
            <Route exact path='/'>
              <List
                {...{
                  filteredRepos,
                  searchWord,
                  setSearchWord,
                  setFilterWord,
                  handleSearchClick,
                  setSortDirection,
                  setFilteredRepos,
                  setRepos,
                }}
              />
            </Route>
            <Route
              path='/:id'
              render={({ match }) => (
                <DetailView {...{ match: match.params, filteredRepos }} />
              )}
            />
          </Switch>
        </Router>
      </main>
    </div>
  );
};

export default App;
