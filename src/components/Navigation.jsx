import { Link } from "react-router-dom";
import {FiHome, FiLogOut, FiPlusCircle} from 'react-icons/fi'
import { func, string } from 'prop-types'
import { LocaleConsumer } from "../context/LocaleContext";

function Navigation({ logout, name }) {
  return (
    <LocaleConsumer>
      { 
        ({locale, toggleLocale}) => {
          return (
            <nav className="navigation">
              <ul>
                <li><button onClick={toggleLocale}>{locale === 'id' ? 'en' : 'id'}</button></li>
                <li><Link to="/"><FiHome /></Link></li>
                <li><Link to="/add"><FiPlusCircle /></Link></li>
                <li><button onClick={logout}>{name}<FiLogOut /></button></li>
              </ul>
            </nav>
          )
        }
      }

    </LocaleConsumer>
  );
}

Navigation.propTypes = {
  logout: func.isRequired,
  name: string.isRequired,
}

export default Navigation;