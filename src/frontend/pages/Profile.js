// React
import React from 'react';
// Components
// import Login from '../components/Login';
import { connect } from 'react-redux';

//-----------------------------------------------//
//-----------------------------------------------//

// Home
const Profile = (props) => {
  const { user: currentUser } = props;
  return (
    <>
      {/* <Login></Login> */}
      <h1>Holaa</h1>
    </>
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
