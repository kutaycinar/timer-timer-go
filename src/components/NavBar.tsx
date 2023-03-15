import { FaClock, FaChartLine, FaCog } from "react-icons/fa";
import { TabType } from "../types";

function NavBar({
  tab,
  setTab,
}: {
  tab: TabType;
  setTab: (tab: TabType) => void;
}) {
  const icons = [
    <FaClock className="nav-icon" size={"24px"} />,
    <FaChartLine className="nav-icon" size={"24px"} />,
    <FaCog className="nav-icon" size={"24px"} />,
  ];

  if (icons.length !== Object.keys(TabType).length / 2) {
    console.warn("Mismatched number of tabs and tab icons");
  }

  const tabs: JSX.Element[] = [];
  for (let i = 0; i < Object.values(TabType).length / 2; i++) {
    tabs.push(
      <ul key={i}>
        <li>
          <a
            href="#"
            className={`${tab === i && "selected"}`}
            onClick={() => setTab(i)}
          >
            {icons[i]}
          </a>
        </li>
      </ul>
    );
  }

  return <nav className="navbar">{...tabs}</nav>;
}

export default NavBar;
