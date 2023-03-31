import React from 'react';
import { NavLink } from 'react-router-dom';
import { links, getLink } from './links';
import './style.scss';

interface HeaderMenuProps {
  onChange: (pageName: string) => void;
}

export default class HeaderMenu extends React.Component<HeaderMenuProps> {
  private menuRef: React.RefObject<HTMLUListElement>;
  constructor(props: HeaderMenuProps) {
    super(props);
    this.menuRef = React.createRef<HTMLUListElement>();
  }

  componentDidMount(): void {
    const observer = new MutationObserver((mutations: MutationRecord[]) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          this.props.onChange(getLink().label);
        }
      }
    });
    if (this.menuRef.current !== null) {
      observer.observe(this.menuRef.current, { attributes: true, subtree: true });
    }
  }

  render() {
    return (
      <ul className="header__menu header-menu" ref={this.menuRef}>
        {links.map(({ to, label }) => (
          <li key={label} className="header-menu__item">
            <NavLink className="header-menu__link" to={to}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }
}
