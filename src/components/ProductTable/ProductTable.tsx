import classes from "./ProductTable.module.scss";
import { Table } from "antd";
import { observer } from "mobx-react-lite";
import productsStore from "../../store/productsStore";
import { processTableData } from "../../services/services";
import { TableProductProps } from "../../api/valantisApi";
import TableFilter from "../TableFilter/TableFilter";
import { useMemo, useState } from "react";

const ProductTable = observer(() => {
  const isLoading = productsStore.isLoading;
  const isUploading = productsStore.isUploading;

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
      title: "Product",
      dataIndex: "product",
      key: "product",
      filterSearch: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "aprice",
      sorter: {
        compare: (a: TableProductProps, b: TableProductProps) =>
          a.price - b.price,
        multiple: 1,
      },
    },
    {
      title: "Brand",
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
      <Table
        title={() => (
          <TableFilter
            onFilter={setIsTableFiltered}
            isTableFiltered={isTableFiltered}
          />
        )}
        loading={isLoading ? true : false}
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
