import React, {useState} from "react";
import "./style.css";
import { Link } from "react-router-dom";

function Header() {
  const [menu, setMenu] = useState(false);

  function handleMenu(){
    if(menu){
      setMenu(false);
      return
    }
    if(!menu){
      setMenu(true)
      return
    }
  }

  return (
    <div>
      <div className="header col-12">
        <nav>
          <a href="/">
            Logo
          </a>
        </nav>
        <button className="menu" type="button" onClick={() => handleMenu()}><i className="fas fa-bars" ></i></button>
      </div>
      {menu ?(
        <div>
        <ul onClick={() => handleMenu()}>
          <Link to="/">
            <li className="menu-item" id="menu-drinks">
              Drinks
              <i className="fab fa-gulp"></i>  
            </li>
          </Link>
          <Link to="/inventory">
            <li className="menu-item" id="menu-inventory">
              Inventory
              <i className="fas fa-wine-bottle"></i>
            </li>
          </Link>
          <Link to="/recipes">
            <li className="menu-item" id="menu-recipes">
              Recipes
              <i className="fas fa-list-alt"></i></li>
          </Link>
        </ul>
      </div>
      ):(
        <div></div>
      )
      }
      
    </div>
  );
}

export default Header;