import { useEnvStore } from "../../common/store/env.store.ts";
import axios from "axios";
import { useGlobalStore } from "../../common/store/global.store.ts";
import { useBoardStore } from "../board.store.ts";

type FetchBoardList = {
  page: number;
};

export default function useFetchBoardList() {
  const { setBoardListState } = useBoardStore();
  const { envState } = useEnvStore();
  const { setGlobalState } = useGlobalStore();

  const fetchBoardList = async (props: Readonly<FetchBoardList>) => {
    const boardUrl = envState.boardUrl;
    try {
      const response = await axios.get(`${boardUrl}?page=${props.page}`);

      setGlobalState({ loading: false });
      setBoardListState(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return { fetchBoardList };
}
