import { useState } from "react";
import { TabPanel, Tabs } from "..";

const TABS = [
  { id: "general", label: () => "General" },
  { id: "members", label: () => "Members" },
  { id: "security", label: () => "Security" },
  { id: "billing", label: () => "Billing" },
];

export const Underline = () => {
  const [active, setActive] = useState("general");
  return (
    <div className="p-6">
      <h1 className="text-[17px] font-semibold mb-5">Settings</h1>
      <Tabs tabs={TABS} active={active} onChange={setActive} label="Settings" idPrefix="story" />
      <TabPanel idPrefix="story" tab={active}>
        <p className="text-[13px] text-ink-dim">{active} panel</p>
      </TabPanel>
    </div>
  );
};
