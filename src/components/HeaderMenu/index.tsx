import { NavLink } from 'react-router-dom';
import { links } from './links';
import './style.scss';

const HeaderMenu = () => {
  return (
    <ul className="header__menu header-menu">
      {links.map(({ to, label }) => (
        <li key={label} className="header-menu__item">
          <NavLink className="header-menu__link" to={to}>
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default HeaderMenu;
