import { ErrorMessageProps } from "../common.type.ts";

export default function ErrorMessage(props: Readonly<ErrorMessageProps>) {
  return (
    <>
      {props.message ? (
        <div className={"text-sm text-red-500"}>{props.message}</div>
      ) : null}
    </>
  );
}
