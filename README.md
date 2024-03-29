# Valantis_test_task

## Липатов А.С

Telegram: **https://t.me/ArtemlyTG**

Mail: **houndvibe@gmail.com**

Ссылка на рабочую версию: **https://houndvibe.github.io/valantis_test_task/**

Принял решение грузить данные не постранично, а двумя партиями т.к. ожидание ответа сервера при каждой смене страницы немного утомляет пользователя.

Первым запросом грузится несколько начальных страниц, чтобы юзеру было чем заняться, втором запросом, в фоновом режиме, догружаются остальные данные.

Обращение к серверу происходит при помощи static методов класса **ValantisApiBase**, которые внутри себя используют **$axios_auth**.

**$axios_auth** - это инстанс **axios**, в который интерсептором передан автаризационный зоголовок.

При ошибках api сообщение об ошибке выводится в консоль. Так же, в правом нижнем углу экрана всплывает **react-toastify** нотификация с текстом ошибки.

Через 1.5сек после ошибки посредством функции **reconnect** отправляется новый запрос. Пауза в 1.5сек сделана на случай потери интернет-соединения, во избежание цикличной отправки огромного количества запросов.

Фильтрация, как и требовалось в задании, происходит не на клиенте, а на сервере, посредством метода **filter**. При этом нефильтрованные данные кэширутся, во избежание повторной их загрузки при сбросе фильтра.

Для фронтенда использовал библиотеку **antd**, Дополнительно стилизовал элементы при помощи **scss modules**.

Некоторые более подробные коментарии можно найти в коде.

Буду рад лично ответить на любые вопросы.

## Использованные инструменты:

1. React 18.2.0

2. TypeScript 5.2.2

3. ReactRouter 6.2

4. MobX 6.12

5. Vite 5.1.4

6. axios 1.6

7. sass 1.71.1

8. antd 5.14.2

9. toastify 10.0.4

10. md5 2.3.0
