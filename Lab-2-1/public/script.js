const API_BASE_URL = "http://localhost:3000/api";

let isEditing = false;
let editingId = null;

// Завантаження сторінки
document.addEventListener("DOMContentLoaded", function () {
  loadPeople();
  setupFormSubmission();
});

// Налаштування відправки форми
function setupFormSubmission() {
  const form = document.getElementById("personForm");
  form.addEventListener("submit", handleFormSubmit);
}

// Обробка відправки форми
async function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const personData = {
    name: formData.get("name"),
    age: parseInt(formData.get("age")),
    height: parseInt(formData.get("height")),
    weight: parseInt(formData.get("weight")),
    gender: formData.get("gender"),
  };

  try {
    if (isEditing) {
      await updatePerson(editingId, personData);
    } else {
      await createPerson(personData);
    }

    resetForm();
    loadPeople();
    showMessage("Операцію виконано успішно!", "success");
  } catch (error) {
    showMessage("Помилка: " + error.message, "error");
  }
}

// Завантаження списку людей
async function loadPeople() {
  try {
    showLoading();
    const response = await fetch(`${API_BASE_URL}/people`);

    if (!response.ok) {
      throw new Error("Помилка завантаження даних");
    }

    const people = await response.json();
    displayPeople(people);
  } catch (error) {
    showError("Помилка завантаження даних: " + error.message);
  }
}

// Відображення списку людей
function displayPeople(people) {
  const peopleList = document.getElementById("peopleList");

  if (people.length === 0) {
    peopleList.innerHTML = '<p class="loading">Список порожній. Додайте першу людину!</p>';
    return;
  }

  peopleList.innerHTML = people
    .map(
      (person) => `
        <div class="person-card">
            <div class="person-info">
                <div><strong>Ім'я:</strong> ${person.name}</div>
                <div><strong>Вік:</strong> ${person.age} років</div>
                <div><strong>Зріст:</strong> ${person.height} см</div>
                <div><strong>Вага:</strong> ${person.weight} кг</div>
                <div><strong>Стать:</strong> ${person.gender}</div>
                <div><strong>ID:</strong> ${person.id}</div>
            </div>
            <div class="person-actions">
                <button class="btn-edit" onclick="editPerson('${person.id}')">Редагувати</button>
                <button class="btn-delete" onclick="deletePerson('${person.id}')">Видалити</button>
            </div>
        </div>
    `
    )
    .join("");
}

// Створення нової людини
async function createPerson(personData) {
  const response = await fetch(`${API_BASE_URL}/people`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(personData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Помилка створення запису");
  }

  return await response.json();
}

// Оновлення людини
async function updatePerson(id, personData) {
  const response = await fetch(`${API_BASE_URL}/people/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(personData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Помилка оновлення запису");
  }

  return await response.json();
}

// Видалення людини
async function deletePerson(id) {
  if (!confirm("Ви впевнені, що хочете видалити цей запис?")) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/people/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Помилка видалення запису");
    }

    loadPeople();
    showMessage("Запис успішно видалено!", "success");
  } catch (error) {
    showMessage("Помилка видалення: " + error.message, "error");
  }
}

// Редагування людини
async function editPerson(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/people/${id}`);

    if (!response.ok) {
      throw new Error("Помилка завантаження даних для редагування");
    }

    const person = await response.json();

    // Заповнення форми даними для редагування
    document.getElementById("personId").value = person.id;
    document.getElementById("name").value = person.name;
    document.getElementById("age").value = person.age;
    document.getElementById("height").value = person.height;
    document.getElementById("weight").value = person.weight;
    document.getElementById("gender").value = person.gender;

    // Перемикання в режим редагування
    isEditing = true;
    editingId = id;
    document.getElementById("submitBtn").textContent = "Оновити";
    document.querySelector(".form-section h2").textContent = "Редагувати людину";

    // Прокрутка до форми
    document.querySelector(".form-section").scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    showMessage("Помилка завантаження даних: " + error.message, "error");
  }
}

// Скасування редагування
function cancelEdit() {
  resetForm();
}

// Скидання форми
function resetForm() {
  document.getElementById("personForm").reset();
  document.getElementById("personId").value = "";
  isEditing = false;
  editingId = null;
  document.getElementById("submitBtn").textContent = "Додати";
  document.querySelector(".form-section h2").textContent = "Додати людину";
}

// Завантаження XML файлу
async function downloadXML() {
  try {
    const response = await fetch(`${API_BASE_URL}/people.xml`);

    if (!response.ok) {
      throw new Error("Помилка завантаження XML");
    }

    const xmlData = await response.text();

    // Створення і завантаження файлу
    const blob = new Blob([xmlData], { type: "application/xml" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "people.xml";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    showMessage("XML файл завантажено!", "success");
  } catch (error) {
    showMessage("Помилка завантаження XML: " + error.message, "error");
  }
}

// Показ повідомлення про завантаження
function showLoading() {
  document.getElementById("peopleList").innerHTML = '<p class="loading">Завантаження...</p>';
}

// Показ помилки
function showError(message) {
  document.getElementById("peopleList").innerHTML = `<div class="error">${message}</div>`;
}

// Показ модального повідомлення
function showMessage(message, type = "info") {
  const modal = document.getElementById("messageModal");
  const messageElement = document.getElementById("modalMessage");

  messageElement.textContent = message;
  messageElement.className = type;
  modal.style.display = "block";

  // Автоматичне закриття через 3 секунди
  setTimeout(() => {
    closeModal();
  }, 3000);
}

// Закриття модального вікна
function closeModal() {
  document.getElementById("messageModal").style.display = "none";
}

// Закриття модального вікна при кліку поза ним
window.onclick = function (event) {
  const modal = document.getElementById("messageModal");
  if (event.target === modal) {
    closeModal();
  }
};
