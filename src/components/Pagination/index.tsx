import { useEffect, useState } from "react";

import SVG from "designs/SVG";

import { PaginationContainer, SizeOnTotal, SizePerPage } from "./styles";

import Select from "./components/Select";

interface IPaginationProps {
  onChangePageNext: (page: number) => void;
  onChangePagePrev: (page: number) => void;
  onSizeChange: (size: number) => void;
  totalSize: number;
  page: number;
  isShowChangeSize: boolean;
}

interface ISize {
  size: number;
}

const Pagination: React.FC<IPaginationProps> = props => {
  const {
    onSizeChange,
    onChangePageNext,
    onChangePagePrev,
    totalSize,
    page,
    isShowChangeSize,
  } = props;
  const [sizeStart, setSizeStart] = useState(1);
  const [sizeEnd, setSizeEnd] = useState(10);
  const [sizePerPage, setSizePerPage] = useState(10);

  useEffect(() => {
    const newSizeEnd = sizePerPage + sizePerPage * (page - 1);
    setSizeStart(1 + sizePerPage * (page - 1));
    totalSize && newSizeEnd > totalSize
      ? setSizeEnd(totalSize)
      : setSizeEnd(newSizeEnd);
  }, [page, totalSize]);

  const handleSelect = (option: ISize) => {
    setSizePerPage(option.size);
    onSizeChange && onSizeChange(option.size);
    totalSize && option.size > totalSize
      ? setSizeEnd(totalSize)
      : setSizeEnd(option.size);
  };

  const handleChangePageNext = (page: number) => {
    onChangePageNext && onChangePageNext(page);
  };
  const handleChangePagePrev = (page: number) => {
    onChangePagePrev && onChangePagePrev(page);
  };

  return (
    <PaginationContainer>
      {isShowChangeSize && (
        <SizePerPage.Container>
          <SizePerPage.Text>Số hàng mỗi trang :</SizePerPage.Text>
          <Select onSelect={option => handleSelect(option)} />
        </SizePerPage.Container>
      )}
      <SizeOnTotal.Container>
        {page > 1 && (
          <SVG
            name="common/table-prev"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={() => handleChangePagePrev(page)}
          />
        )}
        <SizeOnTotal.Text>
          Hiển thị từ {sizeStart} đến {sizeEnd} của {totalSize}
        </SizeOnTotal.Text>
        {totalSize !== undefined && sizeEnd < totalSize && (
          <SVG
            name="common/table-next"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={() => handleChangePageNext(page)}
          />
        )}
      </SizeOnTotal.Container>
    </PaginationContainer>
  );
};

export default Pagination;
