import * as React from "react";
import { screens } from "./screens";

export function App() {
  const [selectedId, setSelectedId] = React.useState(screens[0]?.id ?? "");
  const selected = screens.find((s) => s.id === selectedId);
  const Component = selected?.Component;

  return (
    <div className="min-h-screen bg-layer-level-0 text-onLayer-primary">
      <div className="mx-auto max-w-5xl p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-lg font-semibold">Reference web</div>
            <div className="text-sm text-onLayer-secondary">
              Replicated screens are web-only reference for your RN implementation.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-onLayer-secondary">Screen</label>
            <select
              className="h-9 rounded-[12px] border border-border bg-layer-level-1 px-3 text-sm text-onLayer-primary"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              {screens.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.id}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 rounded-[18px] border border-border bg-layer-level-1 p-4">
          {Component ? <Component /> : <div className="text-sm text-onLayer-secondary">No screen selected.</div>}
        </div>
      </div>
    </div>
  );
}
