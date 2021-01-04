// React
import React from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { connect } from 'react-redux';
// Validator
import { isEmail } from 'validator';
// Actions
import { register } from '../actions/auth';
// Styles
import '../assets/styles/pages/Register.css';

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

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      name: '',
      email: '',
      password: '',
      successful: false,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  async handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      try {
        const resolve = await this.props
          .dispatch(
            register(this.state.name, this.state.email, this.state.password)
          )
          .then(() => {
            this.setState({
              successful: true,
            });
          });
      } catch (error) {
        this.setState({
          successful: false,
        });
      }
      this.setState({
        successful: true,
      });
    }
  }

  render() {
    const { message } = this.props;
    console.log(this.state.successful);
    console.log(message);

    return (
      <div className="register">
        <div className="register__container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="register__img--profile"
          />

          <Form
            className="register-form"
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
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
                    value={this.state.name}
                    onChange={this.onChangeName}
                    validations={[required, vname]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-register">
                    Registrarse
                  </button>
                </div>
              </>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful ? 'alert-success' : 'alert-danger'
                  }
                  role="alert"
                >
                  {message}
                  <Link to="/login">
                    <button className="btn btn-primary btn-register btn-success">
                      Iniciar sesion
                    </button>
                  </Link>
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: 'none' }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  console.log(state);
  return {
    message,
  };
}

export default connect(mapStateToProps)(Register);
