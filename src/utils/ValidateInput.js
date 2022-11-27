const validateInputText = (plaintext) => {
  var isValid = false;
  let regex = /([01]){8}/g;
  isValid = plaintext.match(regex) ? true : false;
  return isValid;
};

const validateMasterKey = (key) => {
  var isValid = false;
  let regex = /([01]){10}/g;
  isValid = key.match(regex) ? true : false;
  return isValid;
};

export { validateInputText, validateMasterKey };
