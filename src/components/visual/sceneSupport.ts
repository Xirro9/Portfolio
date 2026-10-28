import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";

interface Capabilities extends Navigator {
  connection?: { saveData?: boolean };
  deviceMemory?: number;
}
const cache = new Map<string, boolean>();
const motionQuery = "(prefers-reduced-motion: reduce)";

/** Decorative scenes run only when motion, data and hardware allow it. */
function detect(kind: "webgl" | "motion") {
  if (typeof window === "undefined" || typeof matchMedia === "undefined")
    return false;
  if (matchMedia(motionQuery).matches) return false;
  const device = navigator as Capabilities;
  if (device.connection?.saveData) return false;
  if (kind === "motion") return true;
  if ((device.hardwareConcurrency ?? 8) <= 2 || (device.deviceMemory ?? 8) <= 2)
    return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
function snapshot(kind: "webgl" | "motion") {
  const key = `${kind}:${typeof matchMedia === "undefined" ? "" : matchMedia(motionQuery).matches}`;
  if (!cache.has(key)) cache.set(key, detect(kind));
  return cache.get(key)!;
}
function subscribe(update: () => void) {
  if (typeof matchMedia === "undefined") return () => {};
  const query = matchMedia(motionQuery);
  query.addEventListener("change", update);
  return () => query.removeEventListener("change", update);
}
export function useSceneSupport(kind: "webgl" | "motion") {
  return useSyncExternalStore(
    subscribe,
    () => snapshot(kind),
    () => false,
  );
}

/** Pause decorative loops while their stage is offscreen. */
export function useInView(target: RefObject<Element | null>) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const node = target.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);
  return visible;
}
