import { initHandlerBtns } from "../../utils/handlerBtns";
import { initPageRegistrationField } from "../../utils/initPageField";
import { initRegisteredUser } from "../../utils/initUser";
import { registerUser} from "./authService";


document.addEventListener("DOMContentLoaded", (): void => {
  initHandlerBtns();
  initPageRegistrationField();
  registerUser();
  initRegisteredUser();

});




