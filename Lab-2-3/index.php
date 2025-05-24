<?php
session_start();

// Ініціалізація статистики
if (!isset($_SESSION['correct'])) {
    $_SESSION['correct'] = 0;
    $_SESSION['total'] = 0;
}

$message = '';
$question = '';
$answer = '';

// Функція для генерації математичних прикладів
function generateQuestion() {
    $operations = ['+', '-', '*'];
    $operation = $operations[array_rand($operations)];
    
    switch ($operation) {
        case '+':
            $a = rand(1, 50);
            $b = rand(1, 50);
            $correct_answer = $a + $b;
            $question = "$a + $b = ?";
            break;
        case '-':
            $a = rand(10, 100);
            $b = rand(1, $a);
            $correct_answer = $a - $b;
            $question = "$a - $b = ?";
            break;
        case '*':
            $a = rand(2, 12);
            $b = rand(2, 12);
            $correct_answer = $a * $b;
            $question = "$a × $b = ?";
            break;
    }
    
    return [$question, $correct_answer];
}

// Обробка відповіді
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['answer']) && isset($_POST['correct_answer'])) {
        $user_answer = (int)$_POST['answer'];
        $correct_answer = (int)$_POST['correct_answer'];
        
        $_SESSION['total']++;
        
        if ($user_answer === $correct_answer) {
            $_SESSION['correct']++;
            $message = "Правильно! Молодець!";
        } else {
            $message = "Неправильно. Правильна відповідь: $correct_answer";
        }
    }
    
    if (isset($_POST['reset'])) {
        $_SESSION['correct'] = 0;
        $_SESSION['total'] = 0;
        $message = "Статистика скинута!";
    }
}

// Генерація нового питання
list($question, $answer) = generateQuestion();

// Розрахунок відсотка правильних відповідей
$percentage = $_SESSION['total'] > 0 ? round(($_SESSION['correct'] / $_SESSION['total']) * 100, 1) : 0;
?>

<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Лабораторна робота 2.3 - Перевірка усного рахунку</title>
    <link rel="stylesheet" href="style.css">
    <!-- Дебаг: CSS має завантажитися -->
    <style>
        /* Fallback стилі якщо CSS не завантажується */
        body { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    </style>
</head>
<body>
    <!-- Дебаг: PHP працює, поточний час: <?php echo date('H:i:s'); ?> -->
    <div class="container">
        <header>
            <h1>Лабораторна робота 2.3</h1>
            <p>Перевірка усного рахунку на PHP</p>
        </header>
        
        <main>
            <div class="calculator-section">
                <h2>Розв'яжи приклад</h2>
                
                <?php if ($message): ?>
                    <div class="message <?php echo strpos($message, 'Правильно') !== false ? 'success' : 'error'; ?>">
                        <?php echo htmlspecialchars($message); ?>
                    </div>
                <?php endif; ?>
                
                <div class="question-block">
                    <div class="question"><?php echo htmlspecialchars($question); ?></div>
                    
                    <form method="POST" class="answer-form">
                        <input type="hidden" name="correct_answer" value="<?php echo $answer; ?>">
                        <div class="input-group">
                            <input type="number" name="answer" placeholder="Твоя відповідь" required autofocus>
                            <button type="submit">Перевірити</button>
                        </div>
                    </form>
                </div>
            </div>
            
            <div class="stats-section">
                <h2>Статистика</h2>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-label">Правильних відповідей:</span>
                        <span class="stat-value"><?php echo $_SESSION['correct']; ?></span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Загальна кількість:</span>
                        <span class="stat-value"><?php echo $_SESSION['total']; ?></span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Відсоток правильних:</span>
                        <span class="stat-value"><?php echo $percentage; ?>%</span>
                    </div>
                </div>
                
                <form method="POST" class="reset-form">
                    <button type="submit" name="reset" class="btn-reset">Скинути статистику</button>
                </form>
            </div>
        </main>
    </div>
</body>
</html>
