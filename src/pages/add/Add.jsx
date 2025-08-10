import React, { useReducer, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { INIT_STATE, gigReducer } from "../../reducer/gigReducer";
import upload from "../../utils/upload.utils.js";
import "./Add.scss";
import request from "../../utils/request.utils";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [state, dispatch] = useReducer(gigReducer, INIT_STATE);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (gig) =>
      request.post("/gigs", gig).then((res) => res.data.data),
    onSuccess: () => queryClient.invalidateQueries("myGigs"),
  });

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUploads = async (e) => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);
      const images = await Promise.all(
        [...files].map(async (file) => await upload(file))
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/mygigs");
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="left">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              id=""
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cat" onChange={handleChange}>
              <option disabled selected>Select Category</option>
              <option value="design">Desgin</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
              <option value="video">Video Editing</option>
            </select>
            <div className="images">
              <div className="image-inputs">
                <label htmlFor="">
                  Cover Image
                  <input
                    type="file"
                    name=""
                    id=""
                    onChange={(e) => setSingleFile(e.target.files[0])}
                  />
                </label>
                <label htmlFor="">
                  Upload Image
                  <input
                    type="file"
                    name=""
                    id=""
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                  />
                </label>
              </div>
              <button
                onClick={handleUploads}
                disabled={uploading ? true : false}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>

            <label htmlFor="">Description</label>
            <textarea
              name="description"
              id=""
              cols="30"
              rows="16"
              onChange={handleChange}
              placeholder="breif description of your gig"
            ></textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="right">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              id=""
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              onChange={handleChange}
              id=""
              cols="30"
              rows="10"
              placeholder="Short description of your service"
            ></textarea>
            <label htmlFor="">Delivery Time (e.g. 3days)</label>
            <input
              type="number"
              min={1}
              onChange={handleChange}
              name="deliveryTime"
            />
            <label htmlFor="" onChange={handleChange} name="revisionNumber">
              Revision Number
            </label>
            <input type="number" min={1} />
            <label htmlFor="">Add Features</label>
            <form className="add" onSubmit={handleFeature}>
              <input type="text" name="" id="" placeholder="e.g. page design" />
              <button type="submit">Add</button>
            </form>
            <div className="added-featurs">
              {state?.features?.map((f, i) => (
                <div className="feature" key={i}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            <label htmlFor="">Price</label>
            <input type="number" min={1} name="price" onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
