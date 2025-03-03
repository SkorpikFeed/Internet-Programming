document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formPage");
  const savedDataContainer = document.getElementById("savedData");

  // Функція для завантаження збережених даних
  function loadSavedData() {
    const saved = localStorage.getItem("formData");
    if (saved) {
      const data = JSON.parse(saved);
      displaySavedData(data);
    }
  }

  // Функція для відображення збережених даних
  function displaySavedData(data) {
    savedDataContainer.innerHTML = `
            <p><strong>Ім'я:</strong> ${data.name}</p>
            <p><strong>Прізвище:</strong> ${data.surname}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Вік:</strong> ${data.age}</p>
            <p><strong>Стать:</strong> ${data.gender}</p>
            <p><strong>Вправи:</strong> ${getSelectedOptions(
              data.exercises
            )}</p>
            <p><strong>Кардіо:</strong> ${getSelectedOptions(data.cardio)}</p>
            <p><strong>Спортивні активності:</strong> ${getSelectedOptions(
              data.sports
            )}</p>
            <button onclick="exportJSON()">Експортувати JSON</button>
            <button onclick="exportXML()">Експортувати XML</button>
            <button onclick="fillForm()">Заповнити форму</button>
            <button onclick="deleteData()">Видалити</button>
        `;
  }

  // Функція для отримання вибраних опцій
  function getSelectedOptions(selectedItems) {
    return selectedItems ? selectedItems.join(", ") : "Немає вибраних опцій";
  }

  // Обробка події надсилання форми
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      surname: document.getElementById("surname").value,
      email: document.getElementById("email").value,
      age: document.getElementById("age").value,
      gender: document.querySelector('input[name="gender"]:checked').value,
      exercises: getCheckedItems("exercises"),
      cardio: getCheckedItems("cardio"),
      sports: getCheckedItems("sports"),
    };

    localStorage.setItem("formData", JSON.stringify(formData));
    displaySavedData(formData);
  });

  // Функція для отримання вибраних чекбоксів
  function getCheckedItems(name) {
    const checkedItems = [];
    const checkboxes = document.querySelectorAll(
      `input[name="${name}"]:checked`
    );
    checkboxes.forEach((checkbox) => {
      checkedItems.push(checkbox.id);
    });
    return checkedItems;
  }

  // Функція для експорту JSON
  window.exportJSON = function () {
    const saved = localStorage.getItem("formData");
    if (saved) {
      const blob = new Blob([saved], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "formData.json";
      link.click();
    }
  };

  // Функція для експорту XML
  window.exportXML = function () {
    const saved = localStorage.getItem("formData");
    if (saved) {
      const data = JSON.parse(saved);
      const xml = `<formData>
                <name>${data.name}</name>
                <surname>${data.surname}</surname>
                <email>${data.email}</email>
                <age>${data.age}</age>
                <gender>${data.gender}</gender>
                <exercises>${getSelectedOptions(data.exercises)}</exercises>
                <cardio>${getSelectedOptions(data.cardio)}</cardio>
                <sports>${getSelectedOptions(data.sports)}</sports>
            </formData>`;

      const blob = new Blob([xml], { type: "application/xml" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "formData.xml";
      link.click();
    }
  };

  // Функція для заповнення форми з даними
  window.fillForm = function () {
    const saved = localStorage.getItem("formData");
    if (saved) {
      const data = JSON.parse(saved);
      document.getElementById("name").value = data.name;
      document.getElementById("surname").value = data.surname;
      document.getElementById("email").value = data.email;
      document.getElementById("age").value = data.age;
      document.querySelector(
        `input[name="gender"][value="${data.gender}"]`
      ).checked = true;

      // Заповнити вибрані вправи
      data.exercises.forEach((exercise) => {
        document.getElementById(exercise).checked = true;
      });
      data.cardio.forEach((cardio) => {
        document.getElementById(cardio).checked = true;
      });
      data.sports.forEach((sport) => {
        document.getElementById(sport).checked = true;
      });
    }
  };

  // Функція для видалення збережених даних
  window.deleteData = function () {
    localStorage.removeItem("formData");
    savedDataContainer.innerHTML = "<p>Дані відсутні</p>";
  };

  loadSavedData();
});
