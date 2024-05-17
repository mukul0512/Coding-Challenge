import React, { useState, useEffect } from 'react';
import TransactionTable from './components/TransactionTable';
import MonthDropdown from './components/MonthDropdown';
import SearchInput from './components/SearchInput';
import Pagination from './components/Pagination';

function App() {
    const [transactions, setTransactions] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('March');
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchTransactions(selectedMonth, searchText, currentPage);
    }, [selectedMonth, searchText, currentPage]);

    const fetchTransactions = (month, search, page) => {
        // Fetch transactions from API based on month, search, and page
        fetch(`http://localhost:3000/api/transactions?month=${month}&search=${search}&page=${page}`)
            .then(response => response.json())
            .then(data => {
                setTransactions(data.transactions);
                setTotalPages(Math.ceil(data.total / 10)); // Assuming 10 transactions per page
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const handleMonthChange = (month) => {
        setSelectedMonth(month);
    };

    const handleSearch = (text) => {
        setSearchText(text);
    };

    const handlePageChange = (direction) => {
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            <h1>Transactions Dashboard</h1>
            <MonthDropdown selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
            <SearchInput value={searchText} onChange={handleSearch} />
            <TransactionTable transactions={transactions} />
            <Pagination onPageChange={handlePageChange} hasNextPage={currentPage < totalPages} hasPrevPage={currentPage > 1} />
        </div>
    );
}

export default App;
