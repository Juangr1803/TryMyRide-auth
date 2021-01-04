// Axios
import axios from 'axios';

//----------------------------------------------------//
//----------------------------------------------------//

// Api
const API_URL = 'http://localhost:3000/api/auth';

// AUth Service
class AuthService {
  // Login Request
  loginRequest(payload) {
    return {
      type: 'LOGIN_REQUEST',
      payload,
    };
  }

  // Logout Request
  logoutRequest(payload) {
    return {
      type: 'LOGOUT_REQUEST',
      payload,
    };
  }

  // Register Request
  registerRequest(payload) {
    return {
      type: 'REGISTER_REQUEST',
      payload,
    };
  }

  // Error
  setError(payload) {
    return {
      type: 'SET_ERROR',
      payload,
    };
  }

  // Login User
  loginUser(email, password, token) {
    return axios({
      url: `${API_URL}/sign-in`,
      headers: { Authorization: `Bearer ${token}` },
      method: 'post',
      auth: {
        username: email,
        password,
      },
    })
      .then(({ data }) => {
        document.cookie = `email=${data.body.user.email}`;
        document.cookie = `name=${data.body.user.name}`;
        document.cookie = `id=${data.body.user.id}`;
        document.cookie = `token=${data.body.token}`;
      })
      .then(() => {
        window.location.href = '/';
      })
      .catch((err) => console.log(err));
  }

  logoutUser() {
    document.cookie = 'email=';
    document.cookie = 'name=';
    document.cookie = 'id=';
    document.cookie = 'token=';
  }

  registerUser(name, email, password) {
    return axios.post(`${API_URL}/sign-up`, {
      name,
      email,
      password,
    });
  }
}

export default new AuthService();
