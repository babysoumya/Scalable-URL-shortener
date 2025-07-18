const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function encodeBase62(num) {
  let encoded = '';
  while (num > 0) {
    encoded = chars[num % 62] + encoded;
    num = Math.floor(num / 62);
  }
  return encoded || '0';
}

module.exports = { encodeBase62 };