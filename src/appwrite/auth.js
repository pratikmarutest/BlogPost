import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );

      if (userAccount) return this.login({ email, password });
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      if (error.code === 401) {
        return null;
      }
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error ", error);
    }
  }

  async sendMail(url) {
    try {
      await this.account.createVerification(`${url}/verify`);
    } catch (error) {
      console.log("Appwrite Error :- ", error);
    }
  }

  async verifyAccount(id, secret) {
    try {
      const verify = await this.account.updateVerification(id, secret);
      return "User is verified";
    } catch (error) {
      alert(error);
    }
  }
}

const authService = new AuthService();
export default authService;
