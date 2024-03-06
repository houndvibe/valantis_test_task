import { TableProductProps } from "../../types/interfaces";

export default [
  {
    title: "№",
    dataIndex: "index",
    key: "index",
    sorter: {
      compare: (a: TableProductProps, b: TableProductProps) =>
        a.index - b.index,
      multiple: 2,
    },
  },
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Наименование",
    dataIndex: "product",
    key: "product",
    filterSearch: true,
  },
  {
    title: "Цена",
    dataIndex: "price",
    key: "price",
    sorter: {
      compare: (a: TableProductProps, b: TableProductProps) =>
        a.price - b.price,
      multiple: 1,
    },
  },
  {
    title: "Бренд",
    dataIndex: "brand",
    key: "brand",
  },
];
