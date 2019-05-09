import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

class AuthService {
  token = 'auth_token';

  saveToken(value) {
    localStorage.setItem(this.token,value);
  }

  getToken() {
    return localStorage.getItem(this.token);
  }

  decode(token) {
    return jwt.decode(token);
  }

  invalidateUser() {
    localStorage.removeItem(this.token);
  }

  getExpiration(token) {
    const exp = this.decode(token).exp;

    return moment.unix(exp);
  }

  getId() {
    return this.decode(this.getToken())._id;
  }

  isValid(token) {
    return moment().isBefore(this.getExpiration(token));
  }

  isAuthinticated() {
    const token = this.getToken();

    return (token && this.isValid(token)) ? true : false;
  }

  matchId(id) {
    if(this.isAuthinticated()) {
      const uid = this.getId().toString();
      if(uid === id.toString()) {
        return true;
      } else {
        return false;
      }
    } else {
    return false;
  }
}

}
export default new AuthService();
