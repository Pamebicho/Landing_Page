// Scroll suave a secciones internas
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");
    if (targetId && targetId !== "#") {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        event.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

// Validación del formulario de inscripción
const form = document.getElementById("inscriptionForm");
const formMessage = document.getElementById("formMessage");

if (form && formMessage) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add("was-validated");
      formMessage.textContent = "Por favor revisa los campos marcados en rojo.";
      formMessage.className = "mt-3 small text-danger";
      return;
    }

    form.classList.remove("was-validated");
    form.reset();

    formMessage.textContent =
      "¡Gracias! Recibimos los datos de tu colegio. Te contactaremos por correo.";
    formMessage.className = "mt-3 small text-success";
  });
}

// CUENTA REGRESIVA CAMPEONATO
// FECHA Y HORA DE INICIO DEL CAMPEONATO
const championshipStart = new Date("2025-11-28T09:00:00-03:00").getTime();

const cdDays = document.getElementById("cd-days");
const cdHours = document.getElementById("cd-hours");
const cdMinutes = document.getElementById("cd-minutes");
const cdSeconds = document.getElementById("cd-seconds");
const cdMessage = document.getElementById("cd-message");

if (cdDays && cdHours && cdMinutes && cdSeconds) {
  function updateCountdown() {
    const now = new Date().getTime();
    const diff = championshipStart - now;

    // Si ya llegó el día
    if (diff <= 0) {
      cdDays.textContent = "00";
      cdHours.textContent = "00";
      cdMinutes.textContent = "00";
      cdSeconds.textContent = "00";

      if (cdMessage) {
        cdMessage.textContent = "¡El campeonato ha comenzado!";
      }

      clearInterval(countdownInterval);
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);

    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    cdDays.textContent = String(days).padStart(2, "0");
    cdHours.textContent = String(hours).padStart(2, "0");
    cdMinutes.textContent = String(minutes).padStart(2, "0");
    cdSeconds.textContent = String(seconds).padStart(2, "0");
  }

  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown(); // primera ejecución inmediata
}
