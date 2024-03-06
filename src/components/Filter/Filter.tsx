import { Button, Flex } from "antd";
import productsStore from "../../store/productsStore";
import { useState } from "react";
import { getFilterWarningMessage } from "../../services/getFilterWarningMessage";
import { getFilteredProducts } from "../../api/products/getFilteredProducts";
import SelectFilterType from "./SelectFilterType";
import { FilterProps } from "../../types/interfaces";
import SelectFilterValue from "./SelectFilterValue";

const Filter: React.FC<FilterProps> = ({
  onFilter: setIsTableFiltered,
  isTableFiltered,
}) => {
  const [filterType, setFilterType] = useState("");
  const [brandFilterValue, setBrandFilterValue] = useState("");
  const [productFilterValue, setProductFilterValue] = useState("");
  const [priceFilterValue, setPriceFilterValue] = useState<number | null>(0);
  const [errosMessage, setErrorMessage] = useState("");

  const minPrice = Math.min(...productsStore.prices);

  const handleFilterKeyEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      handleSendFilterQuery();
    }
  };

  const handleResetFilter = () => {
    setFilterType("");
    setProductFilterValue("");
    setBrandFilterValue("");
    setPriceFilterValue(minPrice);
    setIsTableFiltered(false);
  };

  const handleSendFilterQuery = async () => {
    const filterQuery =
      filterType == "price"
        ? priceFilterValue
        : filterType == "brand"
        ? brandFilterValue
        : productFilterValue;

    if (!filterType || !filterQuery) {
      const message = getFilterWarningMessage(filterType, filterQuery!);
      setErrorMessage(message);
      return;
    }

    getFilteredProducts({
      filterType,
      filterQuery,
    });

    setErrorMessage("");
    setIsTableFiltered(true);
  };

  return (
    <Flex gap={"middle"} align="center">
      <SelectFilterType
        value={filterType}
        onKeyDown={handleFilterKeyEnter}
        onChange={setFilterType}
      />
      <SelectFilterValue
        filterType={filterType}
        priceFilterValue={priceFilterValue}
        brandFilterValue={brandFilterValue}
        productFilterValue={productFilterValue}
        onKeyDown={handleFilterKeyEnter}
        onBrandChange={setBrandFilterValue}
        onPriceChange={setPriceFilterValue}
        onProductChange={setProductFilterValue}
      />
      <Button onClick={handleSendFilterQuery}>Фильтровать</Button>
      {isTableFiltered ? (
        <Button onClick={handleResetFilter}>Сбросить фильтр</Button>
      ) : null}
      {errosMessage && <div style={{ color: "red" }}>{errosMessage}</div>}
    </Flex>
  );
};
export default Filter;
