import { FormEvent, useEffect, useState } from 'react';

import githubIcon from '../../assets/images/github.svg';
import searchIcon from '../../assets/images/search.svg';
import { useAsyncError } from '../../hooks/useAsyncError';
import { IUser } from '../../pages/Home';
import { getAllUsers, getUserByUsername } from '../../services/github/githubService';
import styles from './styles.module.scss';

interface SearchBarProps {
  // eslint-disable-next-line no-unused-vars
  setNewUser: (param: IUser) => void;
}

interface IOptions {
  id: number;
  label: string
}

export const SearchBar = ({ setNewUser }: SearchBarProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [sugestions, setSugestions] = useState<Array<IOptions>>([]);
  const setAsyncError = useAsyncError();

  const setUser = async (username: string) => {
    try {
      const user = await getUserByUsername(username);
      setNewUser(user!);

      setIsSearching(false);
    } catch (error) {
      setAsyncError(error as Error);
    }
  };

  const onSubmitSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearching(true);

    const form = new FormData(e.currentTarget);
    const username = form.get('username');

    await setUser(String(username));
    setIsInputFocused(false);
  };


 useEffect(() => {
    const getUsersAsync = async () => {
      const sinceId = Math.round(Math.random() * 73 * 1000 * 1000);
      const users = await getAllUsers(sinceId);
      const options = users.map(({username, id}) => ({ id, label: username }));

      setSugestions(options);
    };

    getUsersAsync();
  }, []);

  return (
    <header className={styles.container}>
      <form onSubmit={onSubmitSearch} className={styles.searchbar}>
        <a href="/github-search/">
          <img src={githubIcon} alt="Github logo" />
        </a>
        <div className={styles.searchList}>
          <input
            type="text"
            name="username"
            autoComplete="off"
            autoCorrect="off"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <button type="submit" disabled={isSearching}>
            <img src={searchIcon} alt="Search" />
          </button>
          <div className={isInputFocused ? styles.searching : ''}>
            {
              sugestions?.map((sugestion) => (
                <button
                  key={sugestion.id}
                  onClick={() => setUser(sugestion.label)}
                  type="button"
                >
                  {sugestion.label}
                </button>
              ))
            }
          </div>
        </div>
      </form>
    </header>
  );
};
