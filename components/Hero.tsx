"use client";

const Hero = () => {
  return (
    <section
      className="flex flex-col px-2 md:px-10 py-4 w-full h-screen bg-[url('/assets/images/kid.gif')] bg-cover bg-center"
    >
      {/* Top Bar */}
      <div className="flex items-center gap-4 w-full md:h-50 md:h-30 h-20 justify-between">
        <div className="flex items-center md:gap-3 gap-1 md:ml-10 ml-3">
          <img src="/assets/images/droply_ghost.png" alt="" className="md:w-30 md:h-30 w-15 h-15 object-contain" />
          <img src="/assets/images/droply.webp" alt="" className="md:w-70 md:h-30 w-35 object-contain" />
        </div>
        <div>
          <img src="/assets/images/punchline.png" alt="" className="md:w-50 md:h-20 w-20 h-10 object-contain md:mr-10 mr-3"/>
        </div>
      </div>

    </section>
  );
};

export default Hero;