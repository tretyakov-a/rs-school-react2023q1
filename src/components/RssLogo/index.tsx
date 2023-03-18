import React from 'react';
import './style.scss';

interface PropsType {
  width: number;
}

export default class RssLogo extends React.Component<PropsType> {
  render() {
    return (
      <a
        className="rss-logo"
        href="https://rs.school/js/"
        title="https://rs.school/js/"
        target="_blank"
        style={{ width: `${this.props.width}px` }}
        rel="noreferrer"
      >
        <img src="/src/assets/rsslogo.svg" alt="logo" />
      </a>
    );
  }
}
