# Encrypt / Decrypt

A small app that encrypts and decrypts text using a [simple algorithm found on Stack Overflow.](https://stackoverflow.com/a/66938952/7853201)

See it live here: https://decrypt-survey-mails-lol.netlify.app/

```javascript
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
```