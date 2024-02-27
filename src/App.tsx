import { useEffect } from "react";
import ValantisApi from "./api/valantisApi";

const x = async () => {
  const response1 = await ValantisApi.get_ids(0, 50);
  console.log(response1);
  const response2 = await ValantisApi.get_items(response1);
  console.log(response2);
  const response3 = await ValantisApi.get_fields("brand", 3, 100);
  console.log(response3);
};

const App = () => {
  useEffect(() => {
    x();
  }, []);

  return <>App</>;
};

export default App;
