// pages/api/location.ts
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      latitude: number;
      longitude: number;
    }
  | { message: string };

export default async function handler() {
  const FLESPPI_TOKEN =
    "bLYRWxI7zy2erkDibj5yrqp1cyDeYUgOm2Zd6glnxDbn89yVp9RgHpBio9Cd5rat";
  const DEVICE_ID = "5732637";

  const response = await fetch(
    `https://flespi.io/gw/devices/${DEVICE_ID}/messages?limit=1`,
    {
      headers: {
        Authorization: `FlespiToken ${FLESPPI_TOKEN}`,
      },
    }
  );

  console.log(response.status);
  //   if (response.ok) {
  //     const data = await response.json();
  //     if (data.length > 0) {
  //       const latestMessage = data[0];
  //       const latitude = latestMessage.position?.latitude;
  //       const longitude = latestMessage.position?.longitude;
  //       if (latitude && longitude) {
  //         res.status(200).json({ latitude, longitude });
  //       } else {
  //         res.status(404).json({ message: "No GPS data available" });
  //       }
  //     } else {
  //       res.status(404).json({ message: "No data available" });
  //     }
  //   } else {
  //     res.status(500).json({ message: "Failed to fetch data" });
  //   }
}
