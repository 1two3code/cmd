import { VercelRequest, VercelResponse } from "@vercel/node";
import isValid from "./validate-signature";

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req?.body?.type === 1) {
    return res.status(200).send({ type: 1 });
  }

  if (!await isValid(req)) {
    return res.status(401).send("Invalid signature");
  }


  res.setHeader("Content-Type", "application/json");
  res.status(200).send({ random: 'data' });
};
