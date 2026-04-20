import React, { useEffect, useState } from "react";
import { ApiClient } from "adminjs";
import { Box, H2, Text } from "@adminjs/design-system";

const api = new ApiClient();

/* ---------------- ADMIN DASHBOARD ---------------- */
const AdminDashboard = ({ data }) => {
  return (
    <Box>
      {/* TOP */}
      <Box marginBottom="xl">
        <H2 style={{fontWeight: "bold"}}>Admin Overview</H2>
        <Text opacity={0.6}>Welcome, Admin</Text>
      </Box>

      {/* CARDS */}
      <Box display="flex" gap="20px" flexWrap="wrap">

        <Box flex="1" minWidth="200px" padding="xl" border="1px solid #ddd" style={{ background: "#4F46E5", color: "white" }}>
          <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
            {data.users}
          </Text>
          <Text>Total Users</Text>
        </Box>

        <Box flex="1" minWidth="200px" padding="xl" border="1px solid #ddd"  style={{ background: "#10B981", color: "white" }}
>
          <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
            {data.orders}
          </Text>
          <Text>Total Orders</Text>
        </Box>

        <Box flex="1" minWidth="200px" padding="xl" border="1px solid #ddd" style={{ background: "#F59E0B", color: "white" }}
        >
          <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
            {data.products}
          </Text>
          <Text>Total Products</Text>
        </Box>

      </Box>

      {/* SIMPLE GRAPH */}
      <Box marginTop="xl" padding="xl" border="1px solid #ddd">
        <H2>Weekly Orders</H2>

        <svg width="100%" height="150" viewBox="0 0 300 100">
          <polyline
            fill="none"
            stroke="black"
            strokeWidth="2"
            points="0,80 50,60 100,70 150,40 200,50 250,20 300,30"
          />
        </svg>
      </Box>
    </Box>
  );
};

/* ---------------- USER DASHBOARD ---------------- */
const UserDashboard = ({ data }) => {
  return (
    <Box>
      {/* TOP */}
      <Box marginBottom="xl">
        <H2 style={{fontWeight: "bold"}}>User Dashboard</H2>
        <Text opacity={0.6}>Welcome, {data.name}</Text>
      </Box>

      {/* USER INFO */}
      <Box padding="xl" border="1px solid #ddd" style={{background: "#4F46E5", color: "white" }}>

        <Text><b>Name:</b> {data.name}</Text>
        <Text><b>Email:</b> {data.email}</Text>
        <Text><b>Role:</b> {data.role}</Text>
        <Text><b>My Orders:</b> {data.myOrders}</Text>

      </Box>
    </Box>
  );
};

/* ---------------- MAIN DASHBOARD ---------------- */
const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .getDashboard()
      .then((res) => setData(res.data))
      .catch((err) => console.error("Dashboard Error:", err));
  }, []);

  if (!data) {
    return (
      <Box padding="xl">
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <Box padding="xl">
      {data.role === "admin" ? (
        <AdminDashboard data={data} />
      ) : (
        <UserDashboard data={data} />
      )}
    </Box>
  );
};

export default Dashboard;