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
    const updatedUserId = await this.mongoDB.update(
      this.collection,
      userId,
      user
    );

    return updatedUserId;
  }
}

module.exports = UsersService;
