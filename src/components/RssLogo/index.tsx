import './style.scss';
import rsslogoSrc from '@assets/rsslogo.svg';

interface RssLogoPropsType {
  width: number;
}
const RssLogo = (props: RssLogoPropsType) => {
  return (
    <a
      className="rss-logo"
      href="https://rs.school/js/"
      title="https://rs.school/js/"
      target="_blank"
      style={{ width: `${props.width}px` }}
      rel="noreferrer"
    >
      <img src={rsslogoSrc} alt="logo" />
    </a>
  );
};

export default RssLogo;
