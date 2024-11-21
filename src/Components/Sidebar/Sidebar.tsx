import profileImg from "../../Assets/Images/Profile.jpg";
import { AppDispatch, RootState } from "../../Store/Reducers/store";
import { selectSideBar } from "../../Store/Reducers/sideBarSlice";
import { useDispatch, useSelector } from "react-redux";
import { setIsActive } from "../../Store/Reducers/sideBarSlice";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import './Sidebar.scss'

const sideBarItems = [
  { name: "Chart", path: "/chart", iconClassName: "bx bx-grid-alt" },
  { name: "Analytics", path: "/analytics", iconClassName: "bx bx-pie-chart-alt-2" },
  { name: "Messages", path: "/chart", iconClassName: "bx bx-chat" },
  { name: "Profile", path: "/profile", iconClassName: "bx bx-user" },
];

export default function Sidebar() {
  const sideBar = useSelector((state: RootState) => selectSideBar(state));
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  return (
    <div className="sidebar-container">
      <div className={`sidebar ${sideBar.isActive ? "expanded" : "collapsed"}`}>
        <div className="sidebar-header">
          <div className={`sidebar-title ${sideBar.isActive ? "show" : "hide"}`}>
            <i className="bx bxl-c-plus-plus icon"></i>
            <span>Project</span>
          </div>
          <button
            className={`toggle-btn ${sideBar.isActive ? "expanded" : "collapsed"}`}
            onClick={() => dispatch(setIsActive())}
          >
            <i className="bx bx-menu"></i>
          </button>
        </div>
        <ul className="sidebar-menu">
          {sideBarItems.map((item, index) => (
            <li
              key={index}
              className={`menu-item`}
            >
              <Link to={item.path} className={`menu-link  ${location.pathname.startsWith(item.path) ? "active" : ""}`}>
                <i className={`${item.iconClassName} menu-icon`}></i>
                <span className={`menu-text ${sideBar.isActive ? "show" : "hide"}`}>
                  {item.name}
                </span>
              </Link>
              {!sideBar.isActive && <span className="tooltip">{item.name}</span>}
            </li>
          ))}
        </ul>
        <div className="sidebar-footer">
          <img src={profileImg} alt="Profile" className="profile-img" />
          <div className={`profile-info ${sideBar.isActive ? "show" : "hide"}`}>
            <p className="profile-name">Elnur Mamedov</p>
            <p className="profile-role">Master</p>
          </div>
          <button className="logout-btn">
            <i className="bx bx-log-out"></i>
          </button>
        </div>
      </div>
      <div className={`main-content ${sideBar.isActive ? "expanded" : "collapsed"}`}>
        <Outlet />
      </div>
    </div>
  );
}