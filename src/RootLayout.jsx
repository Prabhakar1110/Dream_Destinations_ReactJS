import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function RootLayout() {
    return(<>
        <Header />

        <div className="main_content">
            <Outlet />
        </div>
        
        <Footer />
    </>);
}
export default RootLayout;