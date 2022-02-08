   
import React, {useState, useEffect} from 'react';
import './style.css';
import Jumbotron from '../../components/Jumbotron';
import SearchBar from '../../components/SearchBar';
import Button from "../../components/Button";
import { List, ListItem } from '../../components/List';
import API from "../../utils/API";
import { Link } from "react-router-dom";

function Drinks() {
  const [drinks, setDrinks] = useState([])
  const [search, setSearch] = useState({value: ""});

  useEffect(() => {
    let componentMounted = true;
      const fetchData = async () => {
      //you async action is here
      API.getDrinks().then((response) => {
        if(componentMounted) {
          setDrinks(response?.data);
        }
      })
      };
      fetchData();
      return () => {
       componentMounted = false;
      }
    }, []);

  //handles changes in the searchbar
  function handleChange(event) {
    setSearch({value: event.target.value});
  }
  //handles the submit button press of the searchbar
  function handleSubmit(event) {
    event.preventDefault();
    setSearch({value: ""});
  }

  function handleClick(event){
    event.preventDefault();
    let list = event.currentTarget.parentElement.childNodes[2];
    if(list.classList.contains("hide")){
      list.classList.remove("hide");
      return
    }
    if(!list.classList.contains("hide")){
      list.classList.add("hide");
      return
    }
  }

  //sort drinks - https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  function compare( a, b ) {
    if ( a.title < b.title){
      return -1;
    }
    if ( a.title > b.title){
      return 1;
    }
    return 0;
  }
  
  let sortedDrinks = drinks.sort( compare );

  //This sets filters on the results array
  let searchBarFilter = sortedDrinks.filter(drink => 
    drink.title.toLowerCase().indexOf(search.value.toLowerCase()) !== -1
    || 
    drink.author.toLowerCase().indexOf(search.value.toLowerCase()) !== -1
    ||
    drink.ingredients.toLowerCase().indexOf(search.value.toLowerCase()) !== -1)
  //Initialize tableResults variable    
  let tableResults;
  //Check if need to filter the results array or not
  if(search.value === ""){
    tableResults = [];
  } else {
    tableResults = searchBarFilter;
  }

  let coke = filterByDrink('coke');
  let creamSoda = filterByDrink('cream soda');
  let dpPepper = filterByDrink('pepper');
  let eggNog = filterByDrink('eggnog');
  let gingerAle = filterByDrink('ginger');
  let grape = filterByDrink('grape');
  let pepsi = filterByDrink('pepsi');
  let raspberry = filterByDrink('raspberry cream');
  let rootBeer = filterByDrink('root');
  let sprite = filterByDrink('sprite');
  let squirt = filterByDrink('squirt');
  let mtDew = filterByDrink('dew');

  let filteredDrinksArray = [
    {
      name: "All",
      array: sortedDrinks
    },
    {
      name: "Coke",
      array: coke
    },
    {
      name: "Cream Soda",
      array: creamSoda
    },
    {
      name: "Dr. Pepper",
      array: dpPepper
    },
    {
      name: "Eggnog",
      array: eggNog
    },
    {
      name: "Ginger Ale",
      array: gingerAle
    },
    {
      name: "Grape",
      array: grape
    },
    {
      name: "Pepsi",
      array: pepsi
    },
    {
      name: "Raspberry Cream",
      array: raspberry
    },
    {
      name: "Root Beer",
      array: rootBeer
    },
    {
      name: "Sprite",
      array: sprite
    },
    {
      name: "Squirt",
      array: squirt
    },
    {
      name: "Mt. Dew",
      array: mtDew
    }
  ];
    
  
  function filterByDrink(soda){
    let result = drinks.filter(drink => drink.ingredients.toLowerCase().indexOf(soda.toLowerCase()) !== -1)
    return result;
  }

  return (
    <div id="top">
      <Jumbotron
        title="Drinks: "
        iconClass='col-12 fas fa-plus-square'
        icon='⬅ Create a new Drink Here!'
        link= "/create"
      >
      </Jumbotron>
      
      <SearchBar
        value={search.value}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        placeholder="Find a Drink!"
      ></SearchBar>
      <div className='col-12'>
      {tableResults.length ? (
              <List>
                {tableResults.map(drink => (
                  <ListItem key={drink._id}>
                    <Link to={"/drinks/" + drink._id}
                      title={drink.title}
                      author={drink.author}
                      ingredients={drink.ingredients}
                    >
                      <h1>
                        {drink.title} 
                      </h1>
                      <p>by {drink.author}</p>
                      <p className="ingredients">({drink.ingredients})</p>
                      </Link>
                  </ListItem>
                ))}
              </List>
            ) : (
        <List>
          {filteredDrinksArray.map(obj => (
            <ListItem key={obj.name}>
            <div className='list-dropdown' onClick={handleClick}>
              <h1>{obj.name}</h1>
              <h1><i className="fas fa-angle-double-down"></i></h1>
            </div>
            <hr/>
          {obj.array.length ? (
            <div className='hide'>
              <List>
                {obj.array.map(drink => (
                  <ListItem key={drink._id}>
                    <Link to={"/drinks/" + drink._id}
                      title={drink.title}
                      author={drink.author}
                      ingredients={drink.ingredients}
                    >
                      <h1>
                        {drink.title} 
                      </h1>
                      <p>by {drink.author}</p>
                      <p className="ingredients">({drink.ingredients})</p>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </div>
          ) : (
            <p className='hide'>NA</p>
          )}
          </ListItem>
          ))}
        </List>
        )}
      </div>
      <div className='col-12' style={{marginBottom: "50px"}}>
        <a href="#top">
          <Button
            style={{width:"100%"}}
          >
            ↑ Back to top ↑
          </Button>
        </a>
      </div>
    </div>
  );
}


export default Drinks;