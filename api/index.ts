import { VercelRequest, VercelResponse } from "@vercel/node";
import isValid from "./src/validate-signature";

export default async (req: VercelRequest, res: VercelResponse) => {
  if (!await isValid(req)) {
    return res.status(401).send("Invalid signature");
  }

  const { body } = req;
  if (body?.type === 1) {
    return res.status(200).send({ type: 1 });
  }

  res.setHeader("Content-Type", "application/json");
  res.status(200).send({ type: 4, data: { content: 'Text returned from bot' } });
};
