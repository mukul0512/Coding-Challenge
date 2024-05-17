import React from 'react';

const SearchInput = ({ value, onChange }) => {
    return (
        <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder="Search transactions..." />
    );
};

export default SearchInput;
