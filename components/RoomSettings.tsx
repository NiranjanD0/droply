"use client";

import {
  AlertCircle,
  ChevronDown,
  Clock3,
  Eye,
  EyeOff,
  FileText,
  Hash,
  KeyRound,
  Link2,
  LockKeyhole,
  Plus,
  Settings2,
  Tag,
  UserRound,
  UsersRound,
} from "lucide-react";
import { FormEvent, useState } from "react";

type Mode = "join" | "create";

const inputClass =
  "h-8 w-full rounded-md border border-[#b9b9a7] bg-[#f5f1df] px-2 text-[11px] text-[#18332d] outline-none placeholder:text-[#7d8178] focus:border-[#236e5c] focus:ring-1 focus:ring-[#236e5c]/30";
const labelClass = "mb-1 block text-[10px] font-bold text-[#243c36]";

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
      <Icon aria-hidden="true" className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#273d37]" />
      <input {...props} className={`${inputClass} pl-8 ${props.className ?? ""}`} />
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 py-1 text-left"
    >
      <span>
        <span className="block text-[11px] font-bold text-[#243c36]">{label}</span>
        {description && <span className="block text-[9px] text-[#667067]">{description}</span>}
      </span>
      <span className={`relative h-4 w-8 shrink-0 rounded-full transition-colors ${checked ? "bg-[#209b61]" : "bg-[#b8b9b0]"}`}>
        <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-transform ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
      </span>
    </button>
  );
}

function SelectField({
  icon: Icon,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  icon: typeof Clock3;
}) {
  return (
    <div className="relative">
      <Icon aria-hidden="true" className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#273d37]" />
      <select {...props} className={`${inputClass} appearance-none pl-8 pr-7 ${props.className ?? ""}`}>
        {children}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#273d37]" />
    </div>
  );
}

export function RoomSettings() {
  const [mode, setMode] = useState<Mode>("join");
  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [roomPassword, setRoomPassword] = useState("");
  const [roomName, setRoomName] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordProtected, setPasswordProtected] = useState(false);
  const [multipleFiles, setMultipleFiles] = useState(true);
  const [advanced, setAdvanced] = useState(false);
  const [error, setError] = useState("");

  const switchMode = (nextMode: Mode) => {
    setMode(nextMode);
    setError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name before continuing.");
      return;
    }
    if (mode === "join" && !roomCode.trim()) {
      setError("Enter a room code or invitation link.");
      return;
    }
    if (mode === "create" && passwordProtected && createPassword.length < 4) {
      setError("Protected rooms need a password with at least 4 characters.");
      return;
    }
    setError(
      mode === "join"
        ? "Room connections are not configured yet."
        : "Room creation is not configured yet.",
    );
  };

  return (
    <div className="w-full max-w-[650px] overflow-hidden rounded-xl border-[3px] border-[#15372f] bg-[#f3efdc] p-1.5 text-[#18332d] shadow-[0_8px_0_rgba(9,31,27,0.35)]">
      <div className="rounded-lg border border-[#31574c] bg-[#193b34] p-1">
        <div className="relative grid grid-cols-2 overflow-hidden rounded-md border border-[#0b2822] bg-[#18332d]">
          <span
            aria-hidden="true"
            className={`absolute inset-y-0 w-1/2 rounded-md bg-[#f3efdc] shadow-[0_1px_3px_rgba(0,0,0,0.35)] transition-transform duration-300 ${mode === "create" ? "translate-x-full" : ""}`}
          />
          {(["join", "create"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => switchMode(tab)}
              className={`relative z-10 h-8 text-xs font-bold transition-colors ${mode === tab ? "text-[#193b34]" : "text-[#f3efdc]"}`}
            >
              {tab === "join" ? "Join Room" : "Create Room"}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 md:p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-extrabold">{mode === "join" ? "Join an existing room" : "Create a new room"}</h2>
            <p className="mt-0.5 text-[10px] text-[#687168]">
              {mode === "join" ? "Enter the room code shared by the host." : "Configure your room and share the link with others."}
            </p>
          </div>
          <Settings2 aria-hidden="true" className="h-5 w-5 text-[#31574c]" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          <div className="space-y-3">
            <div>
              <FieldLabel>Your name</FieldLabel>
              <IconInput icon={UserRound} value={name} maxLength={40} onChange={(event) => setName(event.target.value)} placeholder="e.g. Niranjan" />
            </div>

            {mode === "join" ? (
              <>
                <div>
                  <FieldLabel>Room code or link</FieldLabel>
                  <IconInput icon={Link2} value={roomCode} onChange={(event) => setRoomCode(event.target.value)} placeholder="e.g. ABCD-1234 or droply.lol/xxxx" />
                </div>
                <div>
                  <FieldLabel>Password (if required)</FieldLabel>
                  <div className="relative">
                    <IconInput icon={KeyRound} type={showPassword ? "text" : "password"} value={roomPassword} onChange={(event) => setRoomPassword(event.target.value)} placeholder="Enter password..." className="pr-8" />
                    <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#32473f]">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <FieldLabel>Room name (optional)</FieldLabel>
                  <IconInput icon={Tag} value={roomName} maxLength={60} onChange={(event) => setRoomName(event.target.value)} placeholder="e.g. Weekend Photos" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <FieldLabel>Room duration</FieldLabel>
                    <SelectField icon={Clock3} defaultValue="10"><option value="5">5 minutes</option><option value="10">10 minutes</option><option value="15">15 minutes</option><option value="30">30 minutes</option><option value="60">60 minutes</option></SelectField>
                  </div>
                  <div>
                    <FieldLabel>Max participants</FieldLabel>
                    <SelectField icon={UsersRound} defaultValue="2"><option value="2">2 people</option><option value="3">3 people</option><option value="5">5 people</option><option value="10">10 people</option></SelectField>
                  </div>
                </div>
                <div className="border-t border-[#d3d0bd] pt-2">
                  <Toggle checked={passwordProtected} onChange={setPasswordProtected} label="Password protection" description="Require a password to join." />
                  {passwordProtected && (
                    <div className="mt-1">
                      <IconInput icon={LockKeyhole} type={showPassword ? "text" : "password"} value={createPassword} onChange={(event) => setCreatePassword(event.target.value)} placeholder="Room password" />
                    </div>
                  )}
                  <Toggle checked={multipleFiles} onChange={setMultipleFiles} label="Allow multiple files" description="Send more than one file per transfer." />
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col border-t border-[#d3d0bd] pt-4 md:border-l md:border-t-0 md:pl-5 md:pt-0">
            {mode === "join" ? (
              <div className="mt-auto">
                <button type="submit" className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#d78b79] bg-[#f2a38e] text-sm font-extrabold text-[#281f1b] shadow-[0_2px_0_#c97d6d] transition hover:bg-[#f6b09e]">
                  <Link2 className="h-4 w-4" /> Join Room
                </button>
                <p className="mt-3 flex gap-2 text-[10px] leading-snug text-[#59655e]"><AlertCircle className="h-4 w-4 shrink-0" />Enter a room code or use a shared link to join an existing room.</p>
              </div>
            ) : (
              <>
                <div className="mb-3">
                  <FieldLabel>Transfer permissions</FieldLabel>
                  <SelectField icon={UsersRound} defaultValue="all"><option value="all">Everyone can send & receive</option><option value="host-send">Host can send, participants receive</option><option value="host-receive">Host receives files only</option><option value="approval">Host approval required</option></SelectField>
                </div>
                <button type="button" onClick={() => setAdvanced(!advanced)} aria-expanded={advanced} className="flex items-center justify-between border-t border-[#d3d0bd] py-2 text-left">
                  <span className="flex items-center gap-2"><Settings2 className="h-4 w-4" /><span><strong className="block text-[11px]">Advanced settings</strong><small className="text-[9px] text-[#667067]">File types, size limits, approvals and more.</small></span></span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${advanced ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-[grid-template-rows,opacity] duration-300 ${advanced ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="min-h-0 overflow-hidden">
                    <div className="space-y-2 border-t border-[#d3d0bd] pb-2 pt-2">
                      <SelectField icon={LockKeyhole} defaultValue="any"><option value="any">Anyone with the link</option><option value="password">Password-protected access</option><option value="invite">Invite-only access</option></SelectField>
                      <Toggle checked={false} onChange={() => undefined} label="Require approval to join" />
                      <Toggle checked={false} onChange={() => undefined} label="Lock room" description="Prevent new participants from joining." />
                      <div className="grid grid-cols-2 gap-2">
                        <SelectField icon={FileText} defaultValue="all"><option value="all">All file types</option><option value="docs">Documents only</option><option value="media">Images & videos</option><option value="custom">Custom extensions</option></SelectField>
                        <SelectField icon={Hash} defaultValue="500"><option value="100">100 MB</option><option value="500">500 MB</option><option value="1024">1 GB</option><option value="5120">5 GB</option></SelectField>
                      </div>
                      <Toggle checked={false} onChange={() => undefined} label="Require recipient approval" />
                      <Toggle checked={false} onChange={() => undefined} label="Hide participant names" />
                    </div>
                  </div>
                </div>
                <button type="submit" className="mt-auto flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#d78b79] bg-[#f2a38e] text-sm font-extrabold text-[#281f1b] shadow-[0_2px_0_#c97d6d] transition hover:bg-[#f6b09e]">
                  <Plus className="h-4 w-4" /> Create Room
                </button>
              </>
            )}
            {error && <p role="alert" className="mt-2 text-[10px] font-bold text-[#9b453c]">{error}</p>}
          </div>
        </div>
      </form>
    </div>
  );
}

export default RoomSettings;
