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
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalBtnClose = document.querySelectorAll(".close");
const form = document.getElementById("reserve");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const agreeTerms = document.getElementById("checkbox1");
const agreeTermsIcone = document.getElementById("checkbox-icon-agree-terms");
const checkboxLocation = document.querySelectorAll('.checkbox__location');
const bodyFinalInscription = document.querySelector('.body__final__inscription');
const btnClose = document.querySelectorAll('.btn-close');

// message erreurs - css errors
const messageErrorFirstName = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
const messageErrorLastName = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
const messageErrorEmail = "Veuillez saisir une adresse mail valide.";
const messageErrorBirthdate = "Veuillez saisir une date de naissance.";
const messageErrorQuantity = "Veuillez saisir une quantité valide.";
const messageErrorMaxQuantity = "Veuillez saisir une quantité comprise entre 0 et 99.";
const messageErrorAgreeTerms = "Vous devez accepter les conditions d'utilisation.";
const messageErrorLocation = "Vous devez choisir une option.";
const borderError = "2px solid #FF4E60";

// Regex Email
const regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

// Injection des messages d'erreurs
const errorFirstName = document.querySelector('.error__first__name');
const errorLastName = document.querySelector('.error__last__name');
const errorEmail = document.querySelector('.error__email');
const errorBirthdate = document.querySelector('.error__birthdate');
const errorQuantity = document.querySelector('.error__quantity');
const errorAgreeTerms = document.querySelector('.error__agree__terms');
const errorLocation = document.querySelector('.error__location');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalBtnClose.forEach((btn) => btn.addEventListener("click", closeModal));

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

// Contrôle des données saisie dans le formulaire d'inscription
form.addEventListener("submit", submitFormModal);
function submitFormModal(event) {
  event.preventDefault();

  // Contrôle de la validité du prénom
  firstName.style.border = "none";
  errorFirstName.innerHTML = "";
  if(firstName.value.length == 0 || firstName.value.length <= 2){
    errorFirstName.innerHTML = messageErrorFirstName;
    firstName.style.border = borderError;
    var error = true;
  }

  // Contrôle de la validité du nom
  lastName.style.border = "none";
  errorLastName.innerHTML = "";
  if(lastName.value.length == 0 || lastName.value.length <= 2){
    errorLastName.innerHTML = messageErrorLastName;
    lastName.style.border = borderError;
    var error = true;
  }

  // Contrôle de la validité de l'adresse Email
  email.style.border = "none";
  errorEmail.innerHTML = "";
  if (!regexEmail.test(email.value)) {
    errorEmail.innerHTML = messageErrorEmail;
    email.style.border = borderError;
    var error = true;
  }

  // Contrôle de la validité de la date de naissance
  birthdate.style.border = "none";
  errorBirthdate.innerHTML = "";
  if(birthdate.value.length == 0){
    errorBirthdate.innerHTML = messageErrorBirthdate;
    birthdate.style.border = borderError;
    var error = true;
  }

  // Contrôle de la validité du nombre de tournoi
  quantity.style.border = "none";
  errorQuantity.innerHTML = "";
  if(quantity.value.length == 0 || (typeof(quantity.value) != 'number' && isNaN(quantity.value))){
    errorQuantity.innerHTML = messageErrorQuantity;
    quantity.style.border = borderError;
    var error = true;
  }else if(quantity.value > 100){
    errorQuantity.innerHTML = messageErrorMaxQuantity;
    quantity.style.border = borderError;
    var error = true;
  }

  // Contrôle de la validation des conditions d'utilisation
  agreeTermsIcone.style.border = "none";
  errorAgreeTerms.innerHTML = "";
  if(!agreeTerms.checked){
    errorAgreeTerms.innerHTML = messageErrorAgreeTerms;
    agreeTermsIcone.style.border = borderError;
    var error = true;
  }
  
  // Contrôle de saisie de checkbox pour le lieu du tournoi
  let total = 0;
  checkboxLocation.forEach(function (item) {
    if(item.checked){
      total += total + 1;
    }
  });

  errorLocation.innerHTML = "";
  if(total == 0){
    errorLocation.innerHTML = messageErrorLocation;
    var error = true;
  }

  // Validation du formulaire si tout les champs sont correctement rempli
  if(!error){
    bodyFinalInscription.classList.add('body__modal__open');
    modalBody.classList.add('body__modal__close');
    btnClose.forEach((btn) => btn.addEventListener("click", closeModal));
    form.reset();
  }
}



