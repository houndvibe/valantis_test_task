import { Divider, Flex } from "antd";

import classes from "./InfoPage.module.scss";

const InfoPage = () => {
  return (
    <div>
      <div>Привет, Valantis!</div>
      <Flex align="center" justify="space-around">
        <Flex vertical className={classes.about}>
          <div>Обо мне:</div>

          <Flex vertical className={classes.info + " " + classes.me}>
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
              network model (Ethernet/IP/UDP/TCP/HTTP).{" "}
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
            <p>
              <p>
                ● Есть опыт разработки личного кабинета и систем авторизации.
              </p>
              <p>● Разрабатывал текстовый редактора на фреймворке Draft.js </p>
              <p>
                ● Разработка системы визуального представления данных с помощью
                D3.js
              </p>
              <p>● Верстка/разработка бизнес-логики/настройка API</p>
            </p>
          </Flex>
        </Flex>
        <Flex vertical className={classes.about}>
          <div>О проекте:</div>
          <Flex
            vertical
            align="self-start"
            className={classes.info + " " + classes.project}
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
              Для фронтенда использовал библиотеку{" "}
              <span style={{ fontWeight: 600 }}>antd</span>, Дополнительно
              стилизовал элементы при помощи{" "}
              <span style={{ fontWeight: 600 }}>scss modules</span>
            </p>
            <Divider />
            <p>Использованные инструменты:</p>
            <p>1. React 18.2.0</p>
            <p>2. TypeScript 5.2.2</p>
            <p>3. React-router 6.22</p>
            <p>4. Vite 5.1.4</p>
            <p>5. Axios 1.6</p>
            <p>6. sass 1.71.1</p>
            <p>7. antd 5.14.2</p>
            <p>8. md5 2.3.0</p>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default InfoPage;
