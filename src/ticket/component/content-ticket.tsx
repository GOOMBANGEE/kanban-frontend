import { useEffect, useRef, useState } from "react";
import { useTicketStore } from "../ticket.store.ts";
import useUpdateTicket from "../api/update-ticket.api.ts";
import ReactQuill from "react-quill-new";
import DOMPurify from "dompurify";

export default function ContentTicket() {
  const { updateTicket } = useUpdateTicket();
  const { ticketState, setTicketState } = useTicketStore();
  const ref = useRef<ReactQuill>(null);

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

  const handleClick = () => {
    setTicketState({ updateContent: true });
  };
  useEffect(() => {
    ref.current?.focus();
  }, [ticketState.updateContent]);
  const handleBlur = () => {
    setTicketState({ updateContent: false });
  };

  const [processing, setProcessing] = useState(false);
  const handleChange = (content: string) => {
    if (content && ticketState.updateContent) {
      const newContent = content + "<p><br></p>";
      setProcessing(true);
      setTicketState({ newContent });
    }
  };

  useEffect(() => {
    if (ticketState.newContent && processing) {
      updateTicket({ content: ticketState.newContent });
      setTicketState({ newContent: undefined });
      setProcessing(false);
    }
  }, [processing]);

  return (
    <button
      onClick={handleClick}
      className={"flex h-full items-start text-start text-sm"}
    >
      <ReactQuill
        ref={ref}
        defaultValue={ticketState.content}
        onBlur={handleBlur}
        onChange={(content) => handleChange(content)}
        modules={reactQuillModules}
        placeholder={"content"}
        className={`custom-quill h-full w-full ${ticketState.updateContent ? "" : "hidden"}`}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(ticketState.content ?? ""),
        }}
        className={`${ticketState.updateContent ? "hidden" : ""}`}
      ></div>
    </button>
  );
}
