import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Search, Copy, CheckCircle, XCircle, Clock } from "lucide-react";

const TransactionStatus = () => {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!orderId.trim()) {
      toast.error("Please enter an Order ID");
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await axios.get(
        `https://school-payment-manage-backend.onrender.com/api/transactions/check-status/${orderId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response);
      setStatus(response.data);
    } catch (error) {
      toast.error("Error checking transaction status");
      setStatus(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setOrderId(e.target.value);
    if (!e.target.value.trim()) {
      setHasSearched(false);
      setStatus(null);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "success":
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case "Failed":
        return <XCircle className="w-8 h-8 text-red-500" />;
      case "failure":
        return <XCircle className="w-8 h-8 text-red-500" />;
      default:
        return <Clock className="w-8 h-8 text-yellow-500" />;
    }
  };

  const renderContent = () => {
    if (!hasSearched) {
      return (
        <div className="text-center py-12">
          <img
            src="https://framerusercontent.com/images/nO32MZXDPSOe0AeZ150nfEqCESM.png"
            alt="Enter Order ID"
            className="mx-auto mb-4 h-[400px]"
          />
          <p className="text-gray-500">
            Enter an Order ID to view transaction details
          </p>
        </div>
      );
    }

    if (hasSearched && !status) {
      return (
        <div className="text-center py-12">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            alt="No transaction found"
            className="mx-auto mb-4 h-[400px]"
          />
          <p className="text-gray-500">
            No transaction found for this Order ID
          </p>
        </div>
      );
    }
    if (status) {
      return (
        <div className="animate-fade-in">
          <div className="flex flex-col items-center mb-8">
            {getStatusIcon(status.status)}
            <h2 className="text-2xl font-bold mt-4 mb-2">
              Transaction
              <span
                className={`ml-3 status-badge ${
                  status.status.toLowerCase() === "failure"
                    ? "failed"
                    : status.status.toLowerCase()
                }`}
              >
                {status.status}
              </span>
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 dark:text-gray-400">
                Order ID:
              </span>
              <span className="font-medium">{status.custom_order_id}</span>
              <button
                onClick={handleCopy}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                title="Copy Order ID"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-800">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Amount
              </h3>
              <p className="text-lg font-semibold">
                ₹{status.transaction_amount}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-800">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Order Amount
              </h3>
              <p className="text-lg font-semibold">₹{status.order_amount}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-800">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Date
              </h3>
              <p className="text-lg font-semibold">
                {new Date(status.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-800">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Gateway
              </h3>
              <p className="text-lg font-semibold">{status.gateway}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-800">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                School ID
              </h3>
              <p className="text-lg font-semibold">{status.school_id}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-800">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Collect ID
              </h3>
              <p className="text-lg font-semibold">{status.collect_id}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-800">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Bank Reference
              </h3>
              <p className="text-lg font-semibold">{status.bank_reference}</p>
            </div>
          </div>
        </div>
      );
    }

    // if (status) {
    //   return (
    //     <div className="animate-fade-in flex justify-center items-center py-10">
    //       <div className="flex flex-col items-center mb-8 space-y-6">
    //         {getStatusIcon(status.status)}
    //         <h2 className="text-3xl font-bold mt-4 mb-2 text-center">
    //           Transaction
    //           <span
    //             className={`ml-3 status-badge ${
    //               status.status.toLowerCase() === 'failure'
    //                 ? 'failed'
    //                 : status.status.toLowerCase()
    //             }`}
    //           >
    //             {status.status}
    //           </span>
    //         </h2>
    //         <div className="flex items-center gap-2">
    //           <span className="text-gray-500 dark:text-gray-400">Order ID:</span>
    //           <span className="font-medium">{status.custom_order_id}</span>
    //           <button
    //             onClick={handleCopy}
    //             className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
    //             title="Copy Order ID"
    //           >
    //             {copied ? (
    //               <CheckCircle className="w-4 h-4 text-green-500" />
    //             ) : (
    //               <Copy className="w-4 h-4" />
    //             )}
    //           </button>
    //         </div>
    //       </div>

    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    //         <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-800">
    //           <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
    //             Amount
    //           </h3>
    //           <p className="text-lg font-semibold">₹{status.transaction_amount}</p>
    //         </div>

    //         <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-800">
    //           <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
    //             Order Amount
    //           </h3>
    //           <p className="text-lg font-semibold">₹{status.order_amount}</p>
    //         </div>

    //         <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-800">
    //           <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
    //             Date
    //           </h3>
    //           <p className="text-lg font-semibold">
    //             {new Date(status.created_at).toLocaleDateString()}
    //           </p>
    //         </div>

    //         <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-800">
    //           <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
    //             Gateway
    //           </h3>
    //           <p className="text-lg font-semibold">{status.gateway}</p>
    //         </div>

    //         <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-800">
    //           <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
    //             School ID
    //           </h3>
    //           <p className="text-lg font-semibold">{status.school_id}</p>
    //         </div>

    //         <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-800">
    //           <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
    //             Collect ID
    //           </h3>
    //           <p className="text-lg font-semibold">{status.collect_id}</p>
    //         </div>

    //         <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-800">
    //           <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
    //             Bank Reference
    //           </h3>
    //           <p className="text-lg font-semibold">{status.bank_reference}</p>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }
  };

  return (
    <div className="max-w-7xl mx-auto pt-[100px] px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter Order ID..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800"
                value={orderId}
                onChange={handleInputChange}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed min-w-[150px]`}
            >
              {isLoading ? "Checking..." : "Check Status"}
            </button>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default TransactionStatus;
