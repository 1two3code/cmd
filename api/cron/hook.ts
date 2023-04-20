import { VercelRequest, VercelResponse } from "@vercel/node";
import { get } from 'node:https';

export default async (req: VercelRequest, res: VercelResponse) => {
  const webhook = 'https://api.pushcut.io/nTXfJgejdTF9dMlGaHUNn/notifications/My%20First%20Notification';

  try {
    await new Promise(r => get(webhook, r));
    return res.status(200);
  } catch (e) {
    return res.status(500);
  }
};
