localStorage.setItem("variable", "valor");
var variable = localStorage.getItem("variable");
// console.log(variable);

// CARROUSEL
let indice = 1;
muestraSlides(indice);

function avanzaSlide(n) {
  muestraSlides(indice += n);
}

function posicionSlide(n) {
  muestraSlides(indice = n);
}
setInterval(function tiempo() {
  muestraSlides(indice += 1)
}, 4500);

function muestraSlides(n) {
  let i;
  let slides = document.getElementsByClassName('miSlider');
  let barras = document.getElementsByClassName('barra');

  if (n > slides.length) {
    indice = 1;
  }
  if (n < 1) {
    indice = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  for (i = 0; i < barras.length; i++) {
    barras[i].className = barras[i].className.replace(" active", "");
  }
  slides[indice - 1].style.display = 'block';
  barras[indice - 1].className += ' active';
}

window.addEventListener("scroll", muestraSlides, { passive: true });

$(function () {
  $('#myButton').floatingWhatsApp({
    phone: '5493794265994',
    popupMessage: 'Hola, en que podemos ayudarte? ',
    message: "Hola, queria consultar acerca de ",
    showPopup: true,
    showOnIE: false,
    position: 'right',
    headerTitle: 'Bienveido a FOGOP!',
    headerColor: '#25D366',
    backgroundColor: 'transparent',
    buttonImage: '<img src="/img/whatsapp.svg" alt="logo de Whatsapp, Fogop contacto"/>'
  });
});

// Horarios
const holidays = [
  { date: "17/1/2023", message: "- Abre el miércoles a las 8:00" },
  { date: "18/1/2023", message: "- Abre el martes a las 8:00" },
  { date: "19/1/2023", message: "- Abre el sabado a las 8:00" }
];
const currentDate = new Date();
const currentDateString = currentDate.toLocaleDateString();
const day = currentDate.getDay();
const hour = currentDate.getHours();

let message = "";
holidays.forEach(holiday => {
  if (holiday.date === currentDateString) {
    message = holiday.message;
  }
});

if (message) {
  document.getElementById("status").innerHTML = "Cerrado";
  document.getElementById("hours").innerHTML = message;
  document.getElementById("status").classList.add("closed");
} else if (day >= 1 && day < 5) {
  if (hour >= 8 && hour < 13) {
    document.getElementById("status").innerHTML = "Abierto";
    document.getElementById("status").classList.add("open");
    document.getElementById("hours").innerHTML = "- Cierra a las 13:00";
  } else {
    document.getElementById("status").innerHTML = "Cerrado";
    document.getElementById("status").classList.add("closed");
    document.getElementById("hours").innerHTML = "- Abre mañana a las 8:00";
  }
} else if (day == 5) {
  document.getElementById("status").innerHTML = "Cerrado";
  document.getElementById("status").classList.add("closed");
  document.getElementById("hours").innerHTML = "- Abre Lunes a las 8:00";
} else if (day === 0) {
  document.getElementById("status").innerHTML = "Cerrado";
  document.getElementById("status").classList.add("closed");
  document.getElementById("hours").innerHTML = "- Abre mañana a las 8:00";
} else {
  document.getElementById("status").innerHTML = "Cerrado";
  document.getElementById("status").classList.add("closed");
  document.getElementById("hours").innerHTML = "- Abre Lunes a las 8:00";
}

// VALIDACIONES 
let forms = document.querySelector("form.reservation");
forms.addEventListener("submit", function (e) {
  let errores = [];
  let nameForm = document.querySelector("input.form-name")
  let emailForm = document.querySelector("input.form-email")
  let messageForm = document.querySelector("textarea.form-message")
  let acc = 0;

  if (nameForm.value == "") {
    errores.push('<i id="errorPush" class="material-icons">error_outline<a class="errores-push lang" key="text112">Nombre: (Por favor, completa este campo)</a></i>')
    nameForm.setAttribute("style", "border-color: red;")
    acc += 0
  } else if (nameForm.value.length < 3) {
    errores.push('<i id="errorPush" class="material-icons">error_outline<a class="errores-push lang" key="text113">Nombre: (Por favor, minimo tres caracteres)</a></i>')
    nameForm.setAttribute("style", "border-color: red;")
    acc += 0
  } else if (soloLetras(nameForm.value) === false) {
    errores.push('<i id="errorPush" class="material-icons">error_outline<a class="errores-push lang" key="text114">Nombre: (Por favor, ingresa solo letras)</a></i>')
    nameForm.setAttribute("style", "border-color: red;")
    acc += 0
  } else {
    errores.push('<i id="errorPush2" class="material-icons">check_circle<a class="errores-push lang" key="text115">Nombre valido</a></i>')
    nameForm.setAttribute("style", "border-color:green;")
    acc += 1
  }
  //EMAIL
  if (emailForm.value == "") {
    errores.push('<i id="errorPush" class="material-icons">error_outline<a class="errores-push lang" key="text116">Email: (Por favor, completa este campo)</a></i>')
    emailForm.setAttribute("style", "border-color: red;")

    acc += 0
  } else if (!validar_email(emailForm)) {
    errores.push('<i id="errorPush" class="material-icons">error_outline<a class="errores-push lang" key="text117">Email: (Por favor, ingresa un Correo valido)</a></i>')
    emailForm.setAttribute("style", "border-color: red;")
    acc += 0
  } else {
    errores.push('<i id="errorPush2" class="material-icons">check_circle<a class="errores-push lang" key="text118">Correo valido</a></i>')
    emailForm.setAttribute("style", "border-color: green;")
    acc += 1
  }
  //MENSAJE
  if (messageForm.value == "") {
    errores.push('<i id="errorPush" class="material-icons">error_outline<a class="errores-push lang" key="text119">Mensaje: (Por favor, completa este campo)</a></i>')
    messageForm.setAttribute("style", "border-color: red;")
    acc += 0
  } else {
    errores.push('<i id="errorPush2" class="material-icons">check_circle<a class="errores-push lang" key="text120">Mensaje valido</a></i>')
    messageForm.setAttribute("style", "border-color: green;")
    acc += 1
  }
  borrarErrores()
  if (acc < 3) {
    e.preventDefault()
    let ulErrores = document.querySelector("div.errores ul")
    for (let i = 0; i < errores.length; i++) {
      ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
    }
  } else {
    swal({
      title: "Gracias!",
      text: "Su mensaje a sido enviado!",
      icon: "success",
      button: "ok",
      timer: 4000
    });
  }
});
let ele = document.getElementById('parent');
function borrarErrores() {
  while (ele.lastChild) {
    ele.lastChild.remove();
  }
}
let expReg = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
let reg = /^[a-zA-ZÀ-ÿ ]+$/;
function validar_email(email) {
  return (expReg.test(email.value)) ? true : false;
}
function soloLetras(str) {
  return (reg.test(str)) ? true : false;
}

document.querySelector(".hambur-desktop").addEventListener("click", function(){
  document.querySelector(".mn-dsktop").classList.toggle("show-menu");
});

document.querySelector(".close-menu").addEventListener("click", function(){
  document.querySelector(".mn-dsktop").classList.remove("show-menu");
});

let menuOptions = document.querySelectorAll(".desktop-menu li");

menuOptions.forEach(function(option) {
  option.addEventListener("click", function(){
      document.querySelector(".mn-dsktop").classList.remove("show-menu");
  });
});

