
class UserDetails {
  static UserId(userId) {
    return localStorage.setItem('userId', userId);
  }
  static getUserId() {
    return localStorage.getItem('userId');
  }
  static getToken(token) {
    return sessionStorage.setItem('jwt', token);
  }
  static decodeToken(token) {
    const decoded = jwt_decode(token);
    return decoded;
  }
}
export default UserDetails;
