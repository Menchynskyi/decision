const emailReg = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

export const validatePassword = (val: string) => {
  let error = '';
  if (val.length < 6) {
    error = 'at least 6 characters';
  }
  if (!val) {
    error = 'requiered';
  }
  return error;
};

export const validateUsername = (val: string) => {
  let error = '';
  if (!val) {
    error = 'requiered';
  }
  return error;
};

export const validateEmail = (val: string) => {
  let error = '';
  if (!emailReg.test(val)) {
    error = 'email format is not correct';
  }
  if (!val) {
    error = 'requiered';
  }
  return error;
};
