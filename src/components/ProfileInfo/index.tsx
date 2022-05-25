import blogIcon from '../../assets/images/blog.svg';
import companyIcon from '../../assets/images/company.svg';
import locationIcon from '../../assets/images/location.svg';
import { IUser } from '../../pages/Home';
import styles from './styles.module.scss';

interface ProfileInfoProps {
  user: IUser
}

export const ProfileInfo = ({
  user: {
    name,
    avatar,
    username,
    bio,
    followers,
    following,
    repos,
    gists,
    company,
    location,
    blog
  }}: ProfileInfoProps) => {
  return(
    <aside className={styles.profile}>
      <img src={avatar} alt={name} />

      <h1>
        <span>{name}</span>
        <span>{username}</span>
      </h1>

      <section>
        {bio}
      </section>

      <section className={styles.github}>
        <div>
          {followers}
          <span>followers</span>
        </div>
        <div>
          {following}
          <span>following</span>
        </div>
        <div>
          {repos}
          <span>repos</span>
        </div>
        <div>
          {gists}
          <span>gists</span>
        </div>
      </section>

      <section className={styles.details}>
        <div>
          <img src={companyIcon} alt="Company" />
          {company || '...'}
          </div>
        <div>
          <img src={locationIcon} alt="Location" />
          {location || '...'}
          </div>
        {
          blog && (
            <div>
              <img src={blogIcon} alt="Blog/Link" />
              <a href={`https://${blog}`} target="_blank" rel="noopener noreferrer">
                {blog}
              </a>
            </div>
          )
        }
      </section>
    </aside>
  );
};