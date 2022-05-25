import { github } from './api';

export interface IUserResponse {
    login: string;
    name: string;
    avatar_url: string;
    company: string;
    location: string;
    blog: string;
    followers: number;
    following: number;
    public_gists: number;
    public_repos: number;
    username: string;
    bio: string;
    id: number;
}

interface IRepoResponse {
  name: string;
  description: string;
  html_url: string;
  language: string;
}

const getReposByUsername = async (username: string) => {
  try {
    const { data } = await github.get<Array<IRepoResponse>>(`/${username}/repos`);

    const repoList = data
    .filter(({description}) => description?.length > 180)
    .map(({name, description, html_url, language}) => ({
      name,
      description: `${description.substring(0, 180)}...`,
      url: html_url,
      language
    }));

    return repoList;
  } catch (error) {
    throw new Error('Algo deu errado com a pesquisa');
  }


};

export const getUserByUsername = async (username: string) => {
  try {
    const {
      data: {
        name,
        avatar_url: avatar,
        company,
        location,
        blog,
        followers,
        following,
        public_gists: gists,
        public_repos: repos,
        bio
    } } = await github.get<IUserResponse>(`/${username}`);

    const repoList = await getReposByUsername(username);

    const replacedBlog = blog.replace(/(http:\/\/|https:\/\/|\/$)/g, '');

    const user = {
      avatar,
      name,
      username,
      company,
      location,
      blog: replacedBlog,
      followers,
      following,
      gists,
      repos,
      bio,
      repoList
    };

    return user;
  } catch (error) {
    console.error(error);
  }
};

export const getAllUsers = async (since: number) => {
  try {
    const { data } = await github.get<Array<IUserResponse>>('', {
      auth: import.meta.env.VITE_APP_API_SECRET,
      params: {
        per_page: 5,
        since
    }});

    const users = data.map((user) => ({ ...user, username: user.login }));

    return users;
  } catch (error) {
    throw new Error('Algo deu errado com a pesquisa');
  }
};