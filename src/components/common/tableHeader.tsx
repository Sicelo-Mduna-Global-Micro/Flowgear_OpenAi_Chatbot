export interface TableHeaderProps {
  columns: any;
}

const TableHeader: React.FunctionComponent<TableHeaderProps> = (props) => {
  const { columns } = props;
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            className={
              !column.addHeaderClass ? "" : " " + column.addHeaderClass
            }
            key={column.path}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
