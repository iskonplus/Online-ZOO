const fields = document.querySelectorAll(
  ".form-group input[required], .form-group textarea[required]"
);

fields.forEach(input => {

  const validate = () => {
    input.classList.toggle("touched", input.value.trim() === "");
  };

  input.addEventListener("blur", validate);
  input.addEventListener("input", validate);

});