import * as crypto from "crypto";

const secretKey: Buffer = crypto
  .createHash("sha256")
  .update(process.env.NEXT_PUBLIC_CRYPTO_SECRET!)
  .digest();

export default function decryptText(encryptedText: string) {
  const textParts = encryptedText.split(":");
  const iv = Buffer.from(textParts.shift()!, "hex");
  const encryptedData = Buffer.from(textParts.join(":"), "hex");
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey),
    iv
  );
  let decrypted = decipher.update(encryptedData);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
