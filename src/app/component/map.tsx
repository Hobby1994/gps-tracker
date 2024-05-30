"use client";

import { useEffect, useState } from "react";
import { Map, Marker, Overlay } from "pigeon-maps";
import axios from "axios";

interface Location {
  lat: number;
  lng: number;
}

const DEVICE_ID = process.env.NEXT_PUBLIC_DEVICE_ID!;
const FLESPPI_TOKEN = process.env.NEXT_PUBLIC_FLESPPI_TOKEN!;

const MapWithOverlay: React.FC = () => {
  const [location, setLocation] = useState<Location>({ lat: 0, lng: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://flespi.io/gw/devices/${DEVICE_ID}/messages?limit=1`,
          {
            headers: {
              Authorization: `FlespiToken ${FLESPPI_TOKEN}`,
            },
          }
        );

        if (response.data.result.length > 0) {
          const message = response.data.result[0];
          const { lat, lng } = message.position;
          setLocation({ lat, lng });
        } else {
          console.error("No position data available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Map
      center={[location.lat, location.lng]}
      zoom={14}
      width={600}
      height={400}
    >
      <Marker width={50} anchor={[location.lat, location.lng]} />
      <Overlay anchor={[location.lat, location.lng]} offset={[25, 25]}>
        <img src="/logo.jpg" alt="Location Image" width={50} height={50} />
      </Overlay>
    </Map>
  );
};

export default MapWithOverlay;
