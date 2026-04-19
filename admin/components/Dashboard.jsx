import React, { useEffect, useState } from "react";
import { ApiClient } from "adminjs";
import { Box, H2, Text, Illustration } from "@adminjs/design-system";

const api = new ApiClient();

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.getDashboard()
      .then((res) => {
        setData(res.data);
      })
      .catch(err => {
        console.error("Dashboard API Error:", err);
      });
  }, []);

  if (!data) return (
    <Box variant="grey" textAlign="center" padding="xl">
       <Text>Loading Dashboard Data...</Text>
    </Box>
  );

  return (
    <Box variant="grey" padding="xl">
      {data.role === "admin" ? (
        <Box variant="white" padding="lg" boxShadow="card">
          <H2>Admin Overview</H2>
          <Text>Total Users: **{data.users}**</Text>
          <Text>Total Orders: **{data.orders}**</Text>
          <Text>Total Products: **{data.products}**</Text>
        </Box>
      ) : (
        <Box variant="white" padding="lg" boxShadow="card">
          <H2>Welcome, {data.name}</H2>
          <Text>Email: {data.email}</Text>
          <Text>My Total Orders: **{data.myOrders}**</Text>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;