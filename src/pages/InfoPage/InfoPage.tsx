import { Flex } from "antd";
import InfoBlock from "../../components/InfoBlock/InfoBlock";

const InfoPage = () => {
  return (
    <div>
      <div>Привет, Valantis!</div>
      <Flex align="center" justify="space-around">
        <InfoBlock theme={"me"} />
        <InfoBlock theme={"project"} />
      </Flex>
    </div>
  );
};

export default InfoPage;
