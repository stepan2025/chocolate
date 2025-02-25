(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
    form: document.querySelector(".modal-form"),
    nameInput: document.querySelector("#user-name"),
    emailInput: document.querySelector("#user-email"),
    telInput: document.querySelector("#user-tel"),
    commentInput: document.querySelector("#user-comment"),
    policyCheckbox: document.querySelector("#policy"),
    body: document.querySelector("body"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function loadDataFromLocalStorage() {
    const storedData = JSON.parse(localStorage.getItem("formData"));
    if (storedData) {
      refs.nameInput.value = storedData.name || "";
      refs.emailInput.value = storedData.email || "";
      refs.telInput.value = storedData.tel || "";
      refs.commentInput.value = storedData.comment || "";
      refs.policyCheckbox.checked = storedData.policy || false;
    }
  }
  function showSuccessMessage(message) {
    const successMessage = document.createElement("div");
    successMessage.classList.add("success-message");
    successMessage.textContent = message;
    refs.body.appendChild(successMessage);
    setTimeout(() => {
      successMessage.classList.add("fade-out");
      setTimeout(() => {
        successMessage.remove();
      }, 500);
    }, 3000);
  }
  refs.form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = {
      name: refs.nameInput.value,
      email: refs.emailInput.value,
      tel: refs.telInput.value,
      comment: refs.commentInput.value,
      policy: refs.policyCheckbox.checked,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
    showSuccessMessage("Your data has been saved!");
    refs.form.reset();
    toggleModal();
  });
  function toggleModal() {
    refs.modal.classList.toggle("is-open");
    loadDataFromLocalStorage();
  }
})();
