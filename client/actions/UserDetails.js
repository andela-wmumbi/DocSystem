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
  static decodeToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
  static getRole(roleId) {
    if (roleId === 1) {
      return ('admin');
    }
    return ('owner');
  }
  static storeRoles(roles) {
    localStorage.setItem('roles', [roles]);
    return roles;
  }
  static getRoles() {
    return localStorage.getItem('roles');
  }
}
export default UserDetails;
