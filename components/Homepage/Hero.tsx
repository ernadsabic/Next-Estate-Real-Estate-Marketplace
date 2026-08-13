import Image from "next/image";
import HeroSearch from "../HeroSearch";

const Hero = () => {
  return (
    <section className="min-h-dvh relative overflow-hidden flex items-center">
      <Image
        src={"/hero-bg.webp"}
        alt="Hero Image"
        priority
        fill
        className="object-cover object-center -z-15"
      />
      <div className="container mx-auto py-6 px-4 relative z-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-center max-w-fit gap-2 text-white py-2 px-4 border border-white/10 bg-slate-900/40 backdrop-blur-md rounded-full">
            <div className="bg-indigo-500 rounded-full h-2 w-2"></div>
            <h3>Premium Real Estate Marketplace</h3>
          </div>
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl max-w-sm md:max-w-2xl lg:max-w-3xl leading-normal tracking-tight md:leading-none font-bold">
            Find The{" "}
            <span className="bg-linear-to-r from-indigo-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
              Perfect
            </span>{" "}
            Place To Call Home
          </h1>
          <p className="text-gray-300 md:max-w-xl text-lg">
            Discover luxury apartments, modern homes, and premium properties in
            the best locations around the world.
          </p>
          <HeroSearch />
        </div>
      </div>
      <div className="absolute inset-0 bg-linear-to-r from-slate-950/70 via-slate-950/40 to-transparent -z-10" />
    </section>
  );
};

export default Hero;
