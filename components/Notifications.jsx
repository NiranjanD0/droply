"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/* ------------------------------------------------------------------ *
 *  Stacked toast notifications
 *  - new toasts slide up from below while fading in
 *  - older toasts scale back and peek out above the newest one
 *  - hovering (or focusing) the stack fans it out into full-size cards
 *  - dismissing fades a toast out and the rest slide into place
 * ------------------------------------------------------------------ */

const GAP = 8; // space between cards when expanded
const PEEK = 10; // how far each stacked card peeks out when collapsed
const SCALE_STEP = 0.05; // shrink per level of depth when collapsed
const EXIT_MS = 300;

/**
 * @typedef {{
 *   icon?: string | import("react").ReactNode,
 *   title?: string,
 *   description?: string,
 *   duration?: number,
 *   id?: number,
 *   actions?: Array<{ label: string, onClick?: () => void, muted?: boolean }>
 * }} ToastOptions
 */

/**
 * @typedef {{
 *   notify: (options: ToastOptions) => number,
 *   dismiss: (id: number) => void
 * }} ToastApi
 */

/** @type {import("react").Context<ToastApi | null>} */
const ToastContext = createContext(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

let nextId = 1;

export function ToastProvider({
  children,
  position = "bottom-right", // "bottom-right" | "bottom-left" | "bottom-center"
  visible = 3, // how many toasts are shown at once
}) {
  const [toasts, setToasts] = useState([]); // newest first
  const [heights, setHeights] = useState({});
  const [hovered, setHovered] = useState(false);

  const dismiss = useCallback((id) => {
    setToasts((list) => list.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    setTimeout(() => {
      setToasts((list) => list.filter((t) => t.id !== id));
      setHeights(({ [id]: _gone, ...rest }) => rest);
    }, EXIT_MS);
  }, []);

  /**
   * notify({ title, description, icon, actions, duration })
   *  icon:     "alert" | "update" | any React node
   *  actions:  [{ label, onClick, muted }]  (clicking an action dismisses the toast)
   *  duration: ms before auto-dismiss (default Infinity = stays until dismissed)
   */
  const notify = useCallback((options) => {
    const id = options.id ?? nextId++;
    setToasts((list) => [
      { icon: "alert", duration: Infinity, ...options, id },
      ...list.filter((t) => t.id !== id),
    ]);
    return id;
  }, []);

  const setHeight = useCallback(
    (id, h) => setHeights((prev) => (prev[id] === h ? prev : { ...prev, [id]: h })),
    []
  );

  useEffect(() => {
    if (!toasts.length) setHovered(false);
  }, [toasts.length]);

  const api = useMemo(() => ({ notify, dismiss }), [notify, dismiss]);

  const active = toasts.filter((t) => !t.leaving);
  const expanded = hovered && active.length > 1;
  const frontHeight = heights[active[0]?.id] ?? 0;
  const shown = active.slice(0, visible);
  const listHeight = expanded
    ? shown.reduce((sum, t, i) => sum + (heights[t.id] ?? 0) + (i ? GAP : 0), 0)
    : frontHeight;

  return (
    <ToastContext.Provider value={api}>
      <style>{CSS}</style>
      {children}
      <ol
        className="ntf-list"
        data-position={position}
        aria-label="Notifications"
        style={{ height: listHeight }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        {toasts.map((toast, i) => {
          const newer = toasts.slice(0, i).filter((t) => !t.leaving);
          return (
            <Toast
              key={toast.id}
              toast={toast}
              index={newer.length}
              offset={newer.reduce((sum, t) => sum + (heights[t.id] ?? 0) + GAP, 0)}
              expanded={expanded}
              frontHeight={frontHeight}
              visible={visible}
              paused={hovered}
              onHeight={setHeight}
              onDismiss={dismiss}
            />
          );
        })}
      </ol>
    </ToastContext.Provider>
  );
}

function Toast({
  toast, index, offset, expanded, frontHeight, visible, paused, onHeight, onDismiss,
}) {
  const body = useRef(null);
  const [own, setOwn] = useState(0);
  const [entered, setEntered] = useState(false);
  const remaining = useRef(toast.duration);

  // measure our natural height (and keep it updated)
  useLayoutEffect(() => {
    const el = body.current;
    const measure = () => {
      setOwn(el.offsetHeight);
      onHeight(toast.id, el.offsetHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [toast.id, onHeight]);

  // trigger the slide-up after the first painted frame
  useEffect(() => {
    let inner;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setEntered(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, []);

  // optional auto-dismiss; pauses while the stack is hovered
  useEffect(() => {
    if (paused || toast.leaving || !Number.isFinite(remaining.current)) return;
    const start = Date.now();
    const timer = setTimeout(() => onDismiss(toast.id), remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current -= Date.now() - start;
    };
  }, [paused, toast.leaving, toast.id, onDismiss]);

  const behind = !expanded && index > 0;
  const hidden = index >= visible;
  const baseScale = expanded ? 1 : 1 - Math.min(index, visible) * SCALE_STEP;

  let y = expanded ? -offset : -index * PEEK;
  let scale = baseScale;
  let opacity = hidden ? 0 : 1;
  if (!entered) {
    y = own + 16; // start just below, then slide up
    scale = 1;
    opacity = 0;
  }
  if (toast.leaving) {
    opacity = 0;
    scale = baseScale * 0.96;
  }

  return (
    <li
      className="ntf-toast"
      role={toast.icon === "alert" ? "alert" : "status"}
      style={{
        height: (behind ? frontHeight || own : own) || undefined,
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        zIndex: 100 - index,
        pointerEvents: hidden || toast.leaving ? "none" : "auto",
      }}
    >
      <div ref={body} className="ntf-body" style={{ opacity: behind ? 0 : 1 }}>
        <div className="ntf-icon">{renderIcon(toast.icon)}</div>
        <div className="ntf-main">
          <p className="ntf-title">{toast.title}</p>
          {toast.description && <p className="ntf-desc">{toast.description}</p>}
          {toast.actions?.length > 0 && (
            <div className="ntf-actions">
              {toast.actions.map((a) => (
                <button
                  key={a.label}
                  className="ntf-action"
                  data-muted={a.muted || undefined}
                  onClick={() => {
                    a.onClick?.();
                    onDismiss(toast.id);
                  }}
                >
                  {a.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          className="ntf-close"
          aria-label="Dismiss notification"
          onClick={() => onDismiss(toast.id)}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M3 3l8 8M11 3l-8 8" />
          </svg>
        </button>
      </div>
    </li>
  );
}

/* ------------------------------ icons ------------------------------ */

function renderIcon(icon) {
  if (icon === "alert") {
    return (
      <span className="ntf-alert">
        <i />
        <i />
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="14" cy="14" r="8.5" />
          <path d="M14 10.4v4.1" />
          <circle cx="14" cy="17.7" r=".6" fill="currentColor" />
        </svg>
      </span>
    );
  }
  if (icon === "update") {
    return (
      <span className="ntf-tile">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
          <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
          <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
        </svg>
      </span>
    );
  }
  return icon;
}

/* ------------------------------ styles ----------------------------- */

const CSS = `
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,600&display=swap");

.ntf-list {
  --ntf-bg: #232323;
  --ntf-ring: rgba(255,255,255,.07);
  --ntf-text: #f4f4f4;
  --ntf-muted: #a1a1a1;
  --ntf-red: #e8455c;
  position: fixed; bottom: 16px; z-index: 9999;
  width: min(380px, calc(100vw - 32px));
  margin: 0; padding: 0; list-style: none;
  transition: height .3s cubic-bezier(.22,1,.36,1);
  font-family: "DM Sans", "Google Sans", system-ui, sans-serif;
}
.ntf-list[data-position="bottom-right"]  { right: 16px; }
.ntf-list[data-position="bottom-left"]   { left: 16px; }
.ntf-list[data-position="bottom-center"] { left: 50%; margin-left: min(-190px, calc(-50vw + 16px)); }

.ntf-toast {
  position: absolute; left: 0; right: 0; bottom: 0;
  overflow: hidden; border-radius: 14px;
  background: var(--ntf-bg);
  box-shadow: inset 0 0 0 1px var(--ntf-ring), 0 12px 32px rgba(0,0,0,.4);
  transform-origin: top center;
  transition:
    transform .45s cubic-bezier(.22,1,.36,1),
    opacity .3s ease,
    height .3s cubic-bezier(.22,1,.36,1);
}
.ntf-body {
  display: flex; gap: 12px; align-items: flex-start;
  padding: 14px 14px 14px 12px;
  transition: opacity .25s ease;
}
.ntf-icon { flex: none; display: grid; place-items: center; width: 28px; height: 28px; }
.ntf-main { flex: 1; min-width: 0; padding-top: 1px; }
.ntf-title { margin: 0; font-size: 14px; line-height: 20px; font-weight: 600; color: var(--ntf-text); }
.ntf-desc  { margin: 2px 0 0; font-size: 13px; line-height: 20px; color: var(--ntf-muted); }
.ntf-actions { display: flex; gap: 12px; margin-top: 10px; }
.ntf-action {
  padding: 0; border: 0; background: none; cursor: pointer;
  font: inherit; font-size: 13px; line-height: 18px; font-weight: 600;
  color: #d6d6d6; transition: color .15s ease;
}
.ntf-action:hover { color: #fff; }
.ntf-action[data-muted] { color: #8b8b8b; }
.ntf-action[data-muted]:hover { color: #c8c8c8; }
.ntf-close {
  flex: none; display: grid; place-items: center; width: 24px; height: 24px;
  margin-top: 2px; padding: 0; border: 0; border-radius: 6px;
  background: none; color: #6d6d6d; cursor: pointer; transition: color .15s ease, background .15s ease;
}
.ntf-close:hover { color: #e6e6e6; background: rgba(255,255,255,.06); }
.ntf-close:focus-visible, .ntf-action:focus-visible { outline: 2px solid #7c8cff; outline-offset: 2px; border-radius: 6px; }

/* alert icon with pulsing rings */
.ntf-alert { position: relative; display: grid; place-items: center; width: 28px; height: 28px; color: var(--ntf-red); }
.ntf-alert svg { position: relative; }
.ntf-alert i {
  position: absolute; inset: 3px; border-radius: 50%;
  border: 1px solid currentColor; opacity: 0;
  animation: ntf-ring 2.4s ease-out infinite;
}
.ntf-alert i:nth-child(2) { animation-delay: 1.2s; }
@keyframes ntf-ring {
  0%   { transform: scale(.75); opacity: .55; }
  100% { transform: scale(1.35); opacity: 0; }
}

/* app-style icon tile */
.ntf-tile {
  display: grid; place-items: center; width: 28px; height: 28px;
  border-radius: 8px; background: #151515; color: #e2e2e2;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.1);
}

@media (prefers-reduced-motion: reduce) {
  .ntf-list, .ntf-toast, .ntf-body { transition-duration: .01ms !important; }
  .ntf-alert i { animation: none; }
}
`;

/* ------------------------------ demo ------------------------------- */

function DemoButtons() {
  const { notify } = useToast();
  const btn = {
    padding: "10px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,.12)",
    background: "#222", color: "#eee", font: "600 14px 'DM Sans', system-ui, sans-serif", cursor: "pointer",
  };
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
      <button
        style={btn}
        onClick={() =>
          notify({
            icon: "alert",
            title: "This project has been unpublished",
            description: "Removing all users has unpublished this project. Add users to republish.",
            actions: [{ label: "Undo action" }],
          })
        }
      >
        Remove all users
      </button>
      <button
        style={btn}
        onClick={() =>
          notify({
            icon: "update",
            title: "Version 1.4.1 is now available",
            description: "Includes the all new dashboard view. Pages and exports will now load faster.",
            actions: [{ label: "Later", muted: true }, { label: "Install now" }],
          })
        }
      >
        Check for updates
      </button>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#171717" }}>
        <DemoButtons />
      </div>
    </ToastProvider>
  );
}
