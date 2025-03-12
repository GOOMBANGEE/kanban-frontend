import * as React from "react";
import { useClickOutside } from "../util/click-outside.ts";

type Props = {
  ref: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  enabled: boolean;
  children: React.ReactNode;
};

export default function ModalBackground({
  ref,
  onClose,
  enabled,
  children,
}: Readonly<Props>) {
  useClickOutside({ ref, onClose, enabled });

  return (
    <div
      style={{ zIndex: 11 }}
      className={"fixed inset-0 flex h-full w-full items-center justify-center"}
    >
      <div
        className={"bg-customBlack-400 fixed inset-0 h-full w-full opacity-70"}
      ></div>
      <div className={"absolute z-20"}>{children}</div>
    </div>
  );
}
