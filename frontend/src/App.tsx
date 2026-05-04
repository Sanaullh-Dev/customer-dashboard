import React, { useState, useEffect, useCallback } from 'react';
import CustomerForm from './components/CustomerForm';
import CustomerTable from './components/CustomerTable';
import LoginPage from './components/LoginPage';
import { Customer, CustomerFormData, CustomerListResponse, CustomerResponse, ApiErrorResponse } from './types';
import './App.css';

const API_BASE_URL = '/customers';

/**
 * Main App component for Customer Management Dashboard
 */
const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!sessionStorage.getItem('authToken');
  });

  /**
   * Handles successful login
   * @param token - JWT token from login
   */
  const handleLoginSuccess = (token: string): void => {
    setIsAuthenticated(true);
    // Token is already stored in sessionStorage by LoginPage
    console.log('Login successful, token stored in session storage');
  };

  /**
   * Handles user logout
   */
  const handleLogout = (): void => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setCustomers([]);
  };

  /**
   * Gets the auth token from session storage
   */
  const getAuthToken = (): string | null => {
    return sessionStorage.getItem('authToken');
  };

  /**
   * Fetches all customers from the API
   */
  const fetchCustomers = useCallback(async (): Promise<void> => {
    const token = getAuthToken();
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(API_BASE_URL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 401) {
        handleLogout();
        return;
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      
      const data: CustomerListResponse = await response.json();
      setCustomers(data.customers || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error fetching customers:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Adds a new customer via API
   * @param customerData - Customer data to add
   */
  const handleAddCustomer = async (customerData: CustomerFormData): Promise<void> => {
    const token = getAuthToken();
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      setError(null);
      
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(customerData)
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (!response.ok) {
        const errorData: ApiErrorResponse = await response.json();
        throw new Error(errorData.error || 'Failed to add customer');
      }

      const data: CustomerResponse = await response.json();
      setCustomers(prev => [...prev, data.customer]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    }
  };

  /**
   * Deletes a customer via API
   * @param customerId - ID of customer to delete
   */
  const handleDeleteCustomer = async (customerId: number): Promise<void> => {
    const token = getAuthToken();
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/${customerId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (!response.ok) {
        const errorData: ApiErrorResponse = await response.json();
        throw new Error(errorData.error || 'Failed to delete customer');
      }

      setCustomers(prev => prev.filter(c => c.id !== customerId));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error deleting customer:', err);
    }
  };

  // Fetch customers on component mount when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCustomers();
    }
  }, [fetchCustomers, isAuthenticated]);

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Customer Management Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-banner">
            <span>{error}</span>
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}

        <CustomerForm onAddCustomer={handleAddCustomer} />
        
        <CustomerTable
          customers={customers}
          onDeleteCustomer={handleDeleteCustomer}
          isLoading={isLoading}
        />
      </main>

      <footer className="app-footer">
        <p>Customer Management Dashboard</p>
      </footer>
    </div>
  );
};

export default App;
