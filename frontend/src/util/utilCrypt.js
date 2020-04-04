import CryptoJS from 'crypto-js';

export const crypt = text => {
  const words = CryptoJS.enc.Utf8.parse(text); // WordArray object
  return CryptoJS.enc.Base64.stringify(words); // string: 'SGVsbG8gd29ybGQ='
};
export const decrypt = text => {
  const words = CryptoJS.enc.Base64.parse(text);
  return CryptoJS.enc.Utf8.stringify(words); // '
};
