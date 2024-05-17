import React, { useState, useEffect } from 'react';

const TransactionTable = ({ transactions }) => {
    return (
        <table style={{ backgroundColor: 'lightyellow' }}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map(transaction => (
                    <tr key={transaction.id}>
                        <td>{transaction.id}</td>
                        <td>{transaction.title}</td>
                        <td>{transaction.price}</td>
                        <td>{transaction.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TransactionTable;
