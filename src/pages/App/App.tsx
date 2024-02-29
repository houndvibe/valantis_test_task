import { Flex, Layout } from "antd";
import classes from "./App.module.scss";
import { NavLink, Outlet } from "react-router-dom";
import { useEffect } from "react";
import ValantisApi from "../../api/valantisApi";

const { Header, Footer, Content } = Layout;

const App: React.FC = () => {
  useEffect(() => {
    ValantisApi.init();
  }, []);

  return (
    <div className={classes.app}>
      <Layout className={classes.layout}>
        <Header className={classes.header}>
          <Flex justify="space-between">
            <div>Valantis test task</div>
            <Flex wrap="wrap" gap="large">
              <NavLink to="info" className={classes.navlink}>
                Инфо
              </NavLink>
              <NavLink to="products" className={classes.navlink}>
                Таблица
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
