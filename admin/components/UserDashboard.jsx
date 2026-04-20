const UserDashboard = ({ data }) => {
  return (
    <Box padding="xl">
      <H2>Welcome, {data.name}</H2>
      <Text>Email: {data.email}</Text>
      <Text>Role: {data.role}</Text>
      <Text>My Orders: {data.myOrders}</Text>
    </Box>
  );
};