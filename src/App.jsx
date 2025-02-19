import React from 'react'
import Admin from './Components/Admin'
import Panel from './Components/Admin-Panel'
import {Route,Routes} from "react-router-dom"
import Meal from './Components/User/Meal-plan'
import Wallet from './Components/User/Wallet'
import Delivery from './Components/Delivery/Delivery'
import Vendor from './Components/Vendor/Vendor'
import { UserProvider } from './Components/User/UserContext'
import User from './Components/User/User'
import VendorOrder from './Components/Vendor/Vendor-Order'
import VendorTotalUsers from './Components/Vendor/Vendor-TotalUsers'
import VendorProfile from './Components/Vendor/Vendor-Profile'
import VendorWallet from './Components/Vendor/VendorWallet'
import VendorQuery from './Components/Vendor/Vendor-Query'
import MealPlan from './Components/Vendor/Vendormealplan'
import Onetimeorder from './Components/User/One-Time-Order'
import UserQuery from './Components/User/User-Query'
import Plans from './Components/User/User-Plan'
import MealPlanQuery from './Components/User/UserMealPlan-Query'
import WalletDetails from './Components/User/Wallet-Details'
import QueryDetails from './Components/User/UserQuery-Details'
import OneTimeOrderDetails from './Components/User/UserOnetime-Details'
import PlanDetails from './Components/User/UserPlans-Details'
import VendorPlan from './Components/Vendor/Vendor-Plans'
import VendorMealDetails from './Components/Vendor/Vendor-meal-detail'
import VendorOneTimeOrderDetails from './Components/Vendor/Vendor-order-details'
import VendorWalletDetails from './Components/Vendor/Vendor-wallet-Details'
import VendorQueryDetails from './Components/Vendor/Vendor-Query-details'
import VendorDocuments from './Components/Vendor/Vendor-Documents'
import DeliveryMeal from './Components/Delivery/Dilvery-meals'
import DeliveryOrder from './Components/Delivery/Delivery-OneTimeOrder'
import DeliveryQuery from './Components/Delivery/Delivery-Query'
import DeliveryWallet from './Components/Delivery/Delivery-Wallet'
import DeliveryProfile from './Components/Delivery/Delivery-profile'
import DeliveryMealDetails from './Components/Delivery/Delivery-mealDetails'
import DeliveryOneTimeOrderDetails from './Components/Delivery/DeliveryOrderDetails'
import DeliveryWalletDetails from './Components/Delivery/Delivery-WalletDetails'
import DeliveryQueryDetails from './Components/Delivery/Delivery-querydetails'
import VendorTotalUsersDetails from './Components/Vendor/Vendor-TotalUserDetail'
import VendorSidebar from './Components/Vendor/Vendor-Sidebar'
import { VendorProvider } from './Components/Vendor/VendorContext'
import VendorManager from './Components/Vendor/VendorManager'
import ProfileManager from './Components/Manager/ProfileManager'
import ManagerPlans from './Components/Manager/Manager-PlanDetails'
import ManagerMeal from './Components/Manager/Manager-Meal'
import ManagerPayment from './Components/Manager/Manager-Payment'
import ManagerOrder from './Components/Manager/Manager-OneTime'
import ManagerQuery from './Components/Manager/Manager-Query'
import ManagerDocuments from './Components/Manager/Manager-Documents'
import EmployeePanel from './Components/Manager/Manager-Employee'
import RawMaterialPanel from './Components/Manager/Manager-rawMaterial'
import ManagerWalletDetails from './Components/Manager/Manager-Paymetsdetails'
import ManagerOrderDetails from './Components/Manager/Manager-OneTimeorderDetail'
import ManagerQueryDetails from './Components/Manager/Manager-Querydetails'
import DeliveryDocuments from './Components/Manager/Manager-Documents'
import AllVendorPanel from './Components/Manager/AllvendenManager'

const App = () => {
  return (
    <div>
   <UserProvider>
<VendorProvider >
     <Routes>
        <Route path="/" element={<Admin />}></Route>
        <Route path="/panel" element={<Panel />}></Route> 
       <Route path="/delivery" element={<Delivery />}></Route>
       <Route path="/vendor" element={<Vendor />}></Route>
       <Route path="/user/:id" element={<User />} /> 
       <Route path="/meal/:id" element={<Meal />}></Route>
        <Route path="/order/:id" element={<Onetimeorder />}></Route>
       <Route path="/wallet/:id" element={<Wallet />}></Route>
       <Route path="/query/:id" element={<UserQuery />}></Route>
        <Route path="/plans/:id" element={<Plans />}></Route>
        <Route path="/meal/details/:id/:mealId" element={<MealPlanQuery />} />
        <Route path="/wallet/:id/details" element={<WalletDetails />}></Route>
        <Route path="/query/:id/details" element={<QueryDetails />}></Route>
        <Route path="/order/:id/details" element={ <OneTimeOrderDetails />}></Route>
        <Route path="/plans/:id/details" element={<PlanDetails />}></Route>
    
     
        <Route path="/vendor/profile/:id" element={<VendorProfile />}></Route>
        <Route path="/vendor/mealPlan/:id" element={<MealPlan />}></Route>
        <Route path="/vendor/totalUser/:id" element={<VendorTotalUsers />}></Route>
        <Route path="/vendor/plans/:id" element={<VendorPlan />}></Route>
        <Route path="/vendor/query/:id" element={<VendorQuery />}></Route>
        <Route path="/vendor/Order/:id" element={<VendorOrder />}></Route>
        <Route path="/vendor/wallet/:id" element={<VendorWallet />}></Route>
        <Route path="/vendor/documents/:id" element={<VendorDocuments />}></Route>
        {/* User Detail page */}
         {/* Vendor detail page  */}
         <Route path="/vendor/mealPlan/:id/details" element={<VendorMealDetails />}></Route>
         <Route path="/vendor/Order/:id/details" element={<VendorOneTimeOrderDetails />}></Route>
         <Route path="/vendor/wallet/:id/details" element={<VendorWalletDetails />}></Route>
         <Route path="/vendor/query/:id/details" element={<VendorQueryDetails />}></Route>
         <Route path="/vendor/plans/:id/details" element={<Vendor />}></Route>
         <Route path="/vendor/totalUser/:id/details" element={<VendorTotalUsersDetails />}></Route>
         
  {/* Delivery pages */}
  <Route path="/delivery/meal/:id" element={<DeliveryMeal />}></Route>
  <Route path="/delivery/order/:id" element={<DeliveryOrder />}></Route>
  <Route path="/delivery/documents/:id" element={<DeliveryDocuments />}></Route>
  <Route path="/delivery/query/:id" element={<DeliveryQuery />}></Route>
  <Route path="/delivery/wallet/:id" element={<DeliveryWallet />}></Route>
  <Route path="/delivery/profile/:id" element={<DeliveryProfile />}></Route>

{/* Delivery detail pages */}
<Route path="/delivery/meal/details/:id" element={<DeliveryMealDetails />}></Route>
<Route path="/delivery/order/details/:id" element={<DeliveryOneTimeOrderDetails />}></Route>
<Route path="/delivery/wallet/details/:id" element={<DeliveryWalletDetails />}></Route>
<Route path="/delivery/query/details/:id" element={<DeliveryQueryDetails />}></Route>

{/* {Vendor Manager pages} */}
<Route path="/manager" element={<VendorManager />}></Route> 
<Route path="/manager/vender/:id" element={<AllVendorPanel />}></Route> 
<Route path="/manager/vender/profile/:id" element={<ProfileManager />}></Route> 
<Route path="/manager/vender/plan/:id" element={<ManagerPlans />}></Route> 
<Route path="/manager/vender/meal/:id" element={<ManagerMeal />}></Route> 
<Route path="/manager/vender/payment/:id" element={<ManagerPayment />}></Route> 
<Route path="/manager/vender/order/:id" element={<ManagerOrder />}></Route> 
<Route path="/manager/vender/query/:id" element={<ManagerQuery />}></Route> 
<Route path="/manager/vender/documents/:id" element={<ManagerDocuments />}></Route> 
<Route path="/manager/vender/employee/:id" element={<EmployeePanel />}></Route> 
<Route path="/manager/vender/material/:id" element={<RawMaterialPanel />}></Route> 
<Route path="/manager/vender/payment/detail/:id" element={<ManagerWalletDetails />}></Route> 
<Route path="/manager/vender/order/detail/:id" element={<ManagerOrderDetails />}></Route> 
<Route path="/manager/vender/query/detail/:id" element={<ManagerQueryDetails />}></Route> 



      </Routes>
      {/* <DeliveryOrder /> */}
      </VendorProvider> 
   </UserProvider>
      
   
       </div>
    

  )
}

export default App