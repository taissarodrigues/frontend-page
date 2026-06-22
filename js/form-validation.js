// configuracao  da validacao do formulario de inscricao.
const form = document.querySelector("#registrationForm");
const successMessage = document.querySelector("#formSuccess");

const fields = [
  { id: "name", label: "Nome", validator: nameIsValid },
  { id: "email", label: "E-mail", validator: emailIsValid },
  { id: "age", label: "Idade", validator: ageIsValid },
  { id: "altura", label: "Altura", validator: heightIsValid },
  { id: "peso", label: "Peso", validator: weightIsValid },
  { id: "dia-nascimento", label: "Dia do nascimento", validator: birthDateIsValid },
  { id: "tipo-sanguineo", label: "Tipo sanguineo", validator: bloodTypeIsValid },
  { id: "local-nascimento", label: "Local de nascimento", validator: textIsValid },
  { id: "local-treinamento", label: "Local de treinamento", validator: textIsValid },
];

const errorIcon = '<i class="formulario__error-icon fa-solid fa-circle-exclamation" aria-hidden="true"></i>';

// Valida um campo, atualiza a mensagem de erro e aplica classes visuais.
function validateField(field) {
  const input = document.getElementById(field.id);
  const inputField = input.closest(".formulario__field");
  const inputValue = input.value.trim();
  const errorMessage = inputField.querySelector(".formulario__error");

  errorMessage.innerHTML = "";
  inputField.classList.remove("formulario__field--invalid", "formulario__field--valid");

  const fieldValidator = field.validator(inputValue, field.label);

  if (!fieldValidator.isValid) {
    errorMessage.innerHTML = `${fieldValidator.errorMessage}${errorIcon}`;
    input.setAttribute("aria-invalid", "true");
    inputField.classList.add("formulario__field--invalid");
    return false;
  }

  input.setAttribute("aria-invalid", "false");
  inputField.classList.add("formulario__field--valid");
  return true;
}

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let isFormValidAll = true;

    fields.forEach(function (field) {
      const isValid = validateField(field);

      if (!isValid) {
        isFormValidAll = false;
      }
    });

    if (isFormValidAll) {
      successMessage.textContent = "Formulario enviado com sucesso!";
      this.reset();

      fields.forEach(function (field) {
        const input = document.getElementById(field.id);
        input.setAttribute("aria-invalid", "false");
        input.closest(".formulario__field").classList.remove("formulario__field--valid");
      });
    } else {
      successMessage.textContent = "";
    }
  });

  fields.forEach(function (field) {
    const input = document.getElementById(field.id);

    input.addEventListener("input", function () {
      successMessage.textContent = "";
      validateField(field);
    });
  });
}

function isEmpty(value) {
  return value === "";
}

function createValidator() {
  return {
    isValid: true,
    errorMessage: null,
  };
}

function nameIsValid(value, label) {
  const validator = createValidator();

  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = `${label} nao pode ficar vazio`;
    return validator;
  }

  const minLength = 3;

  if (value.length < minLength) {
    validator.isValid = false;
    validator.errorMessage = `${label} deve ter pelo menos ${minLength} caracteres`;
    return validator;
  }

  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

  if (!nameRegex.test(value)) {
    validator.isValid = false;
    validator.errorMessage = `${label} deve conter apenas letras`;
    return validator;
  }

  return validator;
}

function emailIsValid(value) {
  const validator = createValidator();

  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = "E-mail nao pode ficar vazio";
    return validator;
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(value)) {
    validator.isValid = false;
    validator.errorMessage = "Digite um e-mail valido";
    return validator;
  }

  return validator;
}

function ageIsValid(value, label) {
  return numberIsValid(value, label, 16, 100);
}

function heightIsValid(value, label) {
  const validator = createValidator();
  const normalizedValue = value.replace(",", ".");
  const meterFormatRegex = /^\d\.\d{1,2}$/;
  const centimeterFormatRegex = /^\d{2,3}$/;

  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = `${label} nao pode ficar vazio`;
    return validator;
  }

  if (!meterFormatRegex.test(normalizedValue) && !centimeterFormatRegex.test(value)) {
    validator.isValid = false;
    validator.errorMessage = "Digite a altura como 1,70 ou 170";
    return validator;
  }

  const heightValue = Number(normalizedValue);
  const heightInCentimeters = meterFormatRegex.test(normalizedValue)
    ? heightValue * 100
    : Number(value);

  if (heightInCentimeters < 50 || heightInCentimeters > 250) {
    validator.isValid = false;
    validator.errorMessage = `${label} deve estar entre 0,50m e 2,50m`;
    return validator;
  }

  return validator;
}

function weightIsValid(value, label) {
  return numberIsValid(value, label, 20, 300);
}

function numberIsValid(value, label, min, max) {
  const validator = createValidator();
  const numberValue = Number(value);

  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = `${label} nao pode ficar vazio`;
    return validator;
  }

  if (!Number.isFinite(numberValue)) {
    validator.isValid = false;
    validator.errorMessage = `${label} deve ser um numero valido`;
    return validator;
  }

  if (numberValue < min || numberValue > max) {
    validator.isValid = false;
    validator.errorMessage = `${label} deve estar entre ${min} e ${max}`;
    return validator;
  }

  return validator;
}

function birthDateIsValid(value, label) {
  const validator = createValidator();

  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = `${label} nao pode ficar vazio`;
    return validator;
  }

  const date = new Date(value);
  const today = new Date();

  if (Number.isNaN(date.getTime()) || date > today) {
    validator.isValid = false;
    validator.errorMessage = "Digite uma data de nascimento valida";
    return validator;
  }

  return validator;
}

function bloodTypeIsValid(value, label) {
  const validator = createValidator();

  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = `${label} nao pode ficar vazio`;
    return validator;
  }

  const bloodTypeRegex = /^(A|B|AB|O)[+-]$/i;

  if (!bloodTypeRegex.test(value)) {
    validator.isValid = false;
    validator.errorMessage = "Use um tipo sanguineo valido, como A+, O- ou AB+";
    return validator;
  }

  return validator;
}

function textIsValid(value, label) {
  const validator = createValidator();

  if (isEmpty(value)) {
    validator.isValid = false;
    validator.errorMessage = `${label} nao pode ficar vazio`;
    return validator;
  }

  const minLength = 3;

  if (value.length < minLength) {
    validator.isValid = false;
    validator.errorMessage = `${label} deve ter pelo menos ${minLength} caracteres`;
    return validator;
  }

  return validator;
}
