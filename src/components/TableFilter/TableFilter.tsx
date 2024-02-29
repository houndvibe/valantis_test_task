import { Button, Flex, Input, InputNumber, Select } from "antd";
import productsStore from "../../store/productsStore";
import ValantisApi from "../../api/valantisApi";
import { useState } from "react";

const TableFilter = () => {
  const brands = productsStore.brands;
  const prices = productsStore.prices.map((price) => +price);

  const [filterType, setFilterType] = useState("");

  const [priceFilter, setPriceFilter] = useState(0);
  const [productFilter, setProductFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");

  const handleChangeFilterType = (value: string) => {
    setFilterType(value);
  };

  const handleChangePriceFilter = (price: number | null) => {
    setPriceFilter(+price!);
  };

  const handleChangeBrandFilter = (brand: string) => {
    setBrandFilter(brand);
  };

  const handleChangeProductFilter = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProductFilter(e.target.value);
  };

  const handleSendFilterQuery = async () => {
    const filterQuery =
      filterType == "price"
        ? priceFilter
        : filterType == "brand"
        ? brandFilter
        : productFilter;

    ValantisApi.getFilteredItems({
      filterType,
      filterQuery: filterQuery,
    });
  };

  return (
    <Flex gap={"middle"}>
      <Select
        defaultValue={filterType}
        style={{ width: 120 }}
        onChange={handleChangeFilterType}
        options={[
          { value: "product", label: "Product" },
          { value: "brand", label: "Brand" },
          { value: "price", label: "Price" },
        ]}
      />
      Значение:
      {filterType == "brand" ? (
        <Select
          style={{ width: 120 }}
          options={brands.map((brand) => {
            return { value: brand, label: brand };
          })}
          onChange={handleChangeBrandFilter}
        />
      ) : filterType == "price" ? (
        <InputNumber
          min={Math.min(...prices)}
          max={Math.max(...prices)}
          onChange={handleChangePriceFilter}
        />
      ) : (
        <Input
          style={{ width: 120 }}
          value={productFilter}
          onChange={handleChangeProductFilter}
        />
      )}
      <Button onClick={handleSendFilterQuery}>Filter</Button>
    </Flex>
  );
};

export default TableFilter;
