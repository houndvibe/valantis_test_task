import classes from "./ProductTable.module.scss";
import { Table } from "antd";
import { observer } from "mobx-react-lite";
import productsStore from "../../store/productsStore";
import { useMemo, useState } from "react";
import { processTableData } from "../../services/processTableData";
import Filter from "../Filter/Filter";
import columnsData from "./columnsData";

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

  return (
    <div className={classes.table}>
      {isLoading && <div className={classes.thead}>Запрашиваем данные...</div>}
      {isUploading && (
        <div className={classes.thead}>Загружаем остальное, минутку...</div>
      )}
      {isFiltering && <div className={classes.thead}>Фильтруем данные...</div>}
      <Table
        title={() => (
          <Filter
            onFilter={setIsTableFiltered}
            isTableFiltered={isTableFiltered}
          />
        )}
        loading={isLoading || isFiltering ? true : false}
        dataSource={processedTableData}
        columns={columnsData}
        pagination={{
          position: ["topCenter", "bottomCenter"],
          defaultPageSize: 50,
        }}
      />
    </div>
  );
});

export default ProductTable;
