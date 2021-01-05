// React
import React from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import { connect } from 'react-redux';
// Validator
import { isEmail } from 'validator';
// Actions
import { updateUser } from '../actions/auth';
// Styles
import '../assets/styles/pages/ProfileEdit.css';

//---------------------------------------------------//
//---------------------------------------------------//

const required = (value) => {
  if (!value) {
    return <div className="alert-danger">Este campo es requerido !</div>;
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return <div className="alert-danger">Este no es un email valido.</div>;
  }
};

const vname = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert-danger">
        El nombre de usuario debe tener entre 3 y 20 caracteres.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert-danger">
        La contraseña debe tener entre 6 y 40 caracteres.
      </div>
    );
  }
};

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEditUser = this.handleEditUser.bind(this);
    this.user = this.props.user;
    console.log(this.user);

    this.state = {
      name: '',
      email: '',
      password: '',
      changePassword: false,
      successful: false,
    };
  }

  handleChange(e) {
    e.preventDefault();

    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleClick(e) {
    e.preventDefault();
    if (!this.state.changePassword) {
      this.setState({
        changePassword: true,
      });
    } else {
      this.setState({
        changePassword: false,
      });
    }
  }

  async handleEditUser(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    try {
      const resolve = await this.props
        .dispatch(
          updateUser(
            this.state.name || this.user.name,
            this.state.email || this.user.email,
            this.state.password || this.user.password,
            this.user.id
          )
        )
        .then(() => {
          this.setState({
            successful: true,
          });
        });
    } catch (error) {
      console.log(error);
      this.setState({
        successful: false,
      });
    }
  }

  render() {
    const { message } = this.props;
    console.log(message);
    return (
      <div className="profile-edit">
        <div className="profile-edit__container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-edit__img--profile"
          />
          <Form
            className="profile-edit-form"
            onSubmit={this.handleEditUser}
            ref={(c) => {
              let form = c;
            }}
          >
            {!this.state.successful && (
              <>
                <div className="form-group">
                  <label htmlFor="name">Nombre</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder={this.user.name}
                    value={this.state.name}
                    onChange={this.handleChange}
                    validations={[required, vname]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder={this.user.email}
                    value={this.state.email}
                    onChange={this.handleChange}
                    validations={[required, email]}
                  />
                </div>
                {this.state.changePassword && (
                  <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      validations={[required, vpassword]}
                    />
                  </div>
                )}
                {!this.state.changePassword ? (
                  <div className="form-group">
                    <button
                      className="btn btn-primary btn-profile"
                      onClick={this.handleClick}
                    >
                      Cambiar contraseña
                    </button>
                  </div>
                ) : (
                  <div className="form-group">
                    <button
                      className="btn btn-primary btn-profile"
                      onClick={this.handleClick}
                    >
                      Volver
                    </button>
                  </div>
                )}
                <div className="form-group">
                  <button className="btn btn-primary btn-profile" type="submit">
                    Guardar
                  </button>
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, message } = state.auth;
  return {
    user,
    message,
  };
}

export default connect(mapStateToProps)(ProfileEdit);
