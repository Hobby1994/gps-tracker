"use client";

import { useEffect, useState } from "react";
import { Map, Marker, Overlay } from "pigeon-maps";
import axios from "axios";
import Image from "next/image";

interface Location {
  lat: number;
  lng: number;
}

const DEVICE_ID = process.env.NEXT_PUBLIC_DEVICE_ID!;
const FLESPPI_TOKEN = process.env.NEXT_PUBLIC_FLESPPI_TOKEN!;

const MapWithOverlay: React.FC = () => {
  const [location, setLocation] = useState<Location>({ lat: 0, lng: 0 });
  const [error, setError] = useState<string | null>(null);

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
          console.log("Received message:", message);

          // Ensure `position` exists and contains `latitude` and `longitude`

          setLocation({
            lat: message["position.latitude"],
            lng: message["position.longitude"],
          });
        } else {
          throw new Error("No position data available");
        }
      } catch (error: any) {
        setError(error.message || "Error fetching data");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-full">
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <Map center={[location.lat, location.lng]} zoom={17}>
          <Overlay anchor={[location.lat, location.lng]} offset={[25, 25]}>
            <Image
              src="/logo.png"
              alt="Location Image"
              width={25}
              height={25}
            />
          </Overlay>
        </Map>
      )}
    </div>
  );
};

export default MapWithOverlay;
