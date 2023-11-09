import React from "react";
import { useState, useEffect } from "react";
import { Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";
import axios from "axios";
import Component from "./component";
const Todo = () => {
  const [text, setText] = useState("");
  const [head, setHead] = useState("");
  const [subhead, setSubhead] = useState("");
  const [date, setDate] = useState("");
  const [display, setDisplay] = useState(false);
  const [getlist, setLists] = useState([]);

  function func() {
    setDisplay(!display);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const data = await axios.post(
      "https://todo-backend-of32.onrender.com/todo",
      {
        heading: head,
        subheading: subhead,
        date: date,
      }
    );
    setHead("");
    setSubhead("");
    setDate("");
    console.log(data);
  }
  useEffect(() => {
    async function getdata() {
      const response = await axios.get(
        "https://todo-backend-of32.onrender.com/all"
      );
      setLists(response.data);
      console.log(response.data);
    }
    getdata();
  }, []);

  return (
    <div className="main_container">
      <div className="signout_btn">
        <Link to="/">
          <button>
            <div className="inner">
              <span>
                <Logout />
              </span>
              <span id="sgn"> Sign Out</span>
            </div>
          </button>
        </Link>
      </div>
      <div className="headcontainer">
        <div className="container">
          <div className="heading">TODO App</div>
          <div className="block">
            <input
              className="text"
              type="text"
              placeholder="Add New Task"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <button className="btn" onClick={func}>
              Add
            </button>
          </div>
          <div className={display ? "displayblock" : "display"}>
            <form onSubmit={handleSubmit} className="form">
              <input
                className="textarea px-2 py-3"
                type="text"
                placeholder="task"
                value={head}
                onChange={(e) => {
                  setHead(e.target.value);
                }}
              />
              <input
                className="textarea px-2 py-3"
                type="date"
                placeholder="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                className="textarea px-2 py-3"
                type="text"
                placeholder="description"
                value={subhead}
                onChange={(e) => setSubhead(e.target.value)}
              />
              <button className="submit btn btn-success" type="submit">
                +
              </button>
            </form>
          </div>
          <div className="response">
            {getlist.map((value, index) => {
              return <Component list={value} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
