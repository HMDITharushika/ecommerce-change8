const AdminDashboard = ({ data }) => {
  return (
    <Box padding="xl">
      <H2>Admin Overview</H2>
      <Text>Total Users: {data.users}</Text>
      <Text>Total Orders: {data.orders}</Text>
      <Text>Total Products: {data.products}</Text>
    </Box>
  );
};