import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import withRouter from "./hoc/withRouter";
import withRedux from "./hoc/withRedux";
import AppLoader from "./components/ui/hoc/appLoader";
import NavBar from "./components/ui/Navigation/navBar";
import Main from "./layouts/main";
import { ToastContainer } from "react-toastify";
import LoginForm from "./components/ui/loginForm";
import RegisterForm from "./components/ui/registerForm";
import ProductList from "./components/page/products/productList";
import UserPage from "./components/page/userPage";
import Users from "./layouts/users";
import EditUserPage from "./components/page/editUserPage/editUserPage";
import AdminPanel from "./components/ui/Admin/adminPanel";
import AuthLayout from "./layouts/AuthLayout";
import ShopingCarts from "./components/ui/Cart/shopingCarts";
import ProductCard from "./components/page/products/ProductCard";
import ProductEditPage from "./components/page/products/productEditPage";

function App() {
    return (
        <div>
            <AppLoader>
                <NavBar />
                <Routes>
                    <Route index element={<Main />} />
                    <Route path="auth/*" element={<AuthLayout />}>
                        <Route index element={<Navigate to="/auth/login" />} />
                        <Route path="login" element={<LoginForm />} />
                        <Route path="register" element={<RegisterForm />} />
                        <Route
                            path="*"
                            element={<Navigate to="auth/login" />}
                        />
                    </Route>

                    <Route path="cart" element={<ShopingCarts />} />

                    <Route path="admin/">
                        <Route index element={<AdminPanel />} />
                        <Route path=":prodId/">
                            <Route index element={<ProductEditPage />} />
                            {/* <Route path="profile" element={<User />} />
                        <Route path="edit" element={<Edit />} />
                        <Route path="*" element={<Navigate to="profile" />} /> */}
                        </Route>
                    </Route>

                    {/* <Route path="admin/" element={<AdminPanel />}>
                        <Route index element={<Navigate to="" />} />
                        <Route
                            path="/admin/:prodId"
                            element={<ProductEditPage />}
                        />
                        <Route path="*" element={<Navigate to="admin/" />} />
                    </Route> */}

                    <Route path="users/*" element={<Users />}>
                        <Route index element={<Navigate to="" />} />
                        <Route path=":userId" element={<UserPage />} />
                        <Route path=":userId/edit" element={<EditUserPage />} />
                        <Route path="*" element={<Navigate to="users" />} />
                    </Route>
                    <Route path="product/*" element={<ProductCard />}>
                        <Route index element={<ProductList />} />
                        <Route path=":prodId" element={<ProductCard />} />
                        <Route path="*" element={<Navigate to="" />} />
                    </Route>
                    <Route path="*" element={<Navigate to="" />} />
                </Routes>
            </AppLoader>
            <ToastContainer />
        </div>
    );
}
const AppWithStoreAndRoutes = withRedux(withRouter(App));
export default AppWithStoreAndRoutes;
