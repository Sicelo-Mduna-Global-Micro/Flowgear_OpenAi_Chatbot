import _ from "lodash";
export interface TableBodyProps {
  data: any;
  columns: any;
}

const TableBody: React.FunctionComponent<TableBodyProps> = (props) => {
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
            <td className="data-table-item" key={index + column.path}>
              {renderCell(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
