import { Outlet } from "react-router-dom";
import { SideBar } from "./sideBar";
import "./styles.scss";

const ScreensLayout = () => {
  return (
    <div className="dashboardLayoutContainer">
      <aside className="sideBar">
        <SideBar />
      </aside>
      <main className="screensBaseLayout">
        <Outlet />
      </main>
    </div>
  );
};
export default ScreensLayout;
