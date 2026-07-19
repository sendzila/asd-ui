/** @sendzila/ui — the primitive kit. Every visual decision traces to the
 * token contract (see ui.css / @sendzila/theme). Decoupling rules: no app
 * imports (enforced by the package boundary), no locked copy — every
 * user-facing string is a prop, so any consumer localizes freely. */

import { useEffect, useRef, useState, type ReactNode } from "react";

export function cx(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/* —— buttons —— */

export function Button({
  kind = "default",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  kind?: "primary" | "default" | "danger" | "ghost";
}) {
  const kinds = {
    primary:
      "bg-brand text-brand-ink font-medium hover:bg-brand-hover active:translate-y-px border border-transparent",
    default: "bg-overlay border border-edge hover:border-edge-strong text-ink",
    danger: "bg-bad-dim border border-bad/25 text-bad hover:border-bad/60",
    ghost: "text-ink-dim hover:text-ink hover:bg-overlay border border-transparent",
  };
  return (
    <button
      className={cx(
        "inline-flex items-center gap-1.5 rounded-[7px] px-3 h-8 text-[13px] transition-colors disabled:opacity-40 disabled:pointer-events-none select-none",
        kinds[kind],
        className,
      )}
      {...props}
    />
  );
}

/* —— form —— */

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cx(
        "h-8 w-full rounded-[7px] bg-inset border border-edge px-2.5 text-[13px] text-ink placeholder:text-ink-mute focus:border-edge-strong",
        props.className,
      )}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cx(
        "h-8 rounded-[7px] bg-inset border border-edge px-2 text-[13px] text-ink",
        props.className,
      )}
    />
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[12px] font-medium text-ink-dim">{label}</span>
      {children}
      {hint && <span className="block text-[11.5px] text-ink-mute">{hint}</span>}
    </label>
  );
}

/* —— status —— */

const STATUS_STYLES: Record<string, string> = {
  sent: "text-ok bg-ok-dim",
  delivered: "text-ok bg-ok-dim",
  queued: "text-neutral bg-neutral-dim",
  sending: "text-info bg-info-dim",
  bounced: "text-bad bg-bad-dim",
  failed: "text-bad bg-bad-dim",
  complained: "text-grape bg-grape-dim",
  suppressed: "text-warn bg-warn-dim",
  verified: "text-ok bg-ok-dim",
  pending: "text-warn bg-warn-dim",
  live: "text-ok bg-ok-dim",
  test: "text-info bg-info-dim",
};

export function StatusBadge({ value }: { value: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium lowercase",
        STATUS_STYLES[value] ?? "text-neutral bg-neutral-dim",
      )}
    >
      {value}
    </span>
  );
}

/* —— copy —— */

export function CopyButton({
  text,
  label = "copy",
  copiedLabel = "copied",
}: {
  text: string;
  label?: string;
  copiedLabel?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="text-[11px] text-ink-mute hover:text-brand transition-colors data"
      onClick={() => {
        void navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
    >
      {copied ? copiedLabel : label}
    </button>
  );
}

/* —— surfaces —— */

export function Drawer({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title: ReactNode;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/55" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-[560px] max-w-[92vw] bg-overlay border-l border-edge-strong flex flex-col">
        <header className="flex items-center justify-between px-5 h-14 border-b border-edge shrink-0">
          <div className="min-w-0">{title}</div>
          <button
            className="text-ink-mute hover:text-ink text-lg leading-none px-1"
            onClick={onClose}
          >
            ×
          </button>
        </header>
        <div className="overflow-y-auto flex-1 p-5">{children}</div>
      </aside>
    </div>
  );
}

export function Modal({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/55" onClick={onClose} />
      <div ref={ref} className="relative w-[440px] max-w-full card bg-overlay p-5 space-y-4">
        <h2 className="text-[15px] font-semibold">{title}</h2>
        {children}
      </div>
    </div>
  );
}

/* —— four-state rule: skeleton → error → empty → data ——
   Skeletons are LAYOUT-TRUE: same columns, same row heights as the data they
   stand in for, so arrival shifts nothing. aria-hidden + a polite live label:
   screen readers hear the loading label, never a parade of empty cells.
   Spinner is for ACTIONS (pending buttons), never page content. */

export function EmptyState({
  title,
  hint,
  action,
}: {
  title: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <div className="py-16 text-center space-y-2">
      <p className="text-ink-dim text-[14px]">{title}</p>
      {hint && <p className="text-ink-mute text-[12.5px] max-w-md mx-auto">{hint}</p>}
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}

export function Spinner() {
  return (
    <div className="py-12 grid place-items-center">
      <div className="h-4 w-4 rounded-full border-2 border-edge-strong border-t-brand animate-spin" />
    </div>
  );
}

export function Skeleton({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return <span aria-hidden style={style} className={cx("skeleton inline-block", className)} />;
}

export function TableSkeleton({
  cols,
  rows = 8,
  loadingLabel = "Loading",
}: {
  cols: number;
  rows?: number;
  loadingLabel?: string;
}) {
  return (
    <div role="status" aria-label={loadingLabel}>
      <table className="w-full table-dense" aria-hidden>
        <tbody>
          {Array.from({ length: rows }, (_, row) => (
            <tr key={row}>
              {Array.from({ length: cols }, (_, col) => (
                <td key={col}>
                  <Skeleton
                    className="h-[13px]"
                    // Vary widths so the sheet reads as content, not stripes.
                    style={{ width: `${[85, 55, 70, 40, 60, 75][(row + col) % 6]}%` }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CardSkeleton({
  lines = 3,
  className = "",
  loadingLabel = "Loading",
}: {
  lines?: number;
  className?: string;
  loadingLabel?: string;
}) {
  return (
    <div role="status" aria-label={loadingLabel} className={cx("card p-4 space-y-2.5", className)}>
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          className="h-[13px] block"
          style={{ width: `${[70, 92, 48, 80, 60][index % 5]}%` }}
        />
      ))}
    </div>
  );
}

/** Recoverable in place — dead-end errors are banned. */
export function ErrorState({
  error,
  onRetry,
  retryLabel = "Retry",
}: {
  error: unknown;
  onRetry?: () => void;
  retryLabel?: string;
}) {
  const detail = error instanceof Error ? error.message : String(error);
  return (
    <div role="alert" className="py-12 text-center space-y-3">
      <p className="text-[13px] text-bad">{detail}</p>
      {onRetry && (
        <Button kind="default" onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
}

/* —— tabs: title above, underline tab row, accent underline on active, one
   full-width hairline under the row. Proper tablist semantics. —— */

export function Tabs<T extends string>({
  tabs,
  active,
  onChange,
  label,
  idPrefix,
}: {
  tabs: { id: T; label: () => string }[];
  active: T;
  onChange: (tab: T) => void;
  label: string;
  idPrefix: string;
}) {
  return (
    <div role="tablist" aria-label={label} className="flex gap-1 border-b border-edge mb-5">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          id={`${idPrefix}-tab-${tab.id}`}
          aria-selected={active === tab.id}
          aria-controls={`${idPrefix}-panel-${tab.id}`}
          tabIndex={active === tab.id ? 0 : -1}
          onClick={() => onChange(tab.id)}
          onKeyDown={(event) => {
            const index = tabs.findIndex((entry) => entry.id === active);
            if (event.key === "ArrowRight") onChange(tabs[(index + 1) % tabs.length].id);
            if (event.key === "ArrowLeft")
              onChange(tabs[(index - 1 + tabs.length) % tabs.length].id);
          }}
          className={cx(
            "px-3 py-2 text-[13px] -mb-px border-b-2 transition-colors",
            active === tab.id
              ? "border-brand text-ink font-medium"
              : "border-transparent text-ink-dim hover:text-ink",
          )}
        >
          {tab.label()}
        </button>
      ))}
    </div>
  );
}

export function TabPanel({
  idPrefix,
  tab,
  children,
  className = "",
}: {
  idPrefix: string;
  tab: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="tabpanel"
      id={`${idPrefix}-panel-${tab}`}
      aria-labelledby={`${idPrefix}-tab-${tab}`}
      className={className}
    >
      {children}
    </div>
  );
}
