export const encrypt = (salt, text) => {
  if (typeof salt !== 'string' || typeof text !== 'string') {
    throw new Error('encrypt: salt and text must be strings');
  }
  const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0));
  const byteHex = (n) => {
    const str = '0' + Number(n).toString(16);
    return str.substring(str.length - 2, str.length);
  };
  const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

  return text.split('').map(textToChars).map(applySaltToChar).map(byteHex).join('');
};

export const decrypt = (salt, encoded) => {
  if (!salt || !encoded || typeof salt !== 'string' || typeof encoded !== 'string') {
    return '';
  }
  const textToChars = (text) => text.split('').map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join('');
};

export const encryptBatch = (salt, arr) => {
  if (typeof salt !== 'string' || !Array.isArray(arr)) {
    throw new Error('encryptBatch: salt must be a string and arr must be an array');
  }
  return arr.map((item) => encrypt(salt, item));
}

export const decryptBatch = (salt, arr) => {
  if (typeof salt !== 'string' || !Array.isArray(arr)) {
    throw new Error('decryptBatch: salt must be a string and arr must be an array');
  }
  return arr.map((item) => decrypt(salt, item));
}