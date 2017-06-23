class UserDetails {
  static setToken(token) {
    return sessionStorage.setItem('token', token);
  }
  static isUser() {
    return sessionStorage.getItem('token') !== null;
  }
  static isLoggedOut() {
    return sessionStorage.removeItem('token');
  }
}
export default UserDetails;
