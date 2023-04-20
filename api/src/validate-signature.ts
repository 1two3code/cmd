import { webcrypto } from 'node:crypto';
import { verify } from "discord-verify/node";
import { VercelRequest } from '@vercel/node';

export default async (req: VercelRequest) => {
  const publicKey = process.env.PUBLIC_KEY!;
  const signature = req.headers["x-signature-ed25519"] as string;
  const timestamp = req.headers["x-signature-timestamp"] as string;
  const rawBody = JSON.stringify(req.body);

  return verify(
    rawBody,
    signature,
    timestamp,
    publicKey,
    webcrypto.subtle
  );
}