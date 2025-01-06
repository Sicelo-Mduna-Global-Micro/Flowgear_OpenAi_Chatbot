import _ from "lodash";
import React, { FunctionComponent } from "react";

interface TableBodyClassProps {
  data: any;
  columns: any;
}

const TableBodyClass: FunctionComponent<TableBodyClassProps> = (props) => {
  const { data, columns } = props;

  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  return (
    <tbody>
      {data.map((item, index) => (
        <tr key={index}>
          {columns.map((column) => (
            <td
              className={
                !column.addClass
                  ? "data-table-item"
                  : "data-table-item " + column.addClass
              }
              key={index + column.path}
            >
              {renderCell(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBodyClass;
