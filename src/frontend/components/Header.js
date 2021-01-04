// React
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// Actions
import { logout } from '../actions/auth';
import { clearMessage } from '../actions/message';
// Helpers
import { history } from '../helpers/history';
// Images
import Logo from '../assets/static/Logo-trymyride.png';
// Styles
import '../assets/styles/components/Header.css';

//---------------------------------------------------//
//---------------------------------------------------//

// Header
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage());
    });
  }

  componentDidMount() {
    const user = this.props.user;

    console.log(user);
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="header">
        <Link to={'/'} className="header__logo">
          <img className="header__logo" src={Logo} />
        </Link>
        <nav className="header__navbar">
          <ul>
            <li className="nav-item">
              <Link to={'/'} className="nav-link">
                Home
              </Link>
            </li>

            {currentUser ? (
              <>
                <li className="nav-item">
                  <Link to={'/profile'} className="nav-link">
                    {currentUser.name}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/" className="nav-link" onClick={this.logOut}>
                    Cerrar session
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to={'/login'} className="nav-link">
                    Iniciar sesion
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={'/register'} className="nav-link">
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Header);
