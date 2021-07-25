import {BrowserRouter, Route} from "react-router-dom";
import './css/App.css';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Orders from "./pages/orders/Orders";
import CreateProduct from "./pages/products/CreateProduct";
import EditProduct from "./pages/products/EditProduct";
import Products from "./pages/products/Products";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import CreateRole from "./pages/roles/CreateRole";
import EditRole from "./pages/roles/EditRole";
import Roles from "./pages/roles/Roles";
import CreateUser from "./pages/users/CreateUser";
import EditUser from "./pages/users/EditUser";
import Users from "./pages/users/Users";

function App() {
  return (
  <div className="App">
    <BrowserRouter>
      <Route path={'/'} exact component={Dashboard} />
      <Route path={'/register'} component={Register} />    
      <Route path={'/login'} component={Login} />
      <Route path={'/profile'} exact component={Profile} /> 
      <Route path={'/users'} exact component={Users} /> 
      <Route path={'/users/create'} exact component={CreateUser} /> 
      <Route path={'/users/:id/edit'} component={EditUser} />
      <Route path={'/roles'} exact component={Roles} />
      <Route path={'/roles/create'} exact component={CreateRole} />
      <Route path={'/roles/:id/edit'} component={EditRole} />
      <Route path={'/products'} exact component={Products} />
      <Route path={'/products/create'} exact component={CreateProduct} />
      <Route path={'/products/:id/edit'} component={EditProduct} />
      <Route path={'/orders'} exact component={Orders} />
    </BrowserRouter>
  </div>
  );
}

export default App;