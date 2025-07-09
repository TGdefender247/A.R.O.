self.onmessage = async function (e) {
  const { encrypted, key, iv } = e.data;
  const encData = Uint8Array.from(atob(encrypted), c => c.charCodeAt(0));
  const cryptoKey = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(key), { name: "AES-CBC" }, false, ["decrypt"]
  );
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv: new TextEncoder().encode(iv) }, cryptoKey, encData
  );
  self.postMessage(new TextDecoder().decode(decrypted));
};
