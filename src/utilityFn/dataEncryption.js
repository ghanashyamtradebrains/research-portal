const { Secret, Token } = require("fernet");

function encryptData(data, secretKey) {
  if (!secretKey) {
    throw new Error("Secret key is required");
  }

  const secret = new Secret(secretKey);
  const token = new Token({
    secret: secret,
    time: Date.now(),
    iv: undefined,
  });

  return token.encode(data);
}

function decryptData(tokenStr, secretKey) {
  if (!secretKey) {
    throw new Error("Secret key is required");
  }

  const secret = new Secret(secretKey);
  const token = new Token({
    secret: secret,
    token: tokenStr,
    ttl: 0,
  });

  return token.decode();
}

module.exports = {
  encryptData,
  decryptData,
};
