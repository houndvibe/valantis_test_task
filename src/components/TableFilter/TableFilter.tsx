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

  const [filterType, setFilterType] = useState("");

  const [brandFilter, setBrandFilter] = useState("");
  const [productFilter, setProductFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState(Math.min(...prices));

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

  const handleResetFilter = () => {
    setFilterType("");
    setProductFilter("");
    setBrandFilter("");
    setPriceFilter(Math.min(...prices));
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
      setErrorMessage(message!);
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
    <Flex gap={"middle"}>
      Тип:
      <Select
        defaultValue={filterType}
        style={{ width: 120 }}
        value={filterType}
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
          value={brandFilter}
          style={{ width: 120 }}
          options={brands.map((brand) => {
            return { value: brand, label: brand };
          })}
          onChange={handleChangeBrandFilter}
        />
      ) : filterType == "price" ? (
        <InputNumber
          value={priceFilter}
          min={Math.min(...prices)}
          max={Math.max(...prices)}
          defaultValue={Math.min(...prices)}
          onChange={handleChangePriceFilter}
          onBlur={() => !priceFilter && setPriceFilter(Math.min(...prices))}
        />
      ) : (
        <Input
          value={productFilter}
          placeholder="Золотое кольцо..."
          style={{ width: 120 }}
          onChange={handleChangeProductFilter}
        />
      )}
      <Button onClick={handleSendFilterQuery}>Filter</Button>
      {isTableFiltered ? (
        <Button onClick={handleResetFilter}>Reset Filter</Button>
      ) : null}
      {errosMessage ? <div style={{ color: "red" }}>{errosMessage}</div> : null}
    </Flex>
  );
};

export default TableFilter;
