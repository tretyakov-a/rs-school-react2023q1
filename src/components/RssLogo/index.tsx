import React from 'react';
import './style.scss';

interface RssLogoPropsType {
  width: number;
}

export default class RssLogo extends React.Component<RssLogoPropsType> {
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
        <img src="/rsslogo.svg" alt="logo" />
      </a>
    );
  }
}
