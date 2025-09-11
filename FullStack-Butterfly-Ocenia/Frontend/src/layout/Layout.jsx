import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import ScrollToTop from "../components/ScrollToTop"

const Layout = () => {

    return (
        <>
        <ScrollToTop/>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout