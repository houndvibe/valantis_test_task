import classes from "./ProductList.module.scss";
import { Table } from "antd";
import { observer } from "mobx-react-lite";
import productsStore from "../../store/productsStore";
import { processTableData } from "../../services/services";
import { TableProductProps } from "../../api/valantisApi";

const ProductList = observer(() => {
  const tableData = productsStore.products;
  const loadingStatus = productsStore.status;
  const processedData = processTableData(tableData);

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
        loading={loadingStatus === "ok" ? false : true}
        dataSource={processedData}
        columns={columns}
        pagination={{
          position: ["topCenter", "bottomCenter"],
          total: 8000,
          defaultPageSize: 50,
        }}
      />
    </div>
  );
});

export default ProductList;
