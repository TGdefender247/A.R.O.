console.log("Worker загружен");
self.onmessage = async function (e) {
  try {
    const { encrypted, key, iv } = e.data;

    // Раскодировать base64
    const encData = Uint8Array.from(atob(encrypted), c => c.charCodeAt(0));

    // Импорт ключа
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(key),
      { name: "AES-CBC" },
      false,
      ["decrypt"]
    );

    // Расшифровка
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-CBC", iv: new TextEncoder().encode(iv) },
      cryptoKey,
      encData
    );

    const decoded = new TextDecoder().decode(decrypted);

    // Отправка расшифрованного результата
    self.postMessage(decoded);

  } catch (err) {
    // Отправка ошибки обратно в основной поток
    self.postMessage({ error: true, message: err.message });

    // Вывод ошибки в консоль (для отладки)
    console.error("Worker error:", err);
  }
};
