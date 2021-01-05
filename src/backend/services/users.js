// Mongo
const MongoLib = require('../lib/mongo');
// Bcrypt by create password in mode hash
const bcrypt = require('bcrypt');

//---------------------------------------//
//---------------------------------------//

// User Service
class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }

  // GET
  async getUser({ email }) {
    const [user] = await this.mongoDB.getAll(this.collection, { email });
    return user;
  }

  // POST
  async createUser({ user }) {
    const { name, email, password } = user;
    // Secure password with hash
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUserId = await this.mongoDB.create(this.collection, {
      name,
      email,
      password: hashedPassword,
    });
    // console.log(createUserId);
    return createUserId;
  }

  // PUT
  async updateUser({ userId, user } = {}) {
    if (user.name && user.email && user.password) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      let allDataUser = {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      };
      user = allDataUser;
    } else if (user.name && user.email) {
      let allDataUser = {
        name: user.name,
        email: user.email,
      };
      user = allDataUser;
    } else if (user.name && user.password) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      let allDataUser = {
        name: user.name,
        password: hashedPassword,
      };
      user = allDataUser;
    } else if (user.email && user.password) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      let allDataUser = {
        email: user.email,
        password: hashedPassword,
      };
      user = allDataUser;
    } else {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      let allDataUser = {
        password: hashedPassword,
      };
      user = allDataUser;
    }

    console.log(user);

    const updatedUserId = await this.mongoDB.update(
      this.collection,
      userId,
      user
    );

    return updatedUserId;
  }
}

module.exports = UsersService;
