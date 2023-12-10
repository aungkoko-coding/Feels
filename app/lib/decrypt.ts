import * as crypto from "crypto";

export default function decryptText(encryptedText: string) {
  const decipher = crypto.createDecipher(
    "aes-256-ctr",
    process.env.NEXT_PUBLIC_CRYPTO_SECRET!
  );
  let decrypted = decipher.update(encryptedText, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}
