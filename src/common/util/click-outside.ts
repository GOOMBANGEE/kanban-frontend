import { useEffect } from "react";
import { ClickOutside } from "../common.type.ts";

export function useClickOutside({ ref, onClose, enabled }: ClickOutside) {
  useEffect(() => {
    if (!enabled) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose, enabled]);
}
