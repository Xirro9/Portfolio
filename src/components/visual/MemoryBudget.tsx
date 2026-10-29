import { useState } from "react";

/**
 * Conceptual explainer: why a context window that "fits" on paper can still
 * fail. Units are illustrative proportions of one GPU, not measurements; the
 * caption says so. Without JavaScript the default state renders statically.
 */
const CAPACITY = 100;
const WEIGHTS = 46;
const HARNESS = 7;
const contexts = [
  { id: "modest", label: "Modest", kv: 6 },
  { id: "large", label: "Large", kv: 17 },
  { id: "headline", label: "Headline", kv: 43 },
] as const;
const slotOptions = [1, 2, 4] as const;

export function MemoryBudget() {
  const [context, setContext] = useState<(typeof contexts)[number]["id"]>("headline");
  const [slots, setSlots] = useState<(typeof slotOptions)[number]>(1);
  const kv = contexts.find((item) => item.id === context)!.kv;
  const used = WEIGHTS + HARNESS + kv * slots;
  const fits = used <= CAPACITY;
  const scale = Math.max(CAPACITY, used);
  const pct = (value: number) => `${(value / scale) * 100}%`;
  const verdict = fits
    ? context === "headline"
      ? "Fits on paper, with almost no headroom. Allocation succeeds; whether the model reasons well across all of it is a separate question."
      : "Fits, with headroom for longer prompts and tool output."
    : "Does not fit. The server reports “failed to find free space” for the KV cache, and sessions fail far below the advertised window.";
  return (
    <figure className="memory-budget" data-fits={fits}>
      <div className="mb-controls">
        <fieldset>
          <legend>Context window</legend>
          {contexts.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={context === item.id}
              onClick={() => setContext(item.id)}
            >
              {item.label}
            </button>
          ))}
        </fieldset>
        <fieldset>
          <legend>Parallel slots</legend>
          {slotOptions.map((count) => (
            <button
              key={count}
              type="button"
              aria-pressed={slots === count}
              onClick={() => setSlots(count)}
            >
              {count}
            </button>
          ))}
        </fieldset>
      </div>
      <div className="mb-track" aria-hidden="true">
        <span className="mb-capacity" style={{ left: pct(CAPACITY) }}>
          <span>GPU memory</span>
        </span>
        {!fits && (
          <span
            className="mb-overflow"
            style={{ left: pct(CAPACITY), width: pct(used - CAPACITY) }}
          />
        )}
        <span className="mb-block mb-weights" style={{ width: pct(WEIGHTS) }}>
          Weights
        </span>
        <span className="mb-block mb-harness" style={{ width: pct(HARNESS) }} title="Harness overhead" />
        {Array.from({ length: slots }, (_, index) => (
          <span
            key={index}
            className="mb-block mb-kv"
            style={{ width: pct(kv) }}
          >
            {(kv / scale) * 100 > 7 ? `KV${slots > 1 ? ` ${index + 1}` : ""}` : ""}
          </span>
        ))}
      </div>
      <dl className="mb-legend">
        <div>
          <dt className="mb-key mb-weights">Weights</dt>
          <dd>Fixed by model size and quantization.</dd>
        </div>
        <div>
          <dt className="mb-key mb-harness">Harness</dt>
          <dd>System prompt, tool schemas, skills: spent before the task starts.</dd>
        </div>
        <div>
          <dt className="mb-key mb-kv">KV cache</dt>
          <dd>Grows with context length, and again for every parallel slot.</dd>
        </div>
      </dl>
      <p className="mb-verdict" role="status">
        <strong>{fits ? "Fits" : "Overflows"}.</strong> {verdict}
      </p>
      <figcaption>
        Conceptual illustration. Proportions are illustrative, not measured on
        any machine.
      </figcaption>
    </figure>
  );
}
