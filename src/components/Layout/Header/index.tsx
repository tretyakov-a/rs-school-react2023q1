import './style.scss';
import HeaderMenu from './HeaderMenu';
import { getLabel } from './HeaderMenu/links';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container header__container">
        <h1>{getLabel(location.pathname)}</h1>
        <nav className="header__menu-container">
          <HeaderMenu />
        </nav>
      </div>
    </header>
  );
};

export default Header;
