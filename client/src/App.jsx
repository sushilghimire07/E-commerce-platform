import { Route,Routes, } from "react-router-dom"
import Authlayout from "./pages/auth/layout"
import AuthLoign from "./pages/login"
import AuthRegister from "./pages/register"
import AdminLayout from "./components/admin-view/layout"
import AdminDashbord from "./pages/admin-view/dashbord"
import AdminProducts from "./pages/admin-view/products"
import AdminOrders from "./pages/admin-view/orders"
import AdminFeatures from "./pages/admin-view/features"
import ShoppingLayout from "./components/shopping-view/layout"
import NotFound from "./pages/not-found"
import ShoppingHome from "./pages/shopping-view/home"
import ShoppingListing from "./pages/shopping-view/listing"
import ShoppingCheckout from "./pages/shopping-view/checkout"
import ShoppingAccount from "./pages/shopping-view/account"
function App() {
  return (
   <div className="flex flex-col overflow-hidden bg-white">
        <h1>
          Header Conponet
        </h1>
        <Routes>
          <Route path="/auth" element={<Authlayout/>}>
              <Route path="login" element={<AuthLoign/>}/>
              <Route path="register" element={<AuthRegister/>}/>
          </Route>
          <Route path="/admin" element={<AdminLayout/>}>
              <Route path="dashbord" element={<AdminDashbord/>}/>
              <Route path="products" element={<AdminProducts/>}/>
              <Route path="orders" element={<AdminOrders/>}/>
              <Route path="features" element={<AdminFeatures/>}/>
        
          </Route>
          <Route path="/shop" element={<ShoppingLayout/>}>
              <Route path="home" element={<ShoppingHome/>}/>
              <Route path="listing" element={<ShoppingListing/>}/>
              <Route path="checkout" element={<ShoppingCheckout/>}/>
              <Route path="account" element={<ShoppingAccount/>}/>
          </Route>
            <Route path="*" element={<NotFound/>}> </Route>
        </Routes>
   </div>
  )
}

export default App
