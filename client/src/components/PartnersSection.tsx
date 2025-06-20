import partnersImagePath from "@assets/partners 2_1750433672016.png";

export default function PartnersSection() {
  return (
    <section className="py-16 px-4" id="partners">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-orange-500 text-center mb-12">
          Our Partners
        </h2>
        
        <div className="flex justify-center">
          <img
            src={partnersImagePath}
            alt="Our Partners - Bitmain, Whatsminer, Hiveon, BitDeer, Tumilabs, Bhabha Technologies"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}