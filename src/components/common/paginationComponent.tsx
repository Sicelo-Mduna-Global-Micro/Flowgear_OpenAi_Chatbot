import _ from "lodash";
import { Pagination } from "react-bootstrap";

export interface PaginationComponentProps {
  itemsCount: number;
  pageSize: number;
  onPageChange: any;
  currentPage: number;
}

const PaginationComponent: React.FunctionComponent<PaginationComponentProps> = (
  props
) => {
  const {
    itemsCount,
    pageSize,
    onPageChange: onHandlePageChange,
    currentPage,
  } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <Pagination>
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          onClick={() => onHandlePageChange(page)}
          active={page === currentPage}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default PaginationComponent;
