import { Button, Flex, Input, InputNumber, Select } from "antd";
import productsStore from "../../store/productsStore";
import ValantisApi from "../../api/valantisApi";
import { useState } from "react";
import { getFilterErrorMessage } from "../../services/services";

interface TableFilterProps {
  isTableFiltered: boolean;
  onFilter: (value: boolean) => void;
}

const TableFilter: React.FC<TableFilterProps> = ({
  onFilter: setIsTableFiltered,
  isTableFiltered,
}) => {
  const brands = productsStore.brands;
  const prices = productsStore.prices;
  const [minPrice, maxPrice] = [Math.min(...prices), Math.max(...prices)];

  const [filterType, setFilterType] = useState("");

  const [brandFilter, setBrandFilter] = useState("");
  const [productFilter, setProductFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState(minPrice);

  const [errosMessage, setErrorMessage] = useState("");

  const handleChangeProductFilter = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProductFilter(e.target.value);
  };

  const handleChangePriceFilter = (value: number | null) => {
    setPriceFilter(value!);
  };

  const handleChangeBrandFilter = (brand: string) => {
    setBrandFilter(brand);
  };

  const handleChangeFilterType = (value: string) => {
    setFilterType(value);
  };

  const handleFilterKeyEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      handleSendFilterQuery();
    }
  };

  const handleResetFilter = () => {
    setFilterType("");
    setProductFilter("");
    setBrandFilter("");
    setPriceFilter(minPrice);
    setIsTableFiltered(false);
  };

  const handleSendFilterQuery = async () => {
    const filterQuery =
      filterType == "price"
        ? priceFilter
        : filterType == "brand"
        ? brandFilter
        : productFilter;

    if (!filterType || !filterQuery) {
      const message = getFilterErrorMessage(filterType, filterQuery);
      setErrorMessage(message);
      return;
    }

    ValantisApi.getFilteredProducts({
      filterType,
      filterQuery: filterQuery,
    });

    setErrorMessage("");
    setIsTableFiltered(true);
  };

  return (
    <Flex gap={"middle"} align="center">
      Категория:
      <Select
        defaultValue={filterType}
        value={filterType}
        style={{ width: 120 }}
        options={[
          { value: "product", label: "Product" },
          { value: "brand", label: "Brand" },
          { value: "price", label: "Price" },
        ]}
        onChange={handleChangeFilterType}
        onKeyDown={handleFilterKeyEnter}
      />
      Значение:
      {filterType == "brand" ? (
        <Select
          value={brandFilter}
          style={{ width: 120 }}
          options={brands.map((brand) => {
            return { value: brand, label: brand };
          })}
          onChange={handleChangeBrandFilter}
          onKeyDown={handleFilterKeyEnter}
        />
      ) : filterType == "price" ? (
        <InputNumber
          defaultValue={minPrice}
          value={priceFilter}
          min={minPrice}
          max={maxPrice}
          onChange={handleChangePriceFilter}
          onKeyDown={handleFilterKeyEnter}
          onBlur={() => !priceFilter && setPriceFilter(minPrice)}
        />
      ) : (
        <Input
          value={productFilter}
          style={{ width: 120 }}
          placeholder="Золотое кольцо..."
          onChange={handleChangeProductFilter}
          onKeyDown={handleFilterKeyEnter}
        />
      )}
      <Button onClick={handleSendFilterQuery}>Filter</Button>
      {isTableFiltered ? (
        <Button onClick={handleResetFilter}>Reset Filter</Button>
      ) : null}
      {errosMessage && <div style={{ color: "red" }}>{errosMessage}</div>}
    </Flex>
  );
};

export default TableFilter;
