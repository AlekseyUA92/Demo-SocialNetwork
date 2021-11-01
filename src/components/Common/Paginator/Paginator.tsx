import React, { useState } from 'react';
import styles from './Paginator.module.css';
import cn from 'classnames';

type PropsType = {
  totalItemsCount: number
  pageSize: number
  currentPage?: number
  portionSize?: number
  onPageChanged?: (pageNumber: number) => void
}

let Paginator: React.FC<PropsType> = ({
  totalItemsCount,
  pageSize,
  currentPage = 1,
  onPageChanged = x => x,
  portionSize = 10
}) => {
  let [portionNumber, setPortionNumber] = useState(1);
  
  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pages: Array<number> = [];
  for (let i = 1; i < pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let RightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={styles.paginator}>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          Previous
        </button>
      )}
      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= RightPortionPageNumber
        )
        .map((p) => {
          return (
            <span
              key={p}
              className={cn(
                { [styles.selectedPage]: currentPage === p },
                styles.pageNumber
              )}
              onClick={(e) => {
                onPageChanged(p);
              }}
            >
              {p}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Paginator;
