document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formPage");
  // const savedDataContainer = document.getElementById("savedData");

  // Функція для завантаження збережених даних
  function loadSavedData() {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith("formData_")) {
        const data = JSON.parse(localStorage.getItem(key));
        displaySavedData(data);
      }
    });
  }

  // Функція для відображення збережених даних
  function displaySavedData(data) {
    document.getElementById("table").style.display = "table";
    const dataDiv = document.getElementById("result");
    dataDiv.innerHTML += `      <tr>
        <td>${data.name}</td>
        <td>${data.surname}</td>
        <td>${data.email}</td>
        <td>${data.age}</td>
        <td>${data.gender}</td>
        <td>${getSelectedOptions(data.exercises)}</td>
        <td>${getSelectedOptions(data.cardio)}</td>
        <td>${getSelectedOptions(data.sports)}</td>
        <td><button onclick="exportXML('${
          data.id
        }')">Експортувати XML</button></td>
        <td><button onclick="exportJSON('${
          data.id
        }')">Експортувати JSON</button></td>
        <td><button onclick="fillForm('${
          data.id
        }')">Заповнити форму</button></td>
        <td class="last"><button onclick="deleteData('${
          data.id
        }')">Видалити</button></td>
      </tr>`;
  }

  // Функція для отримання вибраних опцій
  function getSelectedOptions(selectedItems) {
    return selectedItems ? selectedItems.join(", ") : "Немає вибраних опцій";
  }

  // Обробка події надсилання форми
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      id: `formData_${new Date().getTime()}`,
      name: document.getElementById("name").value,
      surname: document.getElementById("surname").value,
      email: document.getElementById("email").value,
      age: document.getElementById("age").value,
      gender: document.querySelector('input[name="gender"]:checked').value,
      exercises: getCheckedItems("exercises"),
      cardio: getCheckedItems("cardio"),
      sports: getCheckedItems("sports"),
    };

    localStorage.setItem(formData.id, JSON.stringify(formData));
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
  window.exportJSON = function (id) {
    const saved = localStorage.getItem(id);
    if (saved) {
      const blob = new Blob([saved], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${id}.json`;
      link.click();
    }
  };

  // Функція для експорту XML
  window.exportXML = function (id) {
    const saved = localStorage.getItem(id);
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
      link.download = `${id}.xml`;
      link.click();
    }
  };

  // Функція для заповнення форми з даними
  window.fillForm = function (id) {
    const saved = localStorage.getItem(id);
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
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
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
  window.deleteData = function (id) {
    localStorage.removeItem(id);
    document.getElementById("result").innerHTML = "";
    loadSavedData();
  };

  loadSavedData();
});
