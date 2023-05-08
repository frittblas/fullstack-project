function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const fileData = { name: file.name, type: file.type, size: file.size };
      const fcontents = e.target.result;
      const b64Encoded = removePreDataFromBase64(fcontents);
      fileData.contents = b64Encoded;
      resolve(fileData);
    };
    reader.onerror = e => reject(e);
    reader.readAsDataURL(file);
  });
}

function removePreDataFromBase64(str) {
  return str.slice(str.indexOf('base64,') + 7);
}

export default { toBase64, removePreDataFromBase64 }