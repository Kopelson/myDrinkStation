import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Jumbotron from '../../components/Jumbotron';
import Button from "../../components/Button";
import API from "../../utils/API";

function Detail() {
  const [formObject, setFormObject] = useState({
    title: "",
    author: "",
    recipe: ""
  });
  const {id} = useParams()
  const history = useNavigate();

  useEffect(() => {
    let componentMounted = true;
      const fetchData = async () => {
       //you async action is here
        API.getRecipe(id).then((response) => {
          if(componentMounted) {
            setFormObject(response?.data);
          }
        })
      }
      fetchData();
      return () => {
       componentMounted = false;
      }
    }, [id]);

  function handleInputChange(event) {
    const { id, value } = event.target;
    setFormObject({...formObject, [id]: value})
  };

  function handleFormSubmit(event) {
    event.preventDefault()
      if (formObject.title && formObject.author) {
        API.updateRecipe(id, {
          title: formObject.title,
          author: formObject.author,
          recipe: formObject.recipe
        })
        .then(history.push(`/recipes`))
        .catch(err => console.log(err));
      };
  };

  function handleDelete(){
    API.deleteRecipe(id)
    .then(history.push(`/recipes`))
    .catch(err => console.log(err))
  }

  return (
      <div>
        <Jumbotron
          title="Recipe Details"
        >
        </Jumbotron>
        <div className="col-12 form">
          <input 
            className="form-control"
            onChange={handleInputChange}
            id="title"
            value={formObject.title}
            required
          />
          
          <input 
            className="form-control"
            onChange={handleInputChange}
            id="author"
            value={formObject.author}
            required
          />
             
          <textarea className="form-control" rows="5"
            onChange={handleInputChange}
            id="recipe"
            value={formObject.recipe}
          />
            <Button
              disabled={!(formObject.author && formObject.title) && formObject.recipe}
              onClick={handleFormSubmit}
              style={{width:"50%"}}
            >
              <i className="fas fa-edit"></i>
            </Button>
            <Button
              style={{width:"50%"}}
              type="button"
              onClick={handleDelete}
            >
              <i className="far fa-trash-alt"></i> 
            </Button>
            <Link to="/recipes">
              <Button
                style={{width:"100%"}}
              >
                ← Back to Recipes
              </Button>
            </Link>
        </div>  
      </div>
    );
  }


export default Detail;