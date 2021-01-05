// React
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// Styles
import '../assets/styles/pages/Profile.css';

//---------------------------------------------------//
//---------------------------------------------------//

const Profile = (props) => {
  const user = props.user;

  return (
    <div className="profile">
      <div className="profile__container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile__img--profile"
        />
        <div className="profile-container">
          <div className="profile__container--item">
            <h2>Nombre</h2>

            <h3>{user.name}</h3>
          </div>
          <div className="profile__container--item">
            <h2>Correo</h2>
            <h3>{user.email}</h3>
          </div>
          <div className="profile__container--item">
            <Link to="/profile/edit" className="btn btn-primary btn-profile">
              Editar perfil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const { user } = state.auth;
  console.log(state);
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);
