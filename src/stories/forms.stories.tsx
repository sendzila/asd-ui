import { Field, Input, Select } from "..";

export const TextInput = () => (
  <div className="p-6 max-w-sm space-y-4">
    <Field label="From address" hint="Any local part at a verified domain.">
      <Input placeholder="hello@acme.com" />
    </Field>
    <Field label="Plan">
      <Select>
        <option>Free</option>
        <option>Scale</option>
      </Select>
    </Field>
  </div>
);
