"use client";

import {
  ChevronRight,
  Eye,
  EyeOff,
  KeyRound,
  Link2,
  LockKeyhole,
  LogIn,
  Plus,
  Settings2,
  Tag,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { FormEvent, useState } from "react";

/* ─── shared style tokens ─────────────────────────────────────────────────── */
const inputBase =
  "h-10 w-full rounded-md border border-zinc-700/60 bg-black/40 backdrop-blur-sm px-3 font-jetbrains-mono text-[12px] text-white outline-none placeholder:text-zinc-500 focus:border-white focus:ring-1 focus:ring-white/20 disabled:opacity-40";

const labelClass =
  "mb-1.5 block font-jetbrains-mono text-[11px] font-bold text-zinc-300";

const selectBase =
  "h-10 w-full rounded-md border border-zinc-700/60 bg-black/40 backdrop-blur-sm px-3 font-jetbrains-mono text-[12px] text-white outline-none focus:border-white focus:ring-1 focus:ring-white/20 appearance-none";

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
  warning,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
  icon?: typeof LockKeyhole;
  warning?: string;
}) {
  return (
    <div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="flex w-full items-center gap-3 py-1.5 text-left"
      >
        {Icon && (
          <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-zinc-400" />
        )}
        <span className="flex-1">
          <span className="block font-jetbrains-mono text-[12px] font-bold text-white">
            {label}
          </span>
          {description && (
            <span className="block font-jetbrains-mono text-[10px] text-zinc-500">
              {description}
            </span>
          )}
        </span>
        {/* toggle pill */}
        <span
          className={`relative h-[20px] w-9 shrink-0 rounded-full transition-colors duration-200 ${
            checked ? "bg-white" : "bg-zinc-800"
          }`}
        >
          <span
            className={`absolute top-[2px] h-4 w-4 rounded-full shadow transition-transform duration-200 ${
              checked
                ? "translate-x-[18px] bg-black"
                : "translate-x-[2px] bg-zinc-400"
            }`}
          />
        </span>
      </button>
      {warning && checked && (
        <p className="mt-1 font-jetbrains-mono text-[10px] text-amber-400/80">
          ⚠ {warning}
        </p>
      )}
    </div>
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
      <div className="absolute right-0 flex h-full flex-col overflow-hidden rounded-r-md border-l border-zinc-700/60">
        <button
          type="button"
          aria-label="Increase"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="flex flex-1 items-center justify-center px-2 text-zinc-400 hover:bg-white/10 hover:text-white"
        >
          <svg className="h-2 w-2" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M1 5L5 1L9 5" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Decrease"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex flex-1 items-center justify-center border-t border-zinc-700/60 px-2 text-zinc-400 hover:bg-white/10 hover:text-white"
        >
          <svg className="h-2 w-2" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth={2}>
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

/* ─── Advanced Settings Sidebar ───────────────────────────────────────────── */
function AdvancedSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [whoCanJoin, setWhoCanJoin] = useState("anyone");
  const [requireApproval, setRequireApproval] = useState(false);
  const [lockRoom, setLockRoom] = useState(false);
  const [linkBehavior, setLinkBehavior] = useState("open");
  const [hideNames, setHideNames] = useState(false);
  const [hideFileNames, setHideFileNames] = useState(false);
  const [deleteOnLeave, setDeleteOnLeave] = useState(false);
  const [enableChat, setEnableChat] = useState(true);

  return (
    <div
      aria-hidden={!open}
      className={`absolute inset-y-0 right-0 flex w-[280px] flex-col overflow-hidden border-l border-zinc-700/60 bg-zinc-900/60 backdrop-blur-md transition-transform duration-300 ease-in-out ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* sidebar header */}
      <div className="flex shrink-0 items-center justify-between border-b border-zinc-700/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <Settings2 className="h-4 w-4 text-zinc-400" />
          <span className="font-jetbrains-mono text-[12px] font-bold text-white">
            Advanced Settings
          </span>
        </div>
        <button
          type="button"
          aria-label="Close advanced settings"
          onClick={onClose}
          className="rounded p-1 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-5">

        {/* Who can join */}
        <div>
          <p className="mb-1 font-jetbrains-mono text-[11px] font-bold text-zinc-300">Who can join?</p>
          <p className="mb-2 font-jetbrains-mono text-[10px] text-zinc-500">Choose who is allowed to join your room.</p>
          <div className="relative">
            <select
              value={whoCanJoin}
              onChange={(e) => setWhoCanJoin(e.target.value)}
              className={selectBase}
            >
              <option value="anyone">Anyone with the link</option>
              <option value="password">Password-protected</option>
              <option value="invite">Invite-only</option>
            </select>
            <ChevronRight className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rotate-90 text-zinc-400" />
          </div>
        </div>

        <div className="border-t border-zinc-800/70" />

        {/* Require approval */}
        <Toggle
          checked={requireApproval}
          onChange={setRequireApproval}
          label="Require approval to join"
          description="Approve participants before they can enter the room."
        />

        {/* Lock room */}
        <Toggle
          checked={lockRoom}
          onChange={setLockRoom}
          label="Lock room"
          description="Prevent new participants from joining while locked."
        />

        {/* Room link behavior */}
        <div>
          <p className="mb-1 font-jetbrains-mono text-[11px] font-bold text-zinc-300">Room link behavior</p>
          <p className="mb-2 font-jetbrains-mono text-[10px] text-zinc-500">Choose how your invitation link works.</p>
          <div className="relative">
            <select
              value={linkBehavior}
              onChange={(e) => setLinkBehavior(e.target.value)}
              className={selectBase}
            >
              <option value="open">Anyone with the link can join</option>
              <option value="lock-after-first">Lock after first participant</option>
              <option value="regenerate">Allow host to regenerate link</option>
            </select>
            <ChevronRight className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rotate-90 text-zinc-400" />
          </div>
        </div>

        <div className="border-t border-zinc-800/70" />

        {/* Anonymity */}
        <Toggle
          checked={hideNames}
          onChange={setHideNames}
          label="Hide participant names"
          description="Display anonymous labels instead of real names."
        />

        <Toggle
          checked={hideFileNames}
          onChange={setHideFileNames}
          label="Hide file names"
          description="Only sender and recipient see the file name."
        />

        <div className="border-t border-zinc-800/70" />

        {/* Room Lifecycle */}
        <p className="font-jetbrains-mono text-[10px] font-bold uppercase tracking-widest text-zinc-600">
          Room Lifecycle
        </p>

        <Toggle
          checked={deleteOnLeave}
          onChange={setDeleteOnLeave}
          label="Delete room when host leaves"
          description="Automatically close the room when its creator leaves."
          warning="Leaving the room will end the session for all participants."
        />

        {/* Enable chat */}
        <Toggle
          checked={enableChat}
          onChange={setEnableChat}
          label="Enable chat"
          description="Allow participants to send text messages in the room."
        />

      </div>
    </div>
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
  const [createError, setCreateError] = useState("");

  /* terms */
  const [joinTermsAccepted, setJoinTermsAccepted] = useState(false);
  const [createTermsAccepted, setCreateTermsAccepted] = useState(false);

  /* advanced sidebar */
  const [advancedOpen, setAdvancedOpen] = useState(false);

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
    if (!createTermsAccepted) {
      setCreateError("Please accept the Terms of Service before creating a room.");
      return;
    }
    setCreateError("Room creation is not configured yet.");
  };

  return (
    /*
     * Outer shell expands horizontally when sidebar opens.
     * transition-[max-width] animates the width change.
     */
    <div
      className={`font-jetbrains-mono relative w-full overflow-hidden rounded-2xl border-[3px] border-zinc-700/60 bg-zinc-950/40 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_16px_36px_rgba(0,0,0,0.8)] transition-[max-width] duration-300 ease-in-out ${
        advancedOpen ? "max-w-[calc(56rem+280px)]" : "max-w-4xl"
      }`}
    >
      {/* inner dark card */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-[10px] border-2 border-zinc-800/70 bg-black/30 backdrop-blur-md">

        {/* two-panel body */}
        <div className="grid grid-cols-2">

          {/* ── LEFT: Join ────────────────────────────────────────────── */}
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
                    {showJoinPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                <p role="alert" className="mt-2.5 rounded border border-red-800/60 bg-red-950/60 p-2 font-jetbrains-mono text-[11px] font-bold text-red-300">
                  {joinError}
                </p>
              )}
            </div>
          </form>

          {/* ── RIGHT: Create ─────────────────────────────────────────── */}
          <form
            onSubmit={handleCreateSubmit}
            className="relative flex flex-col p-5"
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

              {/* Advanced settings trigger row */}
              <button
                type="button"
                aria-expanded={advancedOpen}
                onClick={() => setAdvancedOpen((o) => !o)}
                className="flex w-full items-center justify-between rounded-md border border-zinc-700/60 bg-white/[0.03] px-3 py-2.5 transition-colors hover:bg-white/[0.07]"
              >
                <div className="flex items-center gap-2">
                  <Settings2 className="h-4 w-4 text-zinc-400" />
                  <span className="font-jetbrains-mono text-[11px] font-bold text-zinc-300">
                    Advanced settings
                  </span>
                </div>
                <ChevronRight
                  className={`h-4 w-4 text-zinc-400 transition-transform duration-300 ${
                    advancedOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
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
                <p role="alert" className="mt-2.5 rounded border border-red-800/60 bg-red-950/60 p-2 font-jetbrains-mono text-[11px] font-bold text-red-300">
                  {createError}
                </p>
              )}
            </div>

            {/* Advanced sidebar — positioned absolute on the right edge of this form,
                overflows the card rightward; the outer container's max-width
                transition reveals / hides it. */}
            <AdvancedSidebar open={advancedOpen} onClose={() => setAdvancedOpen(false)} />
          </form>

        </div>
      </div>
    </div>
  );
}

export default RoomSettings;
