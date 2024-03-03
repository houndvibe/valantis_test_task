import { Divider, Flex } from "antd";
import React from "react";
import classes from "./InfoBlock.module.scss";

interface InfoBlockProps {
  theme: string;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ theme }) => {
  return (
    <div>
      {theme == "me" ? (
        <Flex vertical className={classes.info}>
          <div>Обо мне:</div>

          <Flex vertical className={classes.about + " " + classes.me}>
            <p>Артем, 29 лет</p>

            <Divider />

            <p>Telegram : https://t.me/ArtemlyTG</p>
            <p> E-Mail : houndvibe@gmail.com</p>

            <Divider />

            <p>Мои навыки:</p>
            <p>● React, React-Router v5/6, Redux Toolkit/RTK Query/MobX.</p>
            <p>● TypeScript.</p>
            <p>● Свободно читаю документацию на английском.</p>
            <p>● Так же разбираюсь в C# и UE Blueprints.</p>
            <p>● Сборка и настройка конфига Webpack/Vite.</p>
            <p>● Отличные знания HTML/CSS/Семантическая адаптивная верстка.</p>
            <p>● Tailwin-css/Sass/SCSS.</p>
            <p> ● Material UI, AntD.</p>
            <p> ● Хорошо знаком с методологией БЕМ.</p>
            <p>
              ● Понимание устройства интернета DNS, CORS, TLS/SSL, HTTPS,TCP/IP
              network model (Ethernet/IP/UDP/TCP/HTTP).
            </p>
            <p>● NodeJS/Express/RestApi </p>
            <p>
              ● Базы данных - PostgreSQL(ORM srquelize,
              pg-promise)/MySQL/noSQL(MongoDB)
            </p>
            <p>● Опыт работы с Vue.js.</p>
            <p>● Figma/Slack/Asana/Jira/Trello.</p>
            <p>● Работа с контролем версий GitHub/GitLab.</p>

            <Divider />

            <p> Из интересного:</p>
            <p>● Есть опыт разработки личного кабинета и систем авторизации.</p>
            <p>● Разрабатывал текстовый редактора на фреймворке Draft.js </p>
            <p>
              ● Разработка системы визуального представления данных с помощью
              D3.js
            </p>
            <p>● Верстка/разработка бизнес-логики/настройка API</p>
          </Flex>
        </Flex>
      ) : theme == "project" ? (
        <Flex vertical className={classes.info}>
          <div>О проекте:</div>
          <Flex
            vertical
            align="self-start"
            className={classes.about + " " + classes.project}
          >
            <p>
              Обращение к серверу происходит при помощи статичиских методов
              класса
              <span style={{ fontWeight: 600 }}> ValantisApi</span>, которые
              внутри себя используют{" "}
              <span style={{ fontWeight: 600 }}> $axios_auth</span>
            </p>
            <Divider />
            <p>
              <span style={{ fontWeight: 600 }}> $axios_auth</span> - это
              инстанс
              <span style={{ fontWeight: 600 }}> axios</span>, в который
              интерсептором передан автаризационный зоголовок
            </p>
            <Divider />
            <p>
              При ошибках api в консоль пробрасывается инстанс{" "}
              <span style={{ fontWeight: 600 }}> ValantisApiError</span> с
              сообщением об ошибке, а через 1сек отправляется новый запрос.
              Пауза в 1 секунду сделана на случай потери интернет соединения, во
              избежание бксконенчой цикличной отправки запросов
            </p>
            <Divider />
            <p>
              Фильтрация, как и требовалось в задании, происходит не на клиенте,
              а на сервере, посредством метода
              <span style={{ fontWeight: 600 }}> filter</span>, При этом
              нефильтрованные данные кэширутся, воизбежание повторной загрузки
              при сбросе фильтра
            </p>
            <Divider />
            <p>
              Для фронтенда использовал библиотеку{" "}
              <span style={{ fontWeight: 600 }}>antd</span>, Дополнительно
              стилизовал элементы при помощи{" "}
              <span style={{ fontWeight: 600 }}>scss modules</span>
            </p>
            <Divider />
            <p>Некоторые более подробные коментарии можно найти в коде</p>
            <Divider />
            <p>Использованные инструменты:</p>
            <p>1. React 18.2.0</p>
            <p>2. TypeScript 5.2.2</p>
            <p>3. ReactRouter 6.2</p>
            <p>4. MobX 6.12</p>
            <p>5. Vite 5.1.4</p>
            <p>6. Axios 1.6</p>
            <p>7. sass 1.71.1</p>
            <p>8. antd 5.14.2</p>
            <p>9. md5 2.3.0</p>
          </Flex>
        </Flex>
      ) : null}
    </div>
  );
};

export default InfoBlock;
