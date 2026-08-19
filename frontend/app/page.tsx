"use client";

import { useEffect, useState } from "react";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  status: string;
}

const BUSINESS_ID = "cmsysxus80000f09bgqka8yx1";

export default function Home() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/customers/${BUSINESS_ID}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data.customers);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">
          ClinicFlow
        </h1>

        <p className="mt-2 text-gray-600">
          WhatsApp Automation Dashboard
        </p>

        <div className="mt-8 rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold">
            Customers
          </h2>

          {loading ? (
            <p className="mt-4">Loading customers...</p>
          ) : customers.length === 0 ? (
            <p className="mt-4 text-gray-500">
              No customers found.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {customers.map((customer) => (
                <div
                  key={customer.id}
                  className="rounded-lg border p-4"
                >
                  <h3 className="font-semibold">
                    {customer.name}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {customer.phone}
                  </p>

                  {customer.email && (
                    <p className="text-sm text-gray-500">
                      {customer.email}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}