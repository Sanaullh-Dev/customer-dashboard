import React from 'react';
import { Customer } from '../types';
import './CustomerTable.css';

interface CustomerTableProps {
  customers: Customer[];
  onDeleteCustomer: (id: number) => Promise<void>;
  isLoading?: boolean;
}

/**
 * CustomerTable component for displaying and managing customers
 */
const CustomerTable: React.FC<CustomerTableProps> = ({ 
  customers, 
  onDeleteCustomer, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="customer-table-container">
        <h2>Customer List</h2>
        <div className="loading">Loading customers...</div>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="customer-table-container">
        <h2>Customer List</h2>
        <div className="empty-state">
          <p>No customers found. Add your first customer above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="customer-table-container">
      <h2>Customer List ({customers.length})</h2>
      <div className="table-wrapper">
        <table className="customer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => onDeleteCustomer(customer.id)}
                    title="Delete customer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
