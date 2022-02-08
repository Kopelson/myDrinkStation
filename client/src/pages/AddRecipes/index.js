import React, { useState } from 'react';
import Jumbotron from '../../components/Jumbotron';
import { Link,  useNavigate  } from "react-router-dom";
import { Input, TextArea } from "../../components/Form";
import Button from "../../components/Button";

import API from "../../utils/API";

function Create() {
  const [formObject, setFormObject] = useState({
    title: "",
    author: "",
    recipe: ""
  });
  const history = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  function handleFormSubmit(event) {
    event.preventDefault()
      if (formObject.title && formObject.author) {
        API.saveRecipe({
          title: formObject.title,
          author: formObject.author,
          recipe: formObject.recipe
        })
        .then(history.push(`/recipes`))
        .catch(err => console.log(err));
      };
  };

    return (
     <div>
       <Jumbotron
          title="Add Recipe"
        >
        </Jumbotron>
        <div className="col-12 form">
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title of Recipe"
               
              />
              <Input
                onChange={handleInputChange}
                name="author"
                placeholder="Name of Author"
              />
              <TextArea
                onChange={handleInputChange}
                name="recipe"
                placeholder="Recipe"
                
              />
              <Button
                disabled={!(formObject.author && formObject.title) && formObject.recipe}
                onClick={handleFormSubmit}
                style={{width:"100%", fontSize:"24px"}}
              >
              <i className="far fa-save"></i>
              </Button>
              
              <Link to="/recipes">
              <Button
                style={{width:"100%",fontSize:"24px"}}
              >
                ← Back to Recipes
              </Button>
              </Link>
          </div>
     </div>
    );
  }

export default Create;