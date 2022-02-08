import React, {useState, useEffect} from 'react';
import './style.css';
import Jumbotron from '../../components/Jumbotron';
import SearchBar from '../../components/SearchBar';
import Button from "../../components/Button";
import { List, ListItem } from '../../components/List';
import API from "../../utils/API";
import { Link } from "react-router-dom";

function Inventory() {
  const [inventory, setInventory] = useState([])
  const [search, setSearch] = useState({value: ""});

  useEffect(() => {
    let componentMounted = true;
      const fetchData = async () => {
      //you async action is here
      API.getInventory().then((response) => {
        if(componentMounted) {
          setInventory(response?.data);
        }
      })
      };
      fetchData();
      return () => {
       componentMounted = false;
      }
    }, [inventory]);

  //handles changes in the searchbar
  function handleChange(event) {
    setSearch({value: event.target.value});
  }
  //handles the submit button press of the searchbar
  function handleSubmit(event) {
    event.preventDefault();
    setSearch({value: ""});
  }

  function handleClick(item, change) {
      if(change === "up"){
        API.updateInventory(item._id, {
            name: item.name,
            quantity: item.quantity + 1,
          })
          .catch(err => console.log(err));
      }
      if(change === "down"){
        API.updateInventory(item._id, {
            name: item.name,
            quantity: item.quantity - 1,
          })
          .catch(err => console.log(err));
      }
  }

  //sort inventory - https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  function compare( a, b ) {
    if ( a.name < b.name){
      return -1;
    }
    if ( a.name > b.name){
      return 1;
    }
    return 0;
  }

  let sortedInventory = inventory.sort( compare );

  //This sets filters the results array
  let searchBarFilter = sortedInventory.filter(item => item.name.toLowerCase().indexOf(search.value.toLowerCase()) !== -1);
  //Initialize tableResults variable    
  let tableResults;
  //Check if need to filter the results array or not
  if(search.value === ""){
    tableResults = sortedInventory;
  } else {
    tableResults = searchBarFilter;
  }

  return (
    <div id="top-inventory">
      <Jumbotron
        title='Inventory: '
        iconClass='col-12 fas fa-cart-plus'
        icon='⬅ Add Items Here!'
        link="/addItem"
      >
      </Jumbotron>
      
      <SearchBar
        value={search.value}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        placeholder="Search Inventory!"
      ></SearchBar>
      <div className="col-12 table-header">
          <h2>Name</h2><h2>Quantity</h2>
      </div>
      {tableResults.length ? (
        <div className='col-12'>
              <List>
                {tableResults.map(item => (
                  <ListItem key={item._id}>
                    <div className="table-header">
                        <Link to={"/inventory/" + item._id}
                        name={item.name}
                        quantity={item.quantity}
                        >
                            <h1>{item.name}</h1>
                        </Link>
                        <div className="quantity-changer">
                            <button onClick={() => handleClick(item, "up")}><i className="fas fa-angle-up"></i></button>    
                            <h1>{item.quantity}</h1>
                            <button onClick={() => handleClick(item, "down")}><i className="fas fa-angle-down"></i></button>
                        </div>
                    </div>
                    <div>
                        
                        
                    </div>
                  </ListItem>
                ))}
              </List>
            </div>
            ) : (
              <Jumbotron
                title="Nothing to Display"
                link=""
              >
              </Jumbotron>
            )}
            <div className='col-12' style={{marginBottom: "50px"}}>
              <a href="#top-inventory">
                <Button
                  style={{width:"100%"}}
                >
                  ↑ Back to Top ↑
                </Button>
              </a>
            </div>
    </div>
  );
}


export default Inventory;