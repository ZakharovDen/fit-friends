import { Outlet } from "react-router-dom";
import Header from "../header/header";

function LayoutMain(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <Outlet />
    </div>
  )
}

export default LayoutMain;