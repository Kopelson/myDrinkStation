import React, {useState, useEffect} from 'react';
import Jumbotron from '../../components/Jumbotron';
import SearchBar from '../../components/SearchBar';
import Button from "../../components/Button";
import { List, ListItem } from '../../components/List';
import API from "../../utils/API";
import { Link } from "react-router-dom";

function Recipes() {
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState({value: ""});

  useEffect(() => {
    let componentMounted = true;
      const fetchData = async () => {
      //you async action is here
      API.getRecipes().then((response) => {
        if(componentMounted) {
          setRecipes(response?.data);
        }
      })
      };
      fetchData();
      return () => {
       componentMounted = false;
      }
    }, [recipes]);

  //handles changes in the searchbar
  function handleChange(event) {
    setSearch({value: event.target.value});
  }
  //handles the submit button press of the searchbar
  function handleSubmit(event) {
    event.preventDefault();
    setSearch({value: ""});
  }

  //sort recipes - https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
  function compare( a, b ) {
    if ( a.title < b.title){
      return -1;
    }
    if ( a.title > b.title){
      return 1;
    }
    return 0;
  }

  let sortedRecipes = recipes.sort( compare );

  //This sets filters the results array
  let searchBarFilter = sortedRecipes.filter(item => item.title.toLowerCase().indexOf(search.value.toLowerCase()) !== -1);
  //Initialize tableResults variable    
  let tableResults;
  //Check if need to filter the results array or not
  if(search.value === ""){
    tableResults = sortedRecipes;
  } else {
    tableResults = searchBarFilter;
  }

  return (
    <div id="top-recipes">
      <Jumbotron
        title='Recipes: '
        iconClass='col-12 fas fa-list-alt'
        icon='⬅ Add Items Here!'
        link="/addRecipes"
      >
      </Jumbotron>
      
      <SearchBar
        value={search.value}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        placeholder="Search Recipes!"
      ></SearchBar>
      {tableResults.length ? (
        <div className='col-12'>
              <List>
                {tableResults.map(item => (
                  <ListItem key={item._id}>
                        <Link to={"/recipes/" + item._id}
                        >
                            <h1>{item.title}</h1>
                            <p>by {item.author}</p>
                        </Link>
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
              <a href="#top-recipes">
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


export default Recipes;