importScripts("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js");

onmessage = function (e) {
  const encrypted = e.data;
  const key = CryptoJS.enc.Utf8.parse("X8WzK91hVbG7uT3x");
  const iv = CryptoJS.enc.Utf8.parse("P9dUe6NhLmR5qX4s");
  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8);
  postMessage(decrypted);
};
