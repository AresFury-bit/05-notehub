
import ReactPaginate from 'react-paginate';



  interface ReactPaginateProps{
      page: number;
      perPage: number;
      setPage: (page:number) => void;
  }

export default function Pagination({ page, perPage, setPage }:ReactPaginateProps) {

  
  return (
    <>
          <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={({ selected }) => setPage(selected + 1)}
              forcePage={page-1}
        pageRangeDisplayed={12}
        pageCount={perPage}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}