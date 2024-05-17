import React from 'react';

const Pagination = ({ onPageChange, hasNextPage, hasPrevPage }) => {
    return (
        <div>
            <button disabled={!hasPrevPage} onClick={() => onPageChange('prev')}>Previous</button>
            <button disabled={!hasNextPage} onClick={() => onPageChange('next')}>Next</button>
        </div>
    );
};

export default Pagination;
