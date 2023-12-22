import * as crypto from "crypto";

const secretKey: Buffer = crypto
  .createHash("sha256")
  .update(process.env.NEXT_PUBLIC_CRYPTO_SECRET!)
  .digest();

// export default function decryptText(encryptedText: string) {
//   const textParts = encryptedText.split(":");
//   const iv = Buffer.from(textParts.shift()!, "hex");
//   const encryptedData = Buffer.from(textParts.join(":"), "hex");
//   let decipher = crypto.createDecipheriv(
//     "aes-256-cbc",
//     Buffer.from(secretKey),
//     iv
//   );
//   let decrypted = decipher.update(encryptedData);
//   decrypted = Buffer.concat([decrypted, decipher.final()]);
//   return decrypted.toString();
// }

export default function decrypt(encryptedText: string = ""): string {
  const textParts = encryptedText.split(":");

  // Ensure there are at least two parts (IV and encryptedData)
  if (textParts.length < 2) {
    throw new Error("Invalid encrypted text format");
  }

  const iv = Buffer.from(textParts.shift()!, "hex");
  const encryptedData = Buffer.from(textParts.join(":"), "hex");

  // Make sure the IV length matches the expected length for your cipher
  if (iv.length !== 16) {
    throw new Error("Invalid IV length");
  }

  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey),
    iv
  );
  let decrypted = decipher.update(encryptedData);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
