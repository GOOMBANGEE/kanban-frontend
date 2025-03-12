import { useStatusStore } from "../status.store.ts";
import { useClickOutside } from "../../common/util/click-outside.ts";
import { ChangeEvent, useEffect, useRef } from "react";
import useCreateStatus from "../api/create-status.api.ts";
import ColorSelector from "./color-selector.tsx";
import GroupSelector from "./group-selector.tsx";

export default function CreateStatusModal() {
  const { createStatus } = useCreateStatus();
  const { statusState, setStatusState, resetStatusState } = useStatusStore();
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onClose = async () => {
    if (statusState.title) {
      createStatus();
      return;
    }
    resetStatusState();
  };

  useClickOutside({
    ref,
    onClose,
    enabled: statusState.create,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatusState({ title: e.target.value });
  };

  useEffect(() => {
    if (statusState.create) inputRef.current?.focus();
  }, [statusState.create]);

  return (
    <>
      {statusState.create ? (
        <div
          ref={ref}
          className={
            "bg-customBlack-600 mr-2 flex flex-col gap-y-2 rounded-sm px-2 py-2 text-sm"
          }
        >
          {/* title */}
          <div className={"px-2"}>
            <input
              ref={inputRef}
              placeholder={"Type a new option..."}
              onChange={handleChange}
              className={"mt-0.5 h-fit rounded-sm py-1 focus:ring"}
            />
          </div>

          {/* group */}
          <GroupSelector />

          {/* color */}
          <ColorSelector />
        </div>
      ) : null}
    </>
  );
}
