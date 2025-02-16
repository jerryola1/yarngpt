"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { queryHuggingFace } from "@/lib/huggingface";

export default function ApiTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [responseDetails, setResponseDetails] = useState<string | null>(null);

  const testConnection = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setResponseDetails(null);

    try {
      console.log('Starting API test...');
      const response = await queryHuggingFace("Hello, this is a test.", "idera");
      const responseText = await response.text();
      console.log('Response received:', responseText);
      
      setSuccess(true);
      setResponseDetails(responseText);
    } catch (err) {
      console.error('Test failed:', err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Button onClick={testConnection} disabled={isLoading}>
        {isLoading ? "Testing..." : "Test API Connection"}
      </Button>
      {error && (
        <div className="text-red-500 p-4 bg-red-50 rounded-md">
          <p className="font-bold">Error:</p>
          <pre className="whitespace-pre-wrap text-sm">{error}</pre>
        </div>
      )}
      {success && (
        <div className="text-green-500 p-4 bg-green-50 rounded-md">
          <p className="font-bold">API connection successful!</p>
          {responseDetails && (
            <pre className="whitespace-pre-wrap text-sm mt-2">{responseDetails}</pre>
          )}
        </div>
      )}
    </div>
  );
} 