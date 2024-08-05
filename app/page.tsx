"use client";

import Image from "next/image";
import App from "./components/App";

const Home = () => {
  return (
    <>
      <div className="h-full overflow-hidden">
        <main className="h-full">
          <App />
        </main>
      </div>
    </>
  );
};

export default Home;
