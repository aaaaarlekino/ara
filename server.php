<?php
$name = $_POST['name'];
$tel = $_POST['tel'];

$db_host = "localhost"; 
$db_user = "user"; // Логин БД
$db_password = "123"; // Пароль БД
$db_base = 'mybase'; // Имя БД
$db_table = "mytable"; // Имя Таблицы БД


try {
    // Подключение к базе данных
    $db = new PDO("mysql:host=$db_host;dbname=$db_base", $db_user, $db_password);
    // Устанавливаем корректную кодировку
    $db->exec("set names utf8");
    // Собираем данные для запроса
    $data = array( 'name' => $name, 'text' => $text ); 
    // Подготавливаем SQL-запрос
    $query = $db->prepare("INSERT INTO $db_table (name, text) values (:name, :text)");
    // Выполняем запрос с данными
    $query->execute($data);
    // Запишим в переменую, что запрос отрабтал
    $result = true;
} catch (PDOException $e) {
    // Если есть ошибка соединения или выполнения запроса, выводим её
    print "Ошибка!: " . $e->getMessage() . "<br/>";
}

?>