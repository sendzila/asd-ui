import { StatusBadge } from "..";

const STATUSES = [
  "sent", "delivered", "queued", "sending", "bounced",
  "failed", "complained", "suppressed", "verified", "pending", "live", "test",
];

export const AllStatuses = () => (
  <div className="flex flex-wrap gap-2 p-6">
    {STATUSES.map((status) => (
      <StatusBadge key={status} value={status} />
    ))}
  </div>
);
