import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import Users from "./layouts/users";
import AddProduct from "./layouts/addProduct";
import Product from "./components/page/products/product";
import { ProductsProvider } from "./hooks/useProducts";

function App() {
    return (
        <div>
            <AuthProvider>
                <NavBar />
                <Switch>
                    <ProductsProvider>
                        <ProtectedRoute
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Route
                            path="/product/:productId?/:edit?"
                            component={Product}
                        />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/logout" component={LogOut} />
                        <Route path="/add_product" component={AddProduct} />
                        <Route path="/" exact component={Main} />
                        <Redirect to="/" />
                    </ProductsProvider>
                </Switch>
            </AuthProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
