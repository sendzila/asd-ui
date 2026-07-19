/** The four-state rule: every data surface is exactly one of
 * skeleton -> error -> empty -> data. These are the first three. */
import { CardSkeleton, EmptyState, ErrorState, Skeleton, Spinner, TableSkeleton, Button } from "..";

export const TableLoading = () => (
  <div className="p-6 card">
    <TableSkeleton cols={5} rows={6} loadingLabel="Loading" />
  </div>
);

export const CardLoading = () => (
  <div className="p-6 max-w-sm">
    <CardSkeleton lines={4} loadingLabel="Loading" />
  </div>
);

export const InlineSkeleton = () => (
  <div className="p-6 space-y-2">
    <Skeleton className="h-4 w-48 block" />
    <Skeleton className="h-4 w-32 block" />
  </div>
);

export const ErrorWithRetry = () => (
  <ErrorState error={new Error("request failed (503)")} onRetry={() => {}} retryLabel="Retry" />
);

export const EmptyFirstRun = () => (
  <EmptyState
    title="No domains yet"
    hint="Verify a sending domain to start delivering."
    action={<Button kind="primary">Add domain</Button>}
  />
);

export const ActionSpinner = () => <Spinner />;
