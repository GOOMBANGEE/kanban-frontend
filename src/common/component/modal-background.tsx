import * as React from "react";
import { useRef } from "react";
import { useClickOutside } from "../util/click-outside.ts";

type Props = {
  onClose: () => void;
  enabled: boolean;
  children: React.ReactNode;
};

export default function ModalBackground({
  onClose,
  enabled,
  children,
}: Readonly<Props>) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside({ ref, onClose, enabled });

  return (
    <div
      style={{ zIndex: 11 }}
      className={"fixed inset-0 flex h-full w-full items-center justify-center"}
    >
      <div
        ref={ref}
        className={"bg-customBlack-400 fixed inset-0 h-full w-full opacity-70"}
      ></div>
      <div className={"absolute z-20"}>{children}</div>
    </div>
  );
}
