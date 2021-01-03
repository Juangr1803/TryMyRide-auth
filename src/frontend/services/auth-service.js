// Axios
import axios from 'axios';

//-------------------------------------------------//
//-------------------------------------------------//

// URL
// const API_URL = 'https://backend-mytryride.juanda1803.vercel.app/api/auth';
const API_URL = 'http://localhost:3000/api/auth';

// Service
class AuthService {
  login(email, password, apiKeyToken) {
    return axios
      .post(`${API_URL}/sign-in`, {
        email,
        password,
        apiKeyToken,
      })
      .then((response) => {
        console.log(response);
      });
  }
}

export default AuthService;
