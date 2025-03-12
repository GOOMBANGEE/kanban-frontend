import * as React from "react";
import { useEffect } from "react";

type ClickOutside = {
  ref: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  enabled: boolean;
};

export function useClickOutside({ ref, onClose, enabled }: ClickOutside) {
  useEffect(() => {
    if (!enabled) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClose, enabled]);
}
