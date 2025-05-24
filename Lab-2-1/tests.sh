#!/bin/bash

# Швидка демонстрація основних операцій CRUD
echo "🚀 ШВИДКА ДЕМОНСТРАЦІЯ CRUD ОПЕРАЦІЙ"
echo "=================================="

API_URL="http://localhost:3000/api"

# Створення
echo "1️⃣ СТВОРЕННЯ:"
RESPONSE=$(curl -s -X POST "$API_URL/people" \
  -H "Content-Type: application/json" \
  -d '{"name": "Тест Тестович", "age": 25, "height": 170, "weight": 65, "gender": "Чоловік"}')
echo "$RESPONSE"
ID=$(echo "$RESPONSE" | jq -r '.id')
echo ""

# Читання
echo "2️⃣ ЧИТАННЯ:"
curl -s "$API_URL/people" | jq '.'
echo ""

# Оновлення  
echo "3️⃣ ОНОВЛЕННЯ:"
curl -s -X PUT "$API_URL/people/$ID" \
  -H "Content-Type: application/json" \
  -d '{"age": 26}' | jq '.'
echo ""

# Перевірка файлів
echo "4️⃣ ФАЙЛИ:"
echo "JSON:" && cat data/people.json | jq '.people | length'
echo "XML існує:" && ls -la data/people.xml | awk '{print $9, $5}'
echo ""

# Видалення
echo "5️⃣ ВИДАЛЕННЯ:"
curl -s -X DELETE "$API_URL/people/$ID" | jq '.'
echo ""

echo "✅ Демонстрація завершена!"
