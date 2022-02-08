import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate  } from "react-router-dom";
import Jumbotron from '../../components/Jumbotron';
import Button from "../../components/Button";
import API from "../../utils/API";

function ItemDetail() {
  const [formObject, setFormObject] = useState({
    name: "",
    quantity: ""
  });
  const {id} = useParams()
  const history = useNavigate();

  useEffect(() => {
    let componentMounted = true;
      const fetchData = async () => {
       //you async action is here
        API.getInventoryItem(id).then((response) => {
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
      if (formObject.name && formObject.quantity) {
        API.updateInventory(id, {
          name: formObject.name,
          quantity: formObject.quantity
        })
        .then(history.push(`/inventory`))
        .catch(err => console.log(err));
      };
  };

  function handleDelete(){
    API.deleteInventory(id)
    .then(history.push(`/inventory`))
    .catch(err => console.log(err))
  }

  return (
      <div>
        <Jumbotron
          title="Item Details"
        >
        </Jumbotron>
        <div className="col-12 form">
          <input 
            className="form-control"
            onChange={handleInputChange}
            id="name"
            value={formObject.name}
            required
          />
          
          <input 
            className="form-control"
            onChange={handleInputChange}
            id="quantity"
            value={formObject.quantity}
            required
          />
            <Button
              disabled={!(formObject.name && formObject.quantity)}
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
            <Link to="/inventory">
              <Button
                style={{width:"100%"}}
              >
                ← Back to Inventory
              </Button>
            </Link>
        </div>  
      </div>
    );
  }


export default ItemDetail;