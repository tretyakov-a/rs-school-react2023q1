import React from 'react';
import './style.scss';
import { HeaderMenu } from '@components/HeaderMenu';
import { getLink } from '@components/HeaderMenu/links';

interface HeaderState {
  pageName: string;
}

export default class Header extends React.Component<unknown, HeaderState> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = {
      pageName: 'Home',
    };
  }

  componentDidMount(): void {
    this.handleMenuLinkChange(getLink().label);
  }

  handleMenuLinkChange = (pageName: string) => {
    this.setState({ pageName });
  };

  render() {
    return (
      <header className="header">
        <div className="container header__container">
          <h1>{this.state.pageName}</h1>
          <nav className="header__menu-container">
            <HeaderMenu onChange={this.handleMenuLinkChange} />
          </nav>
        </div>
      </header>
    );
  }
}
