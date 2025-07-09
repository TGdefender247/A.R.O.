
importScripts('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js');
self.onmessage=function(e){try{var k=CryptoJS.enc.Utf8.parse("MySecretKey12345"),iv=CryptoJS.enc.Utf8.parse("MySecretIV123456"),d=CryptoJS.AES.decrypt(e.data,k,{iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7}).toString(CryptoJS.enc.Utf8);postMessage(d);}catch(o){}};
