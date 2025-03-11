import { useBoardStore } from "../board.store.ts";

export default function useTitleRegexBoard() {
  const { boardState, setBoardState } = useBoardStore();

  const titleRegex = () => {
    const regex = /^(?=.*[a-zA-Z0-9]).{2,20}$/.test(
      boardState.title ? boardState.title : "",
    );
    if (regex) {
      return true;
    } else {
      setBoardState({
        titleErrorMessage: "제목은 2~20자로 설정해주세요",
      });
      return false;
    }
  };

  return { titleRegex };
}
