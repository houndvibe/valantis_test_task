import classes from "./ProductTable.module.scss";
import { Table } from "antd";
import { observer } from "mobx-react-lite";
import productsStore from "../../store/productsStore";

import TableFilter from "../TableFilter/TableFilter";
import { useMemo, useState } from "react";
import { TableProductProps } from "../../types/interfaces";
import { processTableData } from "../../services/processTableData";

const ProductTable = observer(() => {
  const isLoading = productsStore.isLoading;
  const isUploading = productsStore.isUploading;
  const isFiltering = productsStore.isFiltering;

  const [isTableFiltered, setIsTableFiltered] = useState(false);

  const products = isTableFiltered
    ? productsStore.filteredProducts
    : productsStore.products;

  const processedTableData = useMemo(
    () => processTableData(products),
    [products]
  );

  const columns = [
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

  return (
    <div className={classes.table}>
      {isLoading && <div className={classes.thead}>Запрашиваем данные...</div>}
      {isUploading && (
        <div className={classes.thead}>Загружаем остальное, минутку...</div>
      )}
      {isFiltering && <div className={classes.thead}>Фильтруем данные...</div>}
      <Table
        title={() => (
          <TableFilter
            onFilter={setIsTableFiltered}
            isTableFiltered={isTableFiltered}
          />
        )}
        loading={isLoading || isFiltering ? true : false}
        dataSource={processedTableData}
        columns={columns}
        pagination={{
          position: ["topCenter", "bottomCenter"],
          defaultPageSize: 50,
        }}
      />
    </div>
  );
});

export default ProductTable;
