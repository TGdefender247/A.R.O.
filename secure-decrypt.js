self.onmessage = async function (e) {
  const { encrypted, key, iv } = e.data;
  try {
    const keyRaw = await crypto.subtle.importKey(
      "raw", Uint8Array.from(atob(key), c => c.charCodeAt(0)),
      { name: "AES-CBC" }, false, ["decrypt"]
    );
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-CBC", iv: Uint8Array.from(atob(iv), c => c.charCodeAt(0)) },
      keyRaw,
      Uint8Array.from(atob(encrypted), c => c.charCodeAt(0))
    );
    const decoder = new TextDecoder();
    self.postMessage(decoder.decode(decrypted));
  } catch (e) {
    self.postMessage("tg://resolve?domain=ERROR");
  }
};