import { useState } from 'react';

import { ErrorBoundary } from '../../components/ErrorBoundary';
import { ProfileInfo } from '../../components/ProfileInfo';
import RepoCard from '../../components/RepoCard';
import { SearchBar } from '../../components/SearchBar';
import styles from './styles.module.scss';

export interface IRepo {
  name: string;
  description: string;
  url: string;
  language: string;
}

export interface IUser {
  name: string;
  avatar: string;
  company: string;
  location: string;
  blog: string;
  followers: number;
  following: number;
  gists: number;
  repos: number;
  username: string;
  bio: string;
  repoList: IRepo[]
}

export const Home = () => {
  const [user, setUser] = useState<IUser>();

  return (
    <div className={styles.container}>
      <ErrorBoundary>
        <SearchBar setNewUser={setUser} />
      </ErrorBoundary>
      <div className={styles.content}>
        {
          !user
          ? <div className={styles.empty}>Digite um username e comece seu network.</div>
          : (
            <>
            <ProfileInfo user={user} />
            <div className={styles.repos}>
              {
                user.repoList.map((repo) => <RepoCard key={repo.name} repo={repo} />)
              }
            </div>
            </>
          )
        }
      </div>
    </div>
  );
};