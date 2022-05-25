import repoIcon from '../../assets/images/repo.svg';
import languageColors from '../../assets/resources/language-colors.json';
import { IRepo } from '../../pages/Home';
import styles from './styles.module.scss';

interface RepoCardProps {
  repo: IRepo
}

const RepoCard = ({ repo: { name, description, language, url } }: RepoCardProps) => {
  const getLanguageColor = () => {
    const languageColor = Object.entries(languageColors)
      .find(([languageName]) => languageName.includes(language));

    if (languageColor) {
      const [, info] = languageColor;
      return info.color;
    }

    return '#ffffffb3';
  };

  return (
    <div className={styles.card}>
      <h6>
        <img src={repoIcon} alt="Repository" />
        <a href={url} target="_blank" rel="noopener noreferrer" title={name}>
          {name}
        </a>
      </h6>
      <p>{description}</p>
      <div>
        {
          language && (
            <>
            <span style={{ background: getLanguageColor() as string }} aria-label="Language color" />
            {language}
            </>
          )
        }
      </div>
    </div>
  );
};

export default RepoCard;