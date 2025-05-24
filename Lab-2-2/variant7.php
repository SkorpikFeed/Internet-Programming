<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Варіант 7 - Дата та час</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
            border-bottom: 2px solid #4CAF50;
            padding-bottom: 10px;
        }
        .info-block {
            background-color: #f9f9f9;
            padding: 15px;
            margin: 15px 0;
            border-left: 4px solid #4CAF50;
            border-radius: 5px;
        }
        .info-block h3 {
            margin-top: 0;
            color: #4CAF50;
        }
        .highlight {
            background-color: #ffeb3b;
            padding: 2px 5px;
            border-radius: 3px;
        }
        .back-link {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
        .back-link:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Лабораторна робота 2-2 - Варіант 7</h1>
        <h2>Інформація про дату та час</h2>
        
        <?php
        // Встановлюємо часовий пояс для України
        date_default_timezone_set('Europe/Kiev');
        
        // Поточна дата та час
        $currentDate = new DateTime();
        $currentDateFormatted = $currentDate->format('d.m.Y H:i:s');
        $dayOfWeek = $currentDate->format('l'); // Англійською
        $dayOfWeekUkr = [
            'Monday' => 'Понеділок',
            'Tuesday' => 'Вівторок', 
            'Wednesday' => 'Середа',
            'Thursday' => 'Четвер',
            'Friday' => "П'ятниця",
            'Saturday' => 'Субота',
            'Sunday' => 'Неділя'
        ];
        
        // Кількість днів у поточному місяці
        $currentMonth = $currentDate->format('n'); // номер місяця
        $currentYear = $currentDate->format('Y');
        $daysInCurrentMonth = cal_days_in_month(CAL_GREGORIAN, $currentMonth, $currentYear);
        
        // Наступний місяць
        $nextMonth = $currentDate->modify('+1 month');
        $nextMonthNumber = $nextMonth->format('n');
        $nextMonthYear = $nextMonth->format('Y');
        $daysInNextMonth = cal_days_in_month(CAL_GREGORIAN, $nextMonthNumber, $nextMonthYear);
        
        // Повертаємо дату назад для відображення
        $currentDate = new DateTime();
        
        // Назви місяців українською
        $monthsUkr = [
            1 => 'Січень', 2 => 'Лютий', 3 => 'Березень', 4 => 'Квітень',
            5 => 'Травень', 6 => 'Червень', 7 => 'Липень', 8 => 'Серпень',
            9 => 'Вересень', 10 => 'Жовтень', 11 => 'Листопад', 12 => 'Грудень'
        ];
        ?>
        
        <div class="info-block">
            <h3>📅 Поточна дата та час</h3>
            <p><strong>Дата:</strong> <span class="highlight"><?php echo $currentDateFormatted; ?></span></p>
        </div>
        
        <div class="info-block">
            <h3>📆 День тижня</h3>
            <p><strong>Сьогодні:</strong> <span class="highlight"><?php echo $dayOfWeekUkr[$dayOfWeek]; ?></span></p>
        </div>
        
        <div class="info-block">
            <h3>🗓️ Кількість днів у місяцях</h3>
            <p><strong>Поточний місяць (<?php echo $monthsUkr[$currentMonth]; ?> <?php echo $currentYear; ?>):</strong> 
               <span class="highlight"><?php echo $daysInCurrentMonth; ?> днів</span></p>
            <p><strong>Наступний місяць (<?php echo $monthsUkr[$nextMonthNumber]; ?> <?php echo $nextMonthYear; ?>):</strong> 
               <span class="highlight"><?php echo $daysInNextMonth; ?> днів</span></p>
        </div>
        
        <div class="info-block">
            <h3>ℹ️ Додаткова інформація</h3>
            <p><strong>Номер тижня в році:</strong> <?php echo $currentDate->format('W'); ?></p>
            <p><strong>День року:</strong> <?php echo $currentDate->format('z') + 1; ?> з <?php echo $currentDate->format('L') ? '366' : '365'; ?></p>
            <p><strong>Чи високосний рік:</strong> <?php echo $currentDate->format('L') ? 'Так' : 'Ні'; ?></p>
        </div>
        
        <a href="index.php" class="back-link">← Повернутися до головної сторінки</a>
    </div>
</body>
</html>
