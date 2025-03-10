type ErrorMessageProps = {
  message: string | undefined;
};

export default function ErrorMessage(props: Readonly<ErrorMessageProps>) {
  return (
    <>
      {props.message ? (
        <div className={"text-sm text-red-500"}>{props.message}</div>
      ) : null}
    </>
  );
}
