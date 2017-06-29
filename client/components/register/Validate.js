import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateRegister(user) {
  const errors = {};
  if ((user.username).length <= 0) {
    errors.username = 'This field is required';
  }
  if (user.password <= 0) {
    errors.password = 'This field is required';
  }
  if ((user.password).length < 6) {
    errors.password = 'Password should be atlest 6 characters';
  }
  if (!validator.isEmail(user.email)) {
    errors.email = 'Enter a valid email address';
  }
  if (user.email <= 0) {
    errors.email = 'This field is required';
  }
  return {
    errors,
    valid: isEmpty(errors)
  };
}

