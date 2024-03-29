import { Flex, Layout } from "antd";
import classes from "./App.module.scss";
import { NavLink, Outlet } from "react-router-dom";
import AppNotificationContainer from "../../components/AppNotificationContainer/AppNotificationContainer";
import { onAppStart } from "../../api/products/onAppStart";
const { Header, Footer, Content } = Layout;

onAppStart();

const App = () => {
  return (
    <div className={classes.app}>
      <AppNotificationContainer />
      <Layout className={classes.layout}>
        <Header className={classes.header}>
          <Flex justify="space-between">
            <div>Valantis test task</div>
            <Flex wrap="wrap" gap="large">
              <NavLink to="/" className={classes.navlink}>
                Инфо
              </NavLink>
              <NavLink to="/products" className={classes.navlink}>
                Продукты
              </NavLink>
            </Flex>
          </Flex>
        </Header>
        <Content className={classes.content}>
          <Outlet />
        </Content>
        <Footer className={classes.footer}>Valantis test task</Footer>
      </Layout>
    </div>
  );
};

export default App;
