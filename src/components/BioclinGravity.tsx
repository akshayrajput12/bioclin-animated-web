import { Gravity, MatterBody } from "./ui/gravity";

export function BioclinGravity() {
  return (
    <div className="w-full h-full min-h-[500px] flex flex-col relative">
      <div className="pt-20 text-6xl sm:text-7xl md:text-8xl text-primary w-full text-center font-playfair italic">
        Our Services
      </div>
      <p className="pt-4 text-base sm:text-xl md:text-2xl text-muted-foreground w-full text-center font-plusJakarta">
        Comprehensive solutions for clinical research:
      </p>
      <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full">
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="30%"
          y="10%"
        >
          <div className="text-xl sm:text-2xl md:text-3xl bg-primary text-white rounded-full hover:cursor-pointer px-8 py-4 font-plusJakarta">
            Clinical Trials
          </div>
        </MatterBody>
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="30%"
          y="30%"
        >
          <div className="text-xl sm:text-2xl md:text-3xl bg-secondary text-white rounded-full hover:cursor-grab px-8 py-4 font-plusJakarta">
            Data Analysis
          </div>
        </MatterBody>
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="40%"
          y="20%"
          angle={10}
        >
          <div className="text-xl sm:text-2xl md:text-3xl bg-blue-600 text-white rounded-full hover:cursor-grab px-8 py-4 font-plusJakarta">
            Research Design
          </div>
        </MatterBody>
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="75%"
          y="10%"
        >
          <div className="text-xl sm:text-2xl md:text-3xl bg-purple-600 text-white rounded-full hover:cursor-grab px-8 py-4 font-plusJakarta">
            Quality Assurance
          </div>
        </MatterBody>
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="80%"
          y="20%"
        >
          <div className="text-xl sm:text-2xl md:text-3xl bg-green-600 text-white rounded-full hover:cursor-grab px-8 py-4 font-plusJakarta">
            Regulatory Affairs
          </div>
        </MatterBody>
        <MatterBody
          matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
          x="50%"
          y="10%"
        >
          <div className="text-xl sm:text-2xl md:text-3xl bg-orange-500 text-white rounded-full hover:cursor-grab px-8 py-4 font-plusJakarta">
            Biostatistics
          </div>
        </MatterBody>
      </Gravity>
    </div>
  );
} 