class UserDetails {
  static UserId(userId) {
    return localStorage.setItem('userId', userId);
  }
  static getUserId() {
    return localStorage.getItem('userId');
  }
}
export default UserDetails;
