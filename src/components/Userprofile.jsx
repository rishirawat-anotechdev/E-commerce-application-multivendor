import React, { useState } from 'react';
import { Box, Typography, Avatar, List, ListItem, ListItemText, ListItemIcon, Button, Divider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReviewsIcon from '@mui/icons-material/Reviews';
import DownloadIcon from '@mui/icons-material/Download';
import ReturnIcon from '@mui/icons-material/AssignmentReturn';
import AddressIcon from '@mui/icons-material/LocationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';

// Fake data for each section
const ordersData = [
  { id: 1, product: 'Laptop', date: '2024-09-12', status: 'Delivered' },
  { id: 2, product: 'Phone', date: '2024-09-15', status: 'Processing' },
];

const reviewsData = [
  { id: 1, product: 'Laptop', rating: 5, comment: 'Great product!' },
  { id: 2, product: 'Phone', rating: 4, comment: 'Good value for money.' },
];

const downloadsData = [
  { id: 1, product: 'Ebook - How to code', downloadLink: '#' },
  { id: 2, product: 'PDF - React Guide', downloadLink: '#' },
];

const returnRequestsData = [
  { id: 1, product: 'Headphones', reason: 'Faulty item', status: 'Pending' },
];

const addressesData = [
  { id: 1, address: '1234 Main St, New York, NY', type: 'Home' },
  { id: 2, address: '5678 Oak St, Los Angeles, CA', type: 'Office' },
];

const UserProfile = () => {
  // State to manage selected tab
  const [selectedTab, setSelectedTab] = useState('overview');

  // Function to render content based on selected tab
  const renderContent = () => {
    switch (selectedTab) {
      case 'overview':
        return <Typography>No orders have been made yet. Browse products now!</Typography>;

      case 'orders':
        return ordersData.map((order) => (
          <Box key={order.id} mb={2} p={2} bgcolor="white" sx={{ borderRadius: '8px', boxShadow: 1 }}>
            <Typography><strong>Product:</strong> {order.product}</Typography>
            <Typography><strong>Date:</strong> {order.date}</Typography>
            <Typography><strong>Status:</strong> {order.status}</Typography>
          </Box>
        ));

      case 'cart':
        return reviewsData.map((review) => (
          <Box key={review.id} mb={2} p={2} bgcolor="white" sx={{ borderRadius: '8px', boxShadow: 1 }}>
            <Typography><strong>Product:</strong> {review.product}</Typography>
            <Typography><strong>Rating:</strong> {review.rating} / 5</Typography>
            <Typography><strong>Comment:</strong> {review.comment}</Typography>
          </Box>
        ));

      case 'wishlist':
        return downloadsData.map((download) => (
          <Box key={download.id} mb={2} p={2} bgcolor="white" sx={{ borderRadius: '8px', boxShadow: 1 }}>
            <Typography><strong>Product:</strong> {download.product}</Typography>
            <Button href={download.downloadLink} variant="contained" color="primary">Download</Button>
          </Box>
        ));

      case 'returnRequests':
        return returnRequestsData.map((request) => (
          <Box key={request.id} mb={2} p={2} bgcolor="white" sx={{ borderRadius: '8px', boxShadow: 1 }}>
            <Typography><strong>Product:</strong> {request.product}</Typography>
            <Typography><strong>Reason:</strong> {request.reason}</Typography>
            <Typography><strong>Status:</strong> {request.status}</Typography>
          </Box>
        ));

      case 'addresses':
        return addressesData.map((address) => (
          <Box key={address.id} mb={2} p={2} bgcolor="white" sx={{ borderRadius: '8px', boxShadow: 1 }}>
            <Typography><strong>Address:</strong> {address.address}</Typography>
            <Typography><strong>Type:</strong> {address.type}</Typography>
          </Box>
        ));

      case 'settings':
        return (
          <Box mb={2} p={2} bgcolor="white" sx={{ borderRadius: '8px', boxShadow: 1 }}>
            <Typography>Update your account settings like password and email.</Typography>
          </Box>
        );

      

      default:
        return <Typography>Select an option from the menu to view details.</Typography>;
    }
  };

  return (
    <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} p={2}>
      {/* Left Sidebar */}
      <Box 
        width={{ xs: '100%', md: '250px' }} 
        bgcolor="#f7f7f7" 
        p={2}
        sx={{ borderRadius: '8px', boxShadow: 1 }}
      >
        <Avatar
          alt="Chad Hamill"
          src="https://i.pravatar.cc/150?img=3"
          sx={{ width: 70, height: 70, mb: 2 }}
        />
        <Typography variant="h6" gutterBottom>Hello, Chad Hamill</Typography>
        <Typography variant="h10" gutterBottom sx={{display:"flex", alignItems:"center", gap:2, mt:-2, mb:2}}>Joined on <p> 21/04/2024</p></Typography>
        <List component="nav">
          <ListItem button selected={selectedTab === 'overview'} onClick={() => setSelectedTab('overview')}>
            <ListItemText primary="Overview" />
          </ListItem>
          <Divider />
          <ListItem button selected={selectedTab === 'orders'} onClick={() => setSelectedTab('orders')}>
            <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem button selected={selectedTab === 'cart'} onClick={() => setSelectedTab('cart')}>
            <ListItemIcon><ReviewsIcon /></ListItemIcon>
            <ListItemText primary="Cart" />
          </ListItem>
          <ListItem button selected={selectedTab === 'wishlist'} onClick={() => setSelectedTab('wishlist')}>
            <ListItemIcon><DownloadIcon /></ListItemIcon>
            <ListItemText primary="Wishlist" />
          </ListItem>
          <ListItem button selected={selectedTab === 'returnRequests'} onClick={() => setSelectedTab('returnRequests')}>
            <ListItemIcon><ReturnIcon /></ListItemIcon>
            <ListItemText primary="Order Return Requests" />
          </ListItem>
          <ListItem button selected={selectedTab === 'addresses'} onClick={() => setSelectedTab('addresses')}>
            <ListItemIcon><AddressIcon /></ListItemIcon>
            <ListItemText primary="Addresses" />
          </ListItem>
          <ListItem button selected={selectedTab === 'settings'} onClick={() => setSelectedTab('settings')}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Account Settings" />
          </ListItem>
      
          <Divider />
          <ListItem button>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>

      {/* Main Content Area */}
      <Box 
        flexGrow={1} 
        p={2} 
        ml={{ md: 2 }} 
        sx={{ backgroundColor: '#f0fdf4', borderRadius: '8px', boxShadow: 1, minHeight: '300px' }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
};

export default UserProfile;
