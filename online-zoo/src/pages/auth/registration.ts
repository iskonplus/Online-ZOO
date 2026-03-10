import { initHandlerBtns } from "../../utils/handlerBtns";
import { initPageRegistrationField } from "../../utils/initPageField";
import { registerUser} from "./authService";


document.addEventListener("DOMContentLoaded", (): void => {
  initHandlerBtns();
  initPageRegistrationField();
  registerUser();

});




