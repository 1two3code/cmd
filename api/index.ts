// import { webcrypto } from 'node:crypto';
const { subtle } = globalThis.crypto;
import { VercelRequest, VercelResponse } from "@vercel/node";
import { verify } from "discord-verify/node";

export default async (req: VercelRequest, res: VercelResponse) => {
  const {
    body
  } = req;
  const { type } = body;

  if (type === 1) {
    res.status(200).send({ type: 1 });
  }

  const publicKey = process.env.PUBLIC_KEY!;
  const signature = req.headers["x-signature-ed25519"] as string;
  const timestamp = req.headers["x-signature-timestamp"] as string;
  const rawBody = JSON.stringify(req.body);

  const isValid = await verify(
    rawBody,
    signature,
    timestamp,
    publicKey,
    subtle
  );
  //@ts-ignore
  // const isValid = await isValidRequest(req, publicKey);
  // if (isValid) {
  //   res.status(200)
  // }

  // res.setHeader("Content-Type", "application/json");
  // res.status(200).send(billboard);
};
