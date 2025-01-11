import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Search, Copy, CheckCircle, XCircle, Clock } from "lucide-react";

const SchoolTransactions = () => {
  const [schoolId, setSchoolId] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [copied, setCopied] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    setError(null);

    if (!schoolId.trim()) {
      toast.error("Please enter a School ID");
      return;
    }

    setIsLoading(true);
    setHasSearched(true); // Only set hasSearched when actually performing the search

    try {
      const response = await axios.get(
        `https://school-payment-manage-backend.onrender.com/api/transactions/school/${schoolId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTransactions(response.data);
      if (response.data.length > 0) {
        toast.success("School transactions fetched successfully");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching transactions");
      toast.error(
        error.response?.data?.message || "Error fetching transactions"
      );
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleInputChange = (e) => {
    setSchoolId(e.target.value);
    if (!e.target.value.trim()) {
      setHasSearched(false);
      setTransactions([]);
      setError(null);
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const renderContent = () => {
    if (!hasSearched) {
      return (
        <div className="text-center py-12">
          <img
            src="https://framerusercontent.com/images/nO32MZXDPSOe0AeZ150nfEqCESM.png"
            alt="Enter School ID"
            className="mx-auto mb-4 h-[400px]"
          />
          <p className="text-gray-500">
            Enter a School ID to view transaction details
          </p>
        </div>
      );
    }

    if (hasSearched && transactions.length === 0) {
      return (
        <div className="text-center py-12">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            alt="No transactions"
            className="mx-auto mb-4 h-[400px]"
          />
          <p className="text-gray-500">
            No transactions found for this school ID
          </p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th>Collect ID</th>
              <th>Gateway</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Order ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td>{transaction.collect_id}</td>
                <td>{transaction.gateway}</td>
                <td>₹{transaction.transaction_amount}</td>
                <td>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(transaction.status)}
                    <span
                      className={`status-badge ${
                        transaction.status.toLowerCase() === "failure"
                          ? "failed"
                          : transaction.status.toLowerCase()
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                </td>
                <td>{new Date(transaction.created_at).toLocaleDateString()}</td>
                <td>{transaction.custom_order_id}</td>
                <td>
                  <button
                    onClick={() => handleCopy(transaction.custom_order_id)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    title="Copy Order ID"
                  >
                    {copied === transaction.custom_order_id ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto pt-[100px] px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <div className="relative flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter School ID..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800"
                value={schoolId}
                onChange={handleInputChange}
              />
            </div>
            <button
              onClick={fetchTransactions}
              disabled={isLoading}
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed min-w-[150px]`}
            >
              {isLoading ? "Searching..." : "Search School ID"}
            </button>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default SchoolTransactions;
