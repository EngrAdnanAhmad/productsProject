//import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import "./App.css";
import Popup from "./PopUp";
import ShowMoreText from "react-show-more-text";

//import User from "./User";
//import { BrowserRouter as BR, Route, Link } from "react-router-dom";


function App() {
  
  const [Data, setData] = useState([]);
  const [Title, setTitle] = useState([]);
  const [Price, setPrice] = useState(null);
  const [Descrip, setDescrip] = useState([]);
  const [Catag, setCatag] = useState([]);
  const [CatagList, setCatagList] = useState([]);
  // const [Image, setImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [expand, setExpand] = useState(false);

  const onClick = () => {
    setExpand(!expand);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    getData();
    getCat();
  }, []);

  function getCat (){
    fetch("http://fakestoreapi.com/products/categories")
    .then((res)=>res.json()
    .then((responc)=>
     setCatagList(responc),
     console.log("catagories function...")
    ));
   }
  

  function getData() {
    fetch("https://fakestoreapi.com/products").then((result) => {
      //?limit=10 If you want to limit the products.
      result.json().then((resp) => {
        setData(resp);
        setTitle(resp[0].title);
        setPrice(resp[0].price);
        setDescrip(resp[0].description);
        console.log("getData function...");
        // setImage(resp[0].image);
        // for (const x of resp) {
        //  const arr =  x.category;
        //  setCatag(arr);
        // }
      });
    });
  }
 // Add search Bar to search Items

 function addItem(){


 }

  function handleDelete(id) {
    // var deleteItem = Data.filter((del)=>{

    //   del !== passId
    //   // console.log('delll...', del)
    //   //console.log('Go on ...');
    // })
    // console.log("id matched....", deleteItem);
    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    }).then((results) => {
      results.json().then((responce) => {
        console.log("Deleted Item...", responce);
        getData();
      });
    });
  }

  function editItem(id) {
    togglePopup();
    console.log("eidt data function...", Data[id - 1]);
    const data = Data[id - 1];
    setTitle(data.title);
    setPrice(data.price);
    setDescrip(data.description);
    setCatag(data.category);
    // fetch(`https://fakestoreapi.com/products/${id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Accept': 'Application/json',
    //     'Content-type': 'Application/json',
    //   },
    // }).then((result) =>
    //   result.json().then((resp) => {
    //  getData()
    //   })
    // );
  }
  function handleUpdate(id) {
    console.log("Updated function ...", id);
  }
  return (
    <div className="container">
      <div className="row">
        <h1>Available Stock</h1>
        <div className="row justify-content-center">
          <div className="col-8">
            {isOpen && (
              <Popup
                content={
                  <div>
                    <form>
                      <h3> Update Item</h3>
                      <div className="input-group">
                        <span className="input-group-text">Update Title</span>
                        <textarea
                          className="form-control"
                          aria-label="With textarea"
                          value={Title}
                          onChange={(e) => setTitle(e.target.value)}
                        ></textarea>
                      </div>
                      <br />
                      <div className="input-group mb-3">
                        <span className="input-group-text">$</span>
                        <input
                          type="text"
                          className="form-control"
                          aria-label="Amount (to the nearest dollar)"
                          value={Price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="input-group">
                        <span className="input-group-text">
                          Update Description
                        </span>
                        <textarea
                          className="form-control"
                          aria-label="With textarea"
                          value={Descrip}
                          onChange={(e) => setDescrip(e.target.value)}
                        ></textarea>
                      </div>
                      <br />
                      <div className="input-group mb-3">
                        <label
                          className="input-group-text"
                        >
                          Catagories
                        </label>
                        <select
                          className="form-select"
                          id="inputGroupSelect01"
                          onChange={(e) => setCatag(e.target.value)}
                        >
                          <option value={Catag}>{Catag}</option>
                          {CatagList.map((cats) => (
                            <option value={cats}>{cats}</option>
                          ))}

                          {/* {Data.map((itemCatag) => {
                            console.log("catagories... ", itemCatag.category);
                            return (
                              <option value={itemCatag.category}>
                                {itemCatag.category}
                              </option>
                            );
                          })} */}
                        </select>
                      </div>
                      <div className="input-group mb-3">
                        <input
                          type="file"
                          className="form-control"
                          id="inputGroupFile02"
                        />
                        <label className="input-group-text">Upload Image</label>
                      </div>
                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-primary"
                          type="submit"
                          onClick={() => handleUpdate()}
                        >
                          Update Data
                        </button>
                      </div>
                    </form>
                  </div>
                }
                handleClose={togglePopup}
              />
            )}
          </div>
        </div>
        <table className="table table-bordered center">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Total items {Data.length}</th>
              <th scope="col">Title</th>
              <th scope="col">Price in $</th>
              <th scope="col">Description</th>
              <th scope="col">Catagory</th>
              <th scope="col">Image</th>
              <th scope="col">Delete Item</th>
              <th scope="col">Edit Item</th>
            </tr>
          </thead>
          {Data.map((item, i) => {
            return (
              <tbody className="line-height">
                <tr key={i}>
                  <td>{item.id}</td>
                  <td>
                    <ShowMoreText
                      lines={2}
                      more={"More"}
                      less={"Less"}
                      onClick={onClick}
                      expanded={expand}
                      width={100}
                    >
                      {item.title}
                    </ShowMoreText>
                  </td>

                  <td>{item.price}</td>
                  <td>
                    <ShowMoreText
                      lines={1}
                      more={"More"}
                      less={"Less"}
                      onClick={onClick}
                      expanded={expand}
                      width={900}
                    >
                      {item.description}
                    </ShowMoreText>
                  </td>
                  {/* <span>
                    <a href="#more" data-toggle="collapse">
                      ... <i class="fa fa-caret-down"></i>
                    </a>
                  </span> */}
                  <td>{item.category}</td>
                  <td>
                    {
                      <img
                        alt=""
                        src={item.image}
                        style={{ width: "60px", height: "60px" }}
                      />
                    }
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <input
                      className="btn btn-primary"
                      type="button"
                      value="Update"
                      onClick={() => editItem(item.id)}
                    />
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}
export default App;
