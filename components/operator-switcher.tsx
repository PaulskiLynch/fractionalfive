"use client";

import { useFractionalFiveStore } from "@/lib/fractional-five-store";

export function OperatorSwitcher() {
  const { state, activeOperator, selectOperator } = useFractionalFiveStore();

  return (
    <label className="flex items-center gap-3 rounded-full border border-line bg-white px-4 py-2 text-sm text-muted">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em]">Operator</span>
      <select
        value={activeOperator.id}
        onChange={(event) => selectOperator(event.target.value)}
        className="bg-transparent font-semibold text-foreground outline-none"
      >
        {state.operators.map((operator) => (
          <option key={operator.id} value={operator.id}>
            {operator.profile.name}
          </option>
        ))}
      </select>
    </label>
  );
}
