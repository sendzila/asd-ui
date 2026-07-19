import { Button, CopyButton } from "..";

export const Kinds = () => (
  <div className="flex gap-3 p-6">
    <Button kind="primary">Send email</Button>
    <Button>Default</Button>
    <Button kind="danger">Delete</Button>
    <Button kind="ghost">Ghost</Button>
    <Button disabled>Disabled</Button>
  </div>
);

export const Copy = () => (
  <div className="p-6">
    <CopyButton text="sz_live_example" label="copy key" copiedLabel="copied!" />
  </div>
);
