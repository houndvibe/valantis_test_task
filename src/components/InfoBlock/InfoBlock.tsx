import { Divider, Flex } from "antd";
import classes from "./InfoBlock.module.scss";
import BoldText from "../BoldText/BoldText";

const InfoBlock = ({ theme }: { theme: string }) => {
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
              <BoldText> ValantisApi</BoldText>, которые внутри себя используют
              <BoldText> $axios_auth</BoldText>.
            </p>
            <Divider />
            <p>
              <BoldText> $axios_auth</BoldText> - это инстанс
              <BoldText> axios</BoldText>, в который интерсептором передан
              автаризационный зоголовок.
            </p>
            <Divider />
            <p>
              При ошибках api сообщение об ошибке выводится в консоль. Так же, в
              правом нижнем углу экрана всплывает
              <BoldText> React-toastify нотификация</BoldText> с текстом ошибки.
            </p>
            <Divider />
            <p>
              Через 1.5сек после ошибки посредством функции
              <BoldText> reconnect</BoldText> отправляется новый запрос. Пауза в
              1.5сек сделана на случай потери интернет-соединения, во избежание
              цикличной отправки огромного количества запросов.
            </p>
            <Divider />
            <p>
              Фильтрация, как и требовалось в задании, происходит не на клиенте,
              а на сервере, посредством метода <BoldText> filter</BoldText>, При
              этом нефильтрованные данные кэширутся, во избежание повторной их
              загрузки при сбросе фильтра.
            </p>
            <Divider />
            <p>
              Для фронтенда использовал библиотеку <BoldText>antd</BoldText>,
              Дополнительно стилизовал элементы при помощи
              <BoldText> scss modules</BoldText>.
            </p>
            <Divider />
            <p>Некоторые более подробные коментарии можно найти в коде.</p>
            <Divider />
            <p>Буду рад лично ответить на любые вопросы.</p>
            <Divider />
            <p>
              <BoldText>Использованные инструменты:</BoldText>
            </p>
            <p># React 18.2.0</p>
            <p># TypeScript 5.2.2</p>
            <p># ReactRouter 6.2</p>
            <p># MobX 6.12</p>
            <p># Vite 5.1.4</p>
            <p># axios 1.6</p>
            <p># sass 1.71.1</p>
            <p># antd 5.14.2</p>
            <p># toastify 10.0.4 </p>
            <p># md5 2.3.0</p>
          </Flex>
        </Flex>
      ) : null}
    </div>
  );
};

export default InfoBlock;
