import React, { useState } from 'react';
import Jumbotron from '../../components/Jumbotron';
import { Link,  useNavigate  } from "react-router-dom";
import { Input } from "../../components/Form";
import Button from "../../components/Button";
import API from "../../utils/API";

function AddItems() {
  const [formObject, setFormObject] = useState({
    name: "",
    quantity: ""
  });

  const history = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  function handleFormSubmit(event) {
    event.preventDefault()
      if (formObject.name && formObject.quantity) {
        API.saveInventory({
          name: formObject.name,
          quantity: formObject.quantity
        })
        .then(history.push(`/inventory`))
        .catch(err => console.log(err));
      };
  };

    return (
     <div>
       <Jumbotron
          title="Add Item to Inventory"
          link="/"
        >
        </Jumbotron>
        <div className="col-12 form">
              <Input
                onChange={handleInputChange}
                name="name"
                placeholder="Name of Item"
               
              />
              <Input
                onChange={handleInputChange}
                name="quantity"
                placeholder="Number of Items"
              />
              <Button
                disabled={!(formObject.name && formObject.quantity)}
                onClick={handleFormSubmit}
                style={{width:"100%", fontSize:"24px"}}
              >
              <i className="far fa-save"></i>
              </Button>
              
              <Link to="/inventory">
              <Button
                style={{width:"100%",fontSize:"24px"}}
              >
                ← Back to Inventory
              </Button>
              </Link>
          </div>
     </div>
    );
  }

export default AddItems;