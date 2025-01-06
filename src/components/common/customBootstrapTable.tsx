import { FunctionComponent, useEffect, useRef } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from "react-bootstrap-table2-paginator";

interface CustomBootstrapTableProps {
  columns: any;
  data: any;
  pageSize: number;
  keyField: string;
  defaultSorted: any;
  selectRow?: any;
  containerId?: string;
  expandRow?: any;
}

const CustomBootstrapTable: FunctionComponent<CustomBootstrapTableProps> = (
  props
) => {
  const {
    columns,
    data,
    pageSize,
    keyField,
    defaultSorted,
    selectRow,
    containerId,
    expandRow,
  } = props;

  const paginationOptions = {
    //page: 1,
    paginationSize: 10,
    pageStartIndex: 1,
    sizePerPage: pageSize,
    custom: true,
    totalSize: data.length,
    //alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    hideSizePerPage: true, // Hide the sizePerPage dropdown always
    hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: "First",
    prePageText: "Prev",
    nextPageText: "Next",
    lastPageText: "Last",
    //nextPageTitle: "First page",
    //prePageTitle: "Pre page",
    //firstPageTitle: "Next page",
    //lastPageTitle: "Last page",
    //showTotal: true,
    //paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    onPageChange: (page, sizePerPage) => {
      if (!containerId) {
        document
          .getElementById("content-area")
          .scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document
          .getElementById(containerId)
          .scrollTo({ top: 0, behavior: "smooth" });
      }
    },
  };

  return (
    <PaginationProvider pagination={paginationFactory(paginationOptions)}>
      {({ paginationProps, paginationTableProps }) => (
        <div>
          <BootstrapTable
            keyField={keyField}
            data={data}
            columns={columns}
            //className="table"
            bordered={false}
            defaultSorted={defaultSorted}
            selectRow={selectRow}
            expandRow={expandRow}
            {...paginationTableProps}
          />
          <PaginationListStandalone {...paginationProps} />
        </div>
      )}
    </PaginationProvider>
  );
};

export default CustomBootstrapTable;
