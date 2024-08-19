import { NavLink } from 'react-router-dom';
import { NavName } from './Nav.types';

export const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav_list">
        <li className="nav_item">
          <NavLink to="/uncontrolled-form" className={({ isActive }) => (isActive ? 'active' : '')}>
            {NavName.Uncontrolled}
          </NavLink>
        </li>
        <li className="nav_item">
          <NavLink to="/controlled-form" className={({ isActive }) => (isActive ? 'active' : '')}>
            {NavName.Controlled}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
