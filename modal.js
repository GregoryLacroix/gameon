function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}      

// DOM Elements
const modalBody = document.querySelector('.modal-body');
const modalbg = document.querySelector(".bground");
const modalButton = document.querySelector(".modal-btn");
const formData = document.querySelector(".formData");
const modalArrowClose = document.querySelector(".close");
const modalForm = document.querySelector("#reserve");
const inputFirstName = document.querySelector("#first");
const inputLastName = document.querySelector("#last");
const inputEmail = document.querySelector("#email");
const inputBirthdate = document.querySelector("#birthdate");
const inputQuantity = document.querySelector("#quantity");
const checkboxAgreeTerms = document.querySelector("#checkbox1");
const checkboxAgreeTermsIcone = document.querySelector("#checkbox-icon-agree-terms");
const checkboxLocation = document.querySelectorAll('.checkbox__location');
const bodyFinalInscription = document.querySelector('.body__final__inscription');
const modalButtonClose = document.querySelector('.btn-close');

// message erreurs
const MESSAGE_ERROR = {
  firstName: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  lastName: "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
  email: "Veuillez saisir une adresse mail valide.",
  birthdate: "Veuillez saisir une date de naissance.",
  quantity: "Veuillez saisir une quantité valide.",
  agreeTerms: "Vous devez accepter les conditions d'utilisation.",
  location: "Vous devez choisir une option."
}

// css errors
const borderError = "2px solid #FF4E60";

// Regex Email
const regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

// Injection des messages d'erreurs
const labelFirstName = document.querySelector('.error__first__name');
const labelLastName = document.querySelector('.error__last__name');
const labelEmail = document.querySelector('.error__email');
const labelBirthdate = document.querySelector('.error__birthdate');
const labelQuantity = document.querySelector('.error__quantity');
const labelAgreeTerms = document.querySelector('.error__agree__terms');
const labelLocation = document.querySelector('.error__location');

// launch modal event
// modalButton.forEach((btn) => btn.addEventListener("click", launchModal));
modalButton.addEventListener("click", launchModal);
modalArrowClose.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.classList.remove('modalclose');
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.classList.add('modalclose');
  bodyFinalInscription.classList.remove('body__modal__open');
  setTimeout(function() {
    modalBody.classList.remove('body__modal__close');
  }, 1000);
}

function textFieldEnteredHandler(input, label, message, border, error) {
  input.style.border = "none";
  label.innerHTML = "";
  if(input.value.length == 0 || input.value.length <= 2){
    label.innerHTML = message;
    input.style.border = border;
    error = error;
  }
}

function customCssInit(label, input = null) {
  if(input != null)
    input.style.border = "none";

  label.innerHTML = "";
}

// Contrôle des données saisie dans le formulaire d'inscription
modalForm.addEventListener("submit", submitFormModal);
function submitFormModal(event) {
  event.preventDefault();

  let error = false;

  // Contrôle de la validité du prénom
  textFieldEnteredHandler(inputFirstName, labelFirstName, MESSAGE_ERROR.firstName, borderError, true);

  // Contrôle de la validité du nom
  textFieldEnteredHandler(inputLastName, labelLastName, MESSAGE_ERROR.lastName, borderError, true);

  // Contrôle de la validité de l'adresse Email
  customCssInit(labelEmail, inputEmail);
  if (!regexEmail.test(inputEmail.value)) {
    labelEmail.innerHTML = MESSAGE_ERROR.email;
    inputEmail.style.border = borderError;
    error = true;
  }

  // Contrôle de la validité de la date de naissance
  customCssInit(labelBirthdate, inputBirthdate);
  if(inputBirthdate.value.length == 0){
    labelBirthdate.innerHTML = MESSAGE_ERROR.birthdate;
    inputBirthdate.style.border = borderError;
    error = true;
  }

  // Contrôle de la validité du nombre de tournoi
  customCssInit(labelQuantity, inputQuantity);
  if(inputQuantity.value.length == 0 || (typeof(inputQuantity.value) != 'number' && isNaN(inputQuantity.value))){
    labelQuantity.innerHTML = MESSAGE_ERROR.quantity;
    inputQuantity.style.border = borderError;
    error = true;
  }

  // Contrôle de la validation des conditions d'utilisation
  customCssInit(labelAgreeTerms, checkboxAgreeTermsIcone);
  if(!checkboxAgreeTerms.checked){
    labelAgreeTerms.innerHTML = MESSAGE_ERROR.agreeTerms;
    checkboxAgreeTermsIcone.style.border = borderError;
    error = true;
  }
  
  // Contrôle de saisie de checkbox pour le lieu du tournoi
  var array = []
  checkboxLocation.forEach(function (item) {
    let checked = false;
    if(item.checked){
      checked = true;
    }
    array.push(checked);
  });
  const result = array.some((elem) => elem == true);

  customCssInit(labelLocation);
  if(result == false){
    labelLocation.innerHTML = MESSAGE_ERROR.location;
    error = true;
  }

  // Validation du formulaire si tout les champs sont correctement rempli
  if(error == false){
    bodyFinalInscription.classList.add('body__modal__open');
    modalBody.classList.add('body__modal__close');
    modalButtonClose.addEventListener("click", closeModal);
    modalForm.reset();
  }
}



