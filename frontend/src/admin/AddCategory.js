import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

const AddCategory = () => {
  const [name, setName] = useState("initialState");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const myCategoryForm = () => (
    <form className="">
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        <button className="btn btn-outline-info">Create Category</button>
      </div>
    </form>
  );

  return (
    <Base
      className="container bg-info p-5"
      title="Create a category here"
      description="Add a new category for new tshirts"
    >
      <div className="row bg-white rounded">
        <div className="col-8 offset-md-2">
          {myCategoryForm()} {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
