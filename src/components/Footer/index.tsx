import React from 'react';
import './style.scss';
import RssLogo from '@components/RssLogo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="container footer__container">
          <RssLogo width={100} />
          <div>
            <a
              className="footer__github-link"
              href="https://github.com/tretyakov-a"
              title="GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon className="footer__github-link-icon" icon={faGithub} />
              tretyakov-a
            </a>
            <span className="footer__year">, 2023</span>
          </div>
        </div>
      </footer>
    );
  }
}
