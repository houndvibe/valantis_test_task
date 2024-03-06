import { Select } from "antd";
import { SelectFilterTypeProps } from "../../types/interfaces";

const SelectFilterType: React.FC<SelectFilterTypeProps> = ({
  value,
  onKeyDown,
  onChange,
}) => {
  return (
    <>
      {"Категория:"}
      <Select
        value={value}
        style={{ width: 120 }}
        options={[
          { value: "product", label: "Наименование" },
          { value: "brand", label: "Бренд" },
          { value: "price", label: "Цена" },
        ]}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </>
  );
};

export default SelectFilterType;
