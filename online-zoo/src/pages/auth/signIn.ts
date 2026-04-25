import { initHandlerBtns } from "../../utils/handlerBtns";
import { initPageSignInField } from "../../utils/initPageField";
import { initRegisteredUser } from "../../utils/initUser";
import { signInUser } from "./authService";

document.addEventListener("DOMContentLoaded", (): void => {
   initHandlerBtns();
   initPageSignInField();
   signInUser();
   initRegisteredUser();
});
   