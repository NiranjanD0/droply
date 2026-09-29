"use client";
import { SendIcon, LeafIcon, FileLockIcon, TriangleAlertIcon } from "lucide-react";
import FeaturesShowcase from "./FeaturesShowcase";
import RoomSettings from "./RoomSettings";
import { Highlighter } from "./ui/highlighter";
import { Floating3DParticles } from "./ui/floating-3d-particles";

const Hero = () => {
  return (
    <section
      className="flex flex-col px-2 md:px-10 py-4 w-full h-screen bg-black relative overflow-hidden"
    >
      <Floating3DParticles
        className="absolute inset-0 opacity-50"
        color="#ffffff"
        quantity={300}
      />
      <div className="flex flex-col relative z-10 md:pb-8 pb-3">
        {/* Top Bar */}
        <Highlighter action="underline" color="#FFFFFF">
          <div className="flex items-center gap-4 w-full md:h-30 h-20 md:ml-10 ml-3 pr-10 justify-between">
            <div className="flex items-center md:gap-3 gap-1 w-120 justify-center">
              <img src="/assets/images/TopBar/droply_ghost.png" alt="" className="md:w-30 md:h-30 w-15 h-15 object-contain" />
              <img src="/assets/images/TopBar/droply.webp" alt="" className="md:w-70 md:h-30 w-35 object-contain" />
            </div>
            <div>
              <img src="/assets/images/TopBar/punchline.png" alt="" className="md:w-50 md:h-20 w-20 h-10 object-contain md:mr-10 mr-3" />
            </div>
          </div>
        </Highlighter>
      </div>
      <div className="w-full h-full flex relative z-10">
        <div className="flex flex-col gap-2 mx-10 w-120 my-5">
          <div className="flex items-start md:justify-between justify-center gap-2 text-white">
            <FeaturesShowcase
              icon={SendIcon}
              text="P2P Transfer"
              description={
                <>
                  Directly between
                  <br />
                  browsers.
                </>
              }
            />
            <FeaturesShowcase
              icon={LeafIcon}
              text="No Storage"
              description={
                <>
                  Your files,
                  <br />
                  your devices.
                </>
              }
            />

            <FeaturesShowcase
              icon={FileLockIcon}
              text="Private"
              description={
                <>
                  No accounts,
                  <br />
                  no tracking.
                </>
              }
            />
          </div>
          <div className="text-sm font-jetbrains-mono flex flex-col h-full justify-center gap-5 text-white">
            <p>
              Droply is a temporary, peer-to-peer file sharing service built for moving
              files between people without creating another permanent copy of them
              somewhere on the internet.
            </p>

            <p>
              Create a room, share the link, and connect another device. When a direct
              connection can be established, your files travel directly between connected
              browsers through WebRTC rather than being uploaded to Droply for permanent
              storage.
            </p>

            <p>
              Rooms are intentionally short-lived. Each room exists for a limited period
              and disappears when its session expires. Droply is designed for temporary
              transfers, not permanent file hosting, cloud storage, or file archives.
            </p>

            <p>
              Droply provides the connection. What travels through it is up to you.
            </p>

            <div className="flex gap-3 rounded-md border border-red-900/70 bg-red-950/40 p-3 text-xs leading-tight">
              <TriangleAlertIcon
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-red-200"
              />
              <p>
                <strong className="block">What you share is your responsibility.</strong>{" "}
                Droply does not review, approve, endorse, or guarantee user-provided
                content. You are solely responsible for the files you choose to send and
                for ensuring that your use of Droply complies with applicable laws and the
                rights of others.
              </p>
            </div>

          </div>
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-center px-4 py-6 md:px-8">
          <RoomSettings />
        </div>
      </div>
      <div className="flex justify-between items-center px-10 mt-5 text-white relative z-10 border-t border-zinc-700/60 pt-5">
        <div className="flex gap-6 font-jetbrains-mono items-center">
          <p>Droply</p>
          <p>&copy;</p>
          <p>2026</p>
          <img src="/assets/images/stroke.webp" alt="" className="h-2" />
        </div>
        <div className="font-jetbrains-mono">
          <p>"Same files. A calmer internet."</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;