import { useEffect, useRef } from "react";
import { useTicketStore } from "../ticket.store.ts";
import useUpdateTicket from "../api/update-ticket.api.ts";
import ReactQuill from "react-quill-new";

export default function ContentTicket() {
  const { updateTicket } = useUpdateTicket();
  const { ticketState, setTicketState } = useTicketStore();
  const ref = useRef<ReactQuill>(null);
  const stateRef = useRef<string | undefined>(undefined);

  // react-quill setting
  const reactQuillModules = {
    toolbar: {
      container: [
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline"],
        ["link", "image"],
      ],
    },
  };

  const handleClickContent = () => {
    setTicketState({ updateContent: true });
  };
  const handleChangeContent = (content: string) => {
    setTicketState({ newContent: content });
  };
  useEffect(() => {
    if (ticketState.newContent !== stateRef.current) {
      updateTicket({ content: ticketState.newContent });
      stateRef.current = ticketState.newContent;
      setTicketState({ newContent: undefined });
    }
  }, [ticketState.newContent]);

  useEffect(() => {
    if (ticketState.updateContent) {
      ref.current?.focus();
      stateRef.current = ticketState.content;
    }
  }, [ticketState.updateContent]);

  return (
    <button
      onClick={handleClickContent}
      className={"flex h-full items-start text-start text-sm"}
    >
      <ReactQuill
        ref={ref}
        defaultValue={ticketState.content}
        onChange={(content) => handleChangeContent(content)}
        modules={reactQuillModules}
        placeholder={"content"}
        className={"custom-quill h-full w-full"}
      />
    </button>
  );
}
