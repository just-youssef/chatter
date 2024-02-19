import { useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("data-theme") || document.documentElement.getAttribute("data-theme"));

  const changeTheme = (e)=>{
    setTheme(e.target.checked ? "light" :"dark");
    localStorage.setItem('data-theme', e.target.checked ? "light" :"dark");
    document.documentElement.setAttribute("data-theme", e.target.checked ? "light" :"dark")
  }
  
  return (
    <div>
      <label className="swap swap-rotate rounded-full p-1 hover:bg-gray-300 dark:hover:bg-gray-600">
        <input
          type="checkbox"
          // className="theme-controller"
          value="light"
          checked={theme == "light"}
          onChange={changeTheme}
        />
        <MdLightMode className="swap-off" fontSize={24} />
        <MdDarkMode className="swap-on" fontSize={24} />
      </label>
    </div>
  )
}

export default Navbar