import classes from "./ProductList.module.scss";
import { Table } from "antd";
import { observer } from "mobx-react-lite";
import productsStore from "../../store/productsStore";
import { processTableData } from "../../services/services";
import { TableProductProps } from "../../api/valantisApi";
import TableFilter from "../TableFilter/TableFilter";
import { useMemo, useState } from "react";

const ProductList = observer(() => {
  const loadingStatus = productsStore.status;

  const [isTableFiltered, setIsTableFiltered] = useState(false);

  const products = isTableFiltered
    ? productsStore.filteredProducts
    : productsStore.products;

  const processedTableData = useMemo(
    () => processTableData(products),
    [products]
  );

  const handleToggleFilter = (bool: boolean) => {
    setIsTableFiltered(bool);
  };

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
    <div className={classes.list}>
      {loadingStatus !== "ok" && (
        <div className={classes.thead}>Запрашиваем данные...</div>
      )}
      <Table
        title={() => (
          <TableFilter
            onFilter={handleToggleFilter}
            isTableFiltered={isTableFiltered}
          />
        )}
        loading={loadingStatus === "ok" ? false : true}
        dataSource={processedTableData}
        columns={columns}
        pagination={{
          showSizeChanger: false,
          position: ["topCenter", "bottomCenter"],
          total: processedTableData.length,
          defaultPageSize: 50,
        }}
      />
    </div>
  );
});

export default ProductList;
