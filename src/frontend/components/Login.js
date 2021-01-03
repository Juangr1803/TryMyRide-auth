// React
import React from 'react';
// React form Validator
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
// Service
import AuthService from '../services/auth-service';
const authService = new AuthService();

//--------------------------------------------//
//--------------------------------------------//

// Required Data
const required = (value) => {
  if (!value) {
    return <div>Email and Password is required !</div>;
  }
};

// Login
class Login extends React.Component {
  constructor(props) {
    super(props);
    // this.onChangeEmail = this.onChangeEmail.bind(this);
    // this.onChangePassword = this.onChangePassword.bind(this);

    // State
    this.state = {
      email: '',
      password: '',
      apiKeyToken:
        '886a1d04cc9f20517751531f980696c2678acc0b5cd193eae0312f52742bd626',
      loading: false,
      error: '',
      message: '',
    };
    // Funtions
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  // // Email
  // onChangeEmail(e) {
  //   this.setState({
  //     data: {
  //       email: e.target.value,
  //     },
  //   });
  // }
  // Password
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  // Login
  handleLogin(e) {
    e.preventDefault();

    this.setState({
      error: '',
      loading: true,
      message: '',
    });

    // this.form.validateAll();

    // if (this.checkBtn.context._errors.length === 0) {
    authService
      .login(this.state.email, this.state.password, this.state.apiKeyToken)
      .then(
        () => {
          this.props.history.push('/profile');
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    // } else {
    //   this.setState({
    //     loading: false,
    //   });
    // }
  }

  render() {
    return (
      <div className="login">
        <div className="login__container">
          <Form className="login__form" onSubmit={this.handleLogin}>
            <div className="login__form--container">
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                className="login__form--control"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                validations={[required]}
              />
            </div>
            <div className="login__form--container">
              <label htmlFor="password">Email</label>
              <Input
                type="password"
                className="login__form--control"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                validations={[required]}
              />
            </div>
            <div className="login__form--container">
              <button className="btn btn-primary" disabled={this.state.loading}>
                {this.state.loading && <span>Loading...</span>}
                <span>Iniciar Sesion</span>
              </button>
            </div>
            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
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

export default Login;
