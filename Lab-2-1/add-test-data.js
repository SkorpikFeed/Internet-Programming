// Тестовий скрипт для додавання початкових даних
// Запустити після старту сервера

const testData = [
  {
    name: "Іван Іванович Папая",
    age: 28,
    height: 180,
    weight: 75,
    gender: "Чоловік",
  },
  {
    name: "Василь Васильович Манго",
    age: 72,
    height: 143,
    weight: 120,
    gender: "Чоловік",
  },
  {
    name: "Анна Анатоліївна Цитрус",
    age: 32,
    height: 176,
    weight: 74,
    gender: "Жінка",
  },
];

async function addTestData() {
  for (const person of testData) {
    try {
      const response = await fetch("http://localhost:3000/api/people", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Додано:", result.name);
      } else {
        console.error("Помилка додавання:", person.name);
      }
    } catch (error) {
      console.error("Помилка:", error);
    }
  }
}

// Розкоментуйте наступний рядок щоб додати тестові дані
// addTestData();
