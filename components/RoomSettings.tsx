"use client";

import {
  Eye,
  EyeOff,
  KeyRound,
  Link2,
  LockKeyhole,
  LogIn,
  Plus,
  Tag,
  UserRound,
  UsersRound,
} from "lucide-react";
import { FormEvent, useState } from "react";

/* ─── shared style tokens ─────────────────────────────────────────────────── */
const inputBase =
  "h-10 w-full rounded-md border border-zinc-700/60 bg-black/40 backdrop-blur-sm px-3 font-jetbrains-mono text-[12px] text-white outline-none placeholder:text-zinc-500 focus:border-white focus:ring-1 focus:ring-white/20 disabled:opacity-40";

const labelClass =
  "mb-1.5 block font-jetbrains-mono text-[11px] font-bold text-zinc-300";

/* ─── sub-components ──────────────────────────────────────────────────────── */
function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className={labelClass}>{children}</label>;
}

function IconInput({
  icon: Icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon: typeof UserRound;
}) {
  return (
    <div className="relative">
      <Icon
        aria-hidden="true"
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
      />
      <input
        {...props}
        className={`${inputBase} pl-10 ${props.className ?? ""}`}
      />
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
  description,
  icon: Icon,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
  icon?: typeof LockKeyhole;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center gap-3 py-2 text-left"
    >
      {Icon && (
        <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-zinc-400" />
      )}
      <span className="flex-1">
        <span className="block font-jetbrains-mono text-[12px] font-bold text-white">
          {label}
        </span>
        {description && (
          <span className="block font-jetbrains-mono text-[10px] text-zinc-400">
            {description}
          </span>
        )}
      </span>
      {/* toggle pill */}
      <span
        className={`relative h-[20px] w-9 shrink-0 rounded-full transition-colors duration-200 ${checked ? "bg-white" : "bg-zinc-800"
          }`}
      >
        <span
          className={`absolute top-[2px] h-4 w-4 rounded-full shadow transition-transform duration-200 ${checked
            ? "translate-x-[18px] bg-black"
            : "translate-x-[2px] bg-zinc-400"
            }`}
        />
      </span>
    </button>
  );
}

function NumberStepper({
  value,
  onChange,
  min = 2,
  max = 10,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="relative flex items-center">
      <UsersRound aria-hidden="true" className="absolute left-3 h-4 w-4 text-zinc-400" />
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`${inputBase} pl-10 pr-9 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
      />
      {/* custom up/down arrows */}
      <div className="absolute right-0 flex h-full flex-col overflow-hidden rounded-r-md border-l border-zinc-700/60">
        <button
          type="button"
          aria-label="Increase"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="flex flex-1 items-center justify-center px-2 text-zinc-400 hover:bg-white/10 hover:text-white"
        >
          <svg
            className="h-2 w-2"
            viewBox="0 0 10 6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M1 5L5 1L9 5" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Decrease"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex flex-1 items-center justify-center border-t border-zinc-700/60 px-2 text-zinc-400 hover:bg-white/10 hover:text-white"
        >
          <svg
            className="h-2 w-2"
            viewBox="0 0 10 6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M1 1L5 5L9 1" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border-2 border-zinc-300 bg-white font-jetbrains-mono text-[14px] font-extrabold text-black shadow-[0_3px_0_#71717a] transition-all hover:-translate-y-px hover:bg-zinc-200 hover:shadow-[0_4px_0_#71717a] active:translate-y-px active:shadow-[0_1px_0_#71717a]"
    >
      {children}
    </button>
  );
}

/* ─── main export ─────────────────────────────────────────────────────────── */
export function RoomSettings() {
  /* join state */
  const [joinName, setJoinName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [showJoinPassword, setShowJoinPassword] = useState(false);
  const [joinError, setJoinError] = useState("");

  /* create state */
  const [createName, setCreateName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(2);
  const [passwordProtected, setPasswordProtected] = useState(false);
  const [createPassword, setCreatePassword] = useState("");
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [createError, setCreateError] = useState("");

  const [joinTermsAccepted, setJoinTermsAccepted] = useState(false);
  const [createTermsAccepted, setCreateTermsAccepted] = useState(false);

  const handleJoinSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!joinName.trim()) {
      setJoinError("Please enter your name before continuing.");
      return;
    }
    if (!roomCode.trim()) {
      setJoinError("Enter a room code or invitation link.");
      return;
    }
    if (!joinTermsAccepted) {
      setJoinError("Please accept the Terms of Service before joining.");
      return;
    }
    setJoinError("Room connections are not configured yet.");
  };

  const handleCreateSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!createName.trim()) {
      setCreateError("Please enter your name before continuing.");
      return;
    }
    if (passwordProtected && createPassword.length < 4) {
      setCreateError("Protected rooms need a password with at least 4 characters.");
      return;
    }
    if (!createTermsAccepted) {
      setCreateError("Please accept the Terms of Service before creating a room.");
      return;
    }
    setCreateError("Room creation is not configured yet.");
  };

  return (
    /*
     * Outer shell:
     *   – black translucent theme with backdrop-blur
     */
    <div className="font-jetbrains-mono flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl border-[3px] border-zinc-700/60 bg-zinc-950/40 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_16px_36px_rgba(0,0,0,0.8)]">
      {/* inner dark card */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-[10px] border-2 border-zinc-800/70 bg-black/30 backdrop-blur-md">

        {/* two-panel body */}
        <div className="grid flex-1 grid-cols-2 overflow-auto">

          {/* ── LEFT: Join ──────────────────────────────────────────── */}
          <form
            onSubmit={handleJoinSubmit}
            className="flex flex-col border-r-[2px] border-zinc-800/70 p-5"
          >
            <div className="mb-4">
              <h2 className="font-jetbrains-mono text-[18px] font-extrabold leading-snug text-white">
                Join an existing room
              </h2>
              <p className="mt-1 font-jetbrains-mono text-[11px] text-zinc-400">
                Enter the room code shared by the host.
              </p>
            </div>

            <div className="space-y-3.5">
              <div>
                <FieldLabel>Your name</FieldLabel>
                <IconInput
                  icon={UserRound}
                  value={joinName}
                  maxLength={40}
                  onChange={(e) => setJoinName(e.target.value)}
                  placeholder="e.g. Ghostly"
                />
              </div>

              <div>
                <FieldLabel>Room code</FieldLabel>
                <IconInput
                  icon={Link2}
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  placeholder="e.g. 1234"
                />
              </div>

              <div>
                <FieldLabel>Password (if required)</FieldLabel>
                <div className="relative">
                  <IconInput
                    icon={LockKeyhole}
                    type={showJoinPassword ? "text" : "password"}
                    value={roomPassword}
                    onChange={(e) => setRoomPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="pr-10"
                  />
                  <button
                    type="button"
                    aria-label={showJoinPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowJoinPassword(!showJoinPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                  >
                    {showJoinPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* submit area pushed to bottom */}
            <div className="mt-auto pt-5">
              <label className="mb-3 flex cursor-pointer items-start gap-2 font-jetbrains-mono text-[10px] leading-snug text-zinc-400">
                <input
                  type="checkbox"
                  checked={joinTermsAccepted}
                  onChange={(e) => setJoinTermsAccepted(e.target.checked)}
                  className="mt-px h-4 w-4 shrink-0 accent-white"
                />
                <span>
                  I agree to Droply&apos;s Terms of Service and acknowledge that I
                  am responsible for the files I share.
                </span>
              </label>
              <SubmitButton>
                <LogIn className="h-4 w-4" /> Join Room
              </SubmitButton>
              {joinError && (
                <p
                  role="alert"
                  className="mt-2.5 rounded border border-red-800/60 bg-red-950/60 p-2 font-jetbrains-mono text-[11px] font-bold text-red-300"
                >
                  {joinError}
                </p>
              )}
            </div>
          </form>

          {/* ── RIGHT: Create ───────────────────────────────────────── */}
          <form
            onSubmit={handleCreateSubmit}
            className="flex flex-col p-5"
          >
            <div className="mb-4">
              <h2 className="font-jetbrains-mono text-[18px] font-extrabold leading-snug text-white">
                Create a new room
              </h2>
              <p className="mt-1 font-jetbrains-mono text-[11px] text-zinc-400">
                Configure your room and share the link with others.
              </p>
            </div>

            <div className="space-y-3.5">
              <div>
                <FieldLabel>Your name</FieldLabel>
                <IconInput
                  icon={UserRound}
                  value={createName}
                  maxLength={40}
                  onChange={(e) => setCreateName(e.target.value)}
                  placeholder="e.g. Ghostly"
                />
              </div>

              <div>
                <FieldLabel>Room name (optional)</FieldLabel>
                <IconInput
                  icon={Tag}
                  value={roomName}
                  maxLength={60}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="e.g. Weekend Photos"
                />
              </div>

              <div>
                <FieldLabel>Max participants</FieldLabel>
                <NumberStepper
                  value={maxParticipants}
                  onChange={setMaxParticipants}
                  min={2}
                  max={10}
                />
              </div>

              {/* password protection row — always shows input, disabled when toggle off */}
              <div className="rounded-md border border-zinc-700/60 bg-black/30 backdrop-blur-sm px-3">
                <Toggle
                  checked={passwordProtected}
                  onChange={setPasswordProtected}
                  label="Password protection"
                  description="Require a password to join."
                  icon={LockKeyhole}
                />
                <div className="relative mb-2.5">
                  <IconInput
                    icon={KeyRound}
                    type={showCreatePassword ? "text" : "password"}
                    value={createPassword}
                    onChange={(e) => setCreatePassword(e.target.value)}
                    placeholder="Enter password..."
                    className="pr-10"
                    disabled={!passwordProtected}
                  />
                  <button
                    type="button"
                    aria-label={
                      showCreatePassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowCreatePassword(!showCreatePassword)}
                    disabled={!passwordProtected}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white disabled:pointer-events-none disabled:opacity-40"
                  >
                    {showCreatePassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* submit area pushed to bottom */}
            <div className="mt-auto pt-5">
              <label className="mb-3 flex cursor-pointer items-start gap-2 font-jetbrains-mono text-[10px] leading-snug text-zinc-400">
                <input
                  type="checkbox"
                  checked={createTermsAccepted}
                  onChange={(e) => setCreateTermsAccepted(e.target.checked)}
                  className="mt-px h-4 w-4 shrink-0 accent-white"
                />
                <span>
                  I agree to Droply&apos;s Terms of Service and acknowledge that I
                  am responsible for the files shared in this room.
                </span>
              </label>
              <SubmitButton>
                <Plus className="h-4 w-4" /> Create Room
              </SubmitButton>
              {createError && (
                <p
                  role="alert"
                  className="mt-2.5 rounded border border-red-800/60 bg-red-950/60 p-2 font-jetbrains-mono text-[11px] font-bold text-red-300"
                >
                  {createError}
                </p>
              )}
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default RoomSettings;
