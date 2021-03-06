import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import TicketView from 'src/views/ticket/TicketView'
import SMSView from 'src/views/sms/SMSView'
import ReportsVoucherView from 'src/views/reportsVoucher/ReportsVoucherView'

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'ticket', element: <TicketView /> },
      { path: 'sms', element: <SMSView /> },
      { path : 'reports-voucher' , element : <ReportsVoucherView />},
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: window.localStorage.auth ? <Navigate to="/app/ticket" /> : <Navigate to="/login" />  }, //Chuyển hướng đầu trang
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
