import { promises as fs } from "fs";
import path from "path";
import jwt from "jsonwebtoken";

const signKeyAsync = (
  payload: string | object | Buffer,
  secretOrPrivateKey: jwt.Secret,
  options?: jwt.SignOptions
): Promise<string> =>
  new Promise((resolve, reject) => {
    jwt.sign(payload, secretOrPrivateKey, options, (err: Error, signedString: string) => {
      if (err) reject(err);
      if (signedString) resolve(signedString);
    });
  });

const verifyKeyAsync = (token: string, secretOrPublicKey: jwt.Secret, options?: jwt.VerifyOptions): Promise<object> =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, options, (err: jwt.VerifyErrors, decoded: object) => {
      if (err) reject(err);
      if (decoded) resolve(decoded);
    });
  });

const sign = async (payload: string | object | Buffer) => {
  const privateKey = await fs.readFile(path.join(__dirname, "/../keys/private.key"));
  return signKeyAsync(payload, privateKey, { algorithm: "RS256", expiresIn: "120s" });
};

const verify = async (token: string) => {
  const publicKey = await fs.readFile(path.join(__dirname, "/../keys/public.key"));
  const decodedToken = await verifyKeyAsync(token, publicKey, { algorithms: ["RS256"] });
  return decodedToken;
};

export { verify, sign };
