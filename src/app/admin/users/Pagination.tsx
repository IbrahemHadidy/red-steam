// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import { setCurrentPage } from '@store/features/admin/user/userAdminSlice';

export default function Pagination() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //------------------------------- States --------------------------------//
  const { currentPage, totalPages } = useAppSelector((state) => state.admin.user);

  //--------------------------- Event Handlers ----------------------------//
  const handlePageChange = (newPage: number): void => {
    if (newPage >= 1 && newPage <= totalPages) dispatch(setCurrentPage(newPage));
  };

  //------------------------------- Render --------------------------------//
  return (
    <div className="pagination">
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>

      <span>
        Page &nbsp;
        <select value={currentPage} onChange={(e) => handlePageChange(Number(e.target.value))}>
          {Array.from({ length: totalPages }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        &nbsp; of {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}