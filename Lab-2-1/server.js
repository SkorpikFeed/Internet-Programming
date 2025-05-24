const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Шляхи до файлів
const dataDir = path.join(__dirname, "data");
const xmlFilePath = path.join(dataDir, "people.xml");
const jsonFilePath = path.join(dataDir, "people.json");

// Створення папки data якщо не існує
async function ensureDataDir() {
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Ініціалізація файлів даних
async function initializeDataFiles() {
  await ensureDataDir();

  // Ініціалізація XML файлу
  try {
    await fs.access(xmlFilePath);
  } catch {
    const initialXML = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE people [
    <!ELEMENT people (person*)>
    <!ELEMENT person (name, age, height, weight, gender)>
    <!ATTLIST person id ID #REQUIRED>
    <!ELEMENT name (#PCDATA)>
    <!ELEMENT age (#PCDATA)>
    <!ELEMENT height (#PCDATA)>
    <!ELEMENT weight (#PCDATA)>
    <!ELEMENT gender (#PCDATA)>
]>
<people>
</people>`;
    await fs.writeFile(xmlFilePath, initialXML);
  }

  // Ініціалізація JSON файлу
  try {
    await fs.access(jsonFilePath);
  } catch {
    const initialJSON = { people: [] };
    await fs.writeFile(jsonFilePath, JSON.stringify(initialJSON, null, 2));
  }
}

// Генерація унікального ID
function generateId() {
  return "p" + Date.now().toString();
}

// Читання JSON даних
async function readJSONData() {
  try {
    const data = await fs.readFile(jsonFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return { people: [] };
  }
}

// Запис JSON даних
async function writeJSONData(data) {
  await fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2));
}

// Читання XML даних
async function readXMLData() {
  try {
    const data = await fs.readFile(xmlFilePath, "utf8");
    return data;
  } catch (error) {
    return null;
  }
}

// Оновлення XML файлу
async function updateXMLFile(people) {
  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE people [
    <!ELEMENT people (person*)>
    <!ELEMENT person (name, age, height, weight, gender)>
    <!ATTLIST person id ID #REQUIRED>
    <!ELEMENT name (#PCDATA)>
    <!ELEMENT age (#PCDATA)>
    <!ELEMENT height (#PCDATA)>
    <!ELEMENT weight (#PCDATA)>
    <!ELEMENT gender (#PCDATA)>
]>
<people>
`;

  people.forEach((person) => {
    xmlContent += `    <person id="${person.id}">
        <name>${person.name}</name>
        <age>${person.age}</age>
        <height>${person.height}</height>
        <weight>${person.weight}</weight>
        <gender>${person.gender}</gender>
    </person>
`;
  });

  xmlContent += "</people>";
  await fs.writeFile(xmlFilePath, xmlContent);
}

// API Routes

// Отримати всіх людей
app.get("/api/people", async (req, res) => {
  try {
    const data = await readJSONData();
    res.json(data.people);
  } catch (error) {
    res.status(500).json({ error: "Помилка читання даних" });
  }
});

// Отримати людину за ID
app.get("/api/people/:id", async (req, res) => {
  try {
    const data = await readJSONData();
    const person = data.people.find((p) => p.id === req.params.id);
    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ error: "Людину не знайдено" });
    }
  } catch (error) {
    res.status(500).json({ error: "Помилка читання даних" });
  }
});

// Створити нову людину
app.post("/api/people", async (req, res) => {
  try {
    const { name, age, height, weight, gender } = req.body;

    if (!name || !age || !height || !weight || !gender) {
      return res.status(400).json({ error: "Всі поля обов'язкові" });
    }

    const newPerson = {
      id: generateId(),
      name,
      age: parseInt(age),
      height: parseInt(height),
      weight: parseInt(weight),
      gender,
    };

    const data = await readJSONData();
    data.people.push(newPerson);

    await writeJSONData(data);
    await updateXMLFile(data.people);

    res.status(201).json(newPerson);
  } catch (error) {
    res.status(500).json({ error: "Помилка створення запису" });
  }
});

// Оновити людину
app.put("/api/people/:id", async (req, res) => {
  try {
    const { name, age, height, weight, gender } = req.body;
    const data = await readJSONData();
    const personIndex = data.people.findIndex((p) => p.id === req.params.id);

    if (personIndex === -1) {
      return res.status(404).json({ error: "Людину не знайдено" });
    }

    data.people[personIndex] = {
      ...data.people[personIndex],
      name: name || data.people[personIndex].name,
      age: age ? parseInt(age) : data.people[personIndex].age,
      height: height ? parseInt(height) : data.people[personIndex].height,
      weight: weight ? parseInt(weight) : data.people[personIndex].weight,
      gender: gender || data.people[personIndex].gender,
    };

    await writeJSONData(data);
    await updateXMLFile(data.people);

    res.json(data.people[personIndex]);
  } catch (error) {
    res.status(500).json({ error: "Помилка оновлення запису" });
  }
});

// Видалити людину
app.delete("/api/people/:id", async (req, res) => {
  try {
    const data = await readJSONData();
    const personIndex = data.people.findIndex((p) => p.id === req.params.id);

    if (personIndex === -1) {
      return res.status(404).json({ error: "Людину не знайдено" });
    }

    const deletedPerson = data.people.splice(personIndex, 1)[0];

    await writeJSONData(data);
    await updateXMLFile(data.people);

    res.json({ message: "Запис видалено", person: deletedPerson });
  } catch (error) {
    res.status(500).json({ error: "Помилка видалення запису" });
  }
});

// Отримати XML файл
app.get("/api/people.xml", async (req, res) => {
  try {
    const xmlData = await readXMLData();
    res.set("Content-Type", "application/xml");
    res.send(xmlData);
  } catch (error) {
    res.status(500).json({ error: "Помилка читання XML файлу" });
  }
});

// Статичні файли
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Запуск сервера
async function startServer() {
  await initializeDataFiles();
  app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
  });
}

startServer();
