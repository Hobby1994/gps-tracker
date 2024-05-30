import Head from "next/head";
import MapComponent from "../app/component/MapWithOverlay";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Pigeon Maps with Overlay</title>
        <meta
          name="description"
          content="Display GPS data with overlay on a map using Pigeon Maps and Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" w-screen h-screen">
        <MapComponent />
      </main>
    </div>
  );
};

export default Home;
