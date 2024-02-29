import classes from "./ProductList.module.scss";
import { Table } from "antd";
import { observer } from "mobx-react-lite";
import productsStore from "../../store/productsStore";
import { processTableData } from "../../services/services";
import { TableProductProps } from "../../api/valantisApi";
import TableFilter from "../TableFilter/TableFilter";

const ProductList = observer(() => {
  const products = productsStore.products;
  const loadingStatus = productsStore.status;
  const length = productsStore.length;
  const processedTableData = processTableData(products);

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
        title={() => <TableFilter />}
        loading={loadingStatus === "ok" ? false : true}
        dataSource={processedTableData}
        columns={columns}
        pagination={{
          position: ["topCenter", "bottomCenter"],
          total: length,
          defaultPageSize: 50,
        }}
      />
    </div>
  );
});

export default ProductList;
