import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { connect } from "react-redux";

const PaginationItems = (props) => {
  let items = [];
  for (let i = 1; i <= props.totalPages; i++){
    items.push(
      <PaginationItem active={i === props.current } key={i}>
        <PaginationLink href={`?pageNumber=${i}`}>{i}</PaginationLink>
    </PaginationItem>  
    )
  }
  return items;
};


const ShahbaPagination = (props) => {
  
  console.log(props.queryParams)
  const { pagination } = props;
  return (
    pagination.TotalPages > 1 ?
      (<Pagination>
      <PaginationItem disabled={pagination.CurrentPage === 1}>
            <PaginationLink previous href={`?pageNumber${pagination.CurrentPage -1}`} />
      </PaginationItem>
    
      <PaginationItems totalPages={pagination.TotalPages} current={pagination.CurrentPage}></PaginationItems>
      
      <PaginationItem disabled={pagination.CurrentPage === pagination.TotalPages}>
        <PaginationLink next href={`?pageNumber=${pagination.CurrentPage + 1}`} />
      </PaginationItem>
      </Pagination>)
      : ""
      
    )
}

const mapStateToProps = (state) => (
  {
  pagination: state.products.pagination,
  }
);

export default connect(mapStateToProps, null)(ShahbaPagination);