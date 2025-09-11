import { createBrowserRouter } from "react-router-dom";
import CreateButterfly from "../pages/CreateButterfly";
import EditButterfly from "../pages/EditButterfly";
import ButterflyDetail from "../pages/ButterflyDetail";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import List from "../pages/List";
import Contact from "../pages/Contact";


const RouterButterfly = createBrowserRouter([{
    path: "/",
    element: <Layout/>,
    children:[
        {
            index: true,
            element: <Home/>
        },
        {
            path: "/newbutterfly",
            element: <CreateButterfly/>
        },
        {
            path:"/editbutterfly/:id",
            element:<EditButterfly/>
        },
        {
            path:"/viewbutterfly/:id",
            element: <ButterflyDetail/>
        },
        {
            path:"/butterflylist",
            element: <List/>
        },
        {
            path:"/contactcreators",
            element: <Contact/>
        },
        
    ]
}])

export default RouterButterfly