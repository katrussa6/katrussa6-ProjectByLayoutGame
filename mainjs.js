const citySelect = document.querySelector("#citySelect");
const openModalButton = document.getElementById("openModalButton");
const closeModalButton = document.getElementById("closeModalButton");
const modal = document.getElementById("modal");
const loginForm = document.getElementById("loginForm");
const labelName = document.getElementById("labelName");
const showPassword = document.getElementById("button-show-password");
const passwordInput = document.getElementById("show-password-input");
const openRegModalButton = document.getElementById('openRegModalButton');
const closeRegModalButton = document.getElementById('closeRegModalButton');
const modalReg = document.getElementById('modalReg');
const loginRegForm = document.getElementById('loginRegForm');
const labelRegName = document.getElementById('labelRegName');
const showRegPassword = document.getElementById('button-reg-show-password');
const passwordRegInput = document.getElementById('show-reg-password-input');

//модальное окно регистрации

const isPersonsIsstorage = !!localStorage.getItem('persons')

if(!isPersonsIsstorage){
    localStorage.setItem('persons', JSON.stringify([ ]))
}

labelName.addEventListener('click', () => {
    loginForm.elements.login.focus()
    loginForm.elements.password.addEventListener('focus', () => {
        console.log(
            'Мы сфокусировались на пароле')
    }
    )

})

openModalButton.addEventListener('click', function () {
  modal.style.display = 'block'
});

closeModalButton.addEventListener('click', function () {
  modal.style.display = 'none'
});

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const login = this.querySelector('[name="login"]').value
  const password = this.querySelector('[name="password"]').value
  const localPersonArr = JSON.parse(localStorage.getItem('persons'))
  const user = localPersonArr.find(person => person.name === login);


  if (!user) {
      alert('Не удалось найти пользователя')
      this.reset(); //сброс-закрытие модального окна
  }
  else if (user.password === password) {
      alert(`Добро пожаловать, ${user.name}!`)
      modal.style.display = 'none'
      this.reset();

  }
  else {
      alert('Пароль неверный!')
      this.querySelector('[name="password"]').value = ''

  }

});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
      modal.style.display = 'none'
  }
});
loginForm.elements.password.addEventListener('input', function () {

  const field = this
  const errorMessage = document.getElementById('password-error')
  console.log(errorMessage)
  console.log(field)
  const regex = /^[a-zA-Z0-9]*$/; //разрешить английские буквы и цифры, регулярки генерятся ИИ
  // console.log('test', !regex.test(field.value))
  if (!regex.test(field.value)) {
      console.log('Строка до среза', field.value);
      errorMessage.textContent = 'Ой, тут ошибочка, недопустимый символ!';
      field.value = field.value.slice(0, -1);
      field.classList.add('errorField')
      // field.blur()   // pacфокусировка
      console.log('Строка после среза', field.value)
  } else {
      errorMessage.textContent = ''
      field.classList.remove('errorField')
  }

});

showPassword.addEventListener('click', function () {
  console.log('click');
  const btn = this
  const passwordField = loginForm.elements.password

  switch (btn.value) {
      case 'Показать пароль': {
          btn.value = 'Скрыть пароль'
          passwordField.type = 'text'
          break
      }
      case 'Скрыть пароль': {
          btn.value = 'Показать пароль'
          passwordField.type = 'password'
      }
  }


});
/////
labelRegName.addEventListener('click', () => {
  loginRegForm.elements.loginReg.focus()
  loginRegForm.elements.passwordReg.addEventListener('focus', () => {
      console.log(
          'Мы сфокусировались на пароле')
  }
  )
})

openRegModalButton.addEventListener('click', function () {
  modalReg.style.display = 'block'
});

closeRegModalButton.addEventListener('click', function () {
  modalReg.style.display = 'none'
});
loginRegForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const login = this.querySelector('[name="loginReg"]').value
  const password = this.querySelector('[name="passwordReg"]').value
  const confirmPassword = this.querySelector('[name="confirmPassword"]').value

  const localPersonsArr = JSON.parse(localStorage.getItem('persons'))

  const user = localPersonsArr.find(person => person.name === login);

  if (user) {
      alert("Пользователь с таким логином уже существует!");
      return;
  }
  if (password === confirmPassword) {
  localPersonsArr.push({ name: login, password: password });
  localStorage.setItem('persons',JSON.stringify(localPersonsArr))

      alert('Пароли совпадают, регистрация успешна!')
      this.reset(); //сброс-закрытие модального окна
  
  }
  else {
      alert('Пароли не совпадают, проверьте!')
      this.querySelector('[name="password"]').value = ''

  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
      modal.style.display = 'none'
  }

});
loginRegForm.elements.passwordReg.addEventListener('input', function () {

  const field = this
  const errorMessage = document.getElementById('password-reg-error')
  console.log(errorMessage)
  console.log(field)
  const regex = /^[a-zA-Z0-9]*$/; //разрешить английские буквы и цифры, регулярки генерятся ИИ
  // console.log('test', !regex.test(field.value))
 
  if (!regex.test(field.value)) {
      // console.log('Строка до среза', field.value);
      errorMessage.textContent = 'Ой, тут ошибочка, недопустимый символ!';
      field.value = field.value.slice(0, -1);
      field.classList.add('errorField')
      // field.blur()   // pacфокусировка
      // console.log('Строка после среза', field.value)
  } else {
      errorMessage.textContent = ''
      field.classList.remove('errorField')
  }

});

showRegPassword.addEventListener('click', function () {
  console.log('click');
  const btn = this
  const passwordField = loginRegForm.elements.passwordReg

  switch (btn.value) {
      case 'Показать пароль': {
          btn.value = 'Скрыть пароль'
          passwordField.type = 'text'
          break
      }
      case 'Скрыть пароль': {
          btn.value = 'Показать пароль'
          passwordField.type = 'password'
      }
  }

});

//Модальное окно закончилось



labelName.addEventListener("click", () => {
  loginForm.elements.login.focus();
});

loginForm.addEventListener("blur", () => {
  loginForm.elements.login.focus();
});

const cities = [
  { value: "msk", name: "Москва" },
  { value: "spb", name: "Санкт-Петербург" },
  { value: "rnd", name: "Ростов-На-Дону" },
];

console.log(citySelect);

console.log("cities instance: ", cities instanceof Array);
try {
  cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city.value;
    option.textContent = city.name;

    const isHtml = citySelect instanceof HTMLElement;
    const citytype = typeof citySelect;
    console.log("citytype: ", citytype);
    console.log("isHtml: ", isHtml);
    console.log("citySelect: ", citySelect);

    if (isHtml) {
      citySelect.appendChild(option);
    }
  });
} catch (error) {
  console.log("ОШИБКА ААААА СИТИСЛЕКТ!!!!", error);
}

const persons = [
  { name: "Иван", password: "123" },
  { name: "Ярослав", password: "1234" },
  { name: "Виктор", password: "12345" },
];

openModalButton.addEventListener("click", function () {
  modal.style.display = "block";
});
closeModalButton.addEventListener("click", function () {
  modal.style.display = "none";
});

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const login = this.querySelector('[name="login"]').value;
  const password = this.querySelector('[name="password"]').value;
  const isPasswordWrong = checkPassword(password);
  const user = persons.find((person) => person.name === login);
  console.log("sdkfjlfksd", user);
  if (!user) {
    alert(`Не удалось найти пользователя!`);
    this.reset();
  } else if (isPasswordWrong) {
    console.log("wrong password");
  } else if (user.password === password) {
    alert(`Добро пожаловать,${user.name} !`);
    modal.style.display = "none";
  } else {
    alert("Пароль не верный");
    this.reset();
  }
});

loginForm.addEventListener("keydown", (event) => {
  if (event.key === "Escape") modal.style.display = "none";
});

const validation = /[! #^&*+@()-+]/g;

function checkPassword(value) {
  const isWarningValidatioon = value.match(validation);
  if (isWarningValidatioon) {
    alert("По ле должно содержать английские буквы и цифры");
    return true;
  }

  return false;
}
function myFunction() {
  var x = document.getElementById("passwordinput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
