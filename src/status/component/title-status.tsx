import { ChangeEvent, useEffect, useRef } from "react";
import { useStatusStore } from "../status.store.ts";
import useUpdateStatus from "../api/update-status.api.ts";

export default function TitleStatus() {
  const { updateStatus } = useUpdateStatus();
  const { statusState, setStatusState } = useStatusStore();
  const ref = useRef<HTMLInputElement>(null);
  const stateRef = useRef<string>(statusState.title);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatusState({ title: e.target.value });
    if (e.target.value !== stateRef.current) {
      updateStatus({ title: e.target.value });
      stateRef.current = e.target.value;
    }
  };

  useEffect(() => {
    if (statusState.setting) {
      ref.current?.focus();
    }
  }, [statusState.setting]);

  return (
    <div className={"px-2"}>
      <input
        ref={ref}
        value={statusState.title ?? ""}
        placeholder={"Type a new option..."}
        onChange={handleChange}
        className={
          "mt-0.5 mb-2 h-fit rounded-sm py-1 outline-hidden focus:ring-0"
        }
      />
    </div>
  );
}
