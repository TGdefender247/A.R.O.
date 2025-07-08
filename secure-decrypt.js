importScripts('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js');

onmessage = function(e) {
  const key = CryptoJS.enc.Utf8.parse("MySecretKey12345");
  const iv = CryptoJS.enc.Utf8.parse("MySecretIV123456");
  try {
    const decrypted = CryptoJS.AES.decrypt(e.data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
    postMessage(decrypted);
  } catch {
    postMessage(null);
  }
};
