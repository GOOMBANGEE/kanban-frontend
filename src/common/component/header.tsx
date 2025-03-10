import { useNavigate } from "react-router-dom";
import { useTokenStore } from "../store/token.store.ts";
import { useUserStore } from "../../user/user.store.ts";
import SettingUser from "../../user/component/setting-user.tsx";
import DeleteUser from "../../user/component/delete-user.tsx";

export default function Header() {
  const { setUserState } = useUserStore();
  const { tokenState } = useTokenStore();
  const navigate = useNavigate();

  const handleClickHomeIcon = () => {
    navigate("/");
    window.location.reload();
  };

  const handleClickUserIcon = () => {
    if (tokenState.accessToken) {
      setUserState({ settingUser: true });
      return;
    }
    setUserState({ loginModal: true });
  };

  return (
    <div
      className={
        "border-customBlack-700 flex h-14 w-full items-center border-b-2 p-2"
      }
    >
      <SettingUser />
      <DeleteUser />

      <button
        className={"mr-auto cursor-pointer"}
        onClick={handleClickHomeIcon}
      >
        <svg
          width="32px"
          height="32px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M5 9.77746V16.2C5 17.8802 5 18.7203 5.32698 19.362C5.6146 19.9265 6.07354 20.3854 6.63803 20.673C7.27976 21 8.11984 21 9.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7203 19 17.8802 19 16.2V5.00002M21 12L15.5668 5.96399C14.3311 4.59122 13.7133 3.90484 12.9856 3.65144C12.3466 3.42888 11.651 3.42893 11.0119 3.65159C10.2843 3.90509 9.66661 4.59157 8.43114 5.96452L3 12M14 21V15H10V21"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </svg>
      </button>

      <button
        className={"ml-auto cursor-pointer"}
        onClick={handleClickUserIcon}
      >
        <svg
          width="32px"
          height="32px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke=""
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </svg>
      </button>
    </div>
  );
}
