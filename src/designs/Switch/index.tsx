import React, { useState } from "react";
import { Switch } from "@headlessui/react";

interface ISwitchUI {
  value?: boolean;
}

const SwitchUI: React.FC<ISwitchUI> = ({ value = false }) => {
  const [enabled, setEnabled] = useState(value);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? "bg-primary-1" : "bg-neutral-3"
      } relative inline-flex items-center h-2.5 rounded-full w-4.5 transition-colors`}
    >
      <span
        className={`${
          enabled ? "translate-x-2.5" : "translate-x-0.5"
        } inline-block w-1.5 h-1.5 transform bg-primary-3 rounded-full transition-transform`}
      />
    </Switch>
  );
};

export default SwitchUI;
