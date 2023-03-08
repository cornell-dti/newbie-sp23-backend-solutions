import React, { useEffect, useState } from "react";
import { Newbie } from "../../db-types";
import NewbieCard from "./NewbieCard";
import "./App.css";
import axios from "axios";

function App() {
  const [newbies, setNewbies] = useState<Newbie[]>();
  const [clicked, setClicked] = useState<boolean>();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/allNewbies`)
      .then((res) => {
        const newbs = res.data;
        setNewbies(newbs);
      })
      .catch((err) => console.log(err));
  }, []);

  function addNewbie(event: React.FormEvent) {
    event.preventDefault();
    console.log(event.target);
    // axios
    //   .post(`http://localhost:8080/newNewbie`, { netId: netId, newbie: newbie })
    //   .then((res) => {})
    //   .catch((err) => console.log(err));
  }

  //   function addNewbie(netId: string, newbie: Newbie) {
  //     axios
  //       .post(`http://localhost:8080/newNewbie`, { netId: netId, newbie: newbie })
  //       .then((res) => {})
  //       .catch((err) => console.log(err));
  //   }

  //   const michelle: Newbie = {
  //     firstName: "Michelle",
  //     lastName: "Li",
  //     netId: "myl39",
  //     birthday: "10/09/2002",
  //     year: "junior",
  //   };

  //   addNewbie(michelle.netId, michelle);

  return (
    <div className="App">
      <h1>Newbie Profiles</h1>
      {newbies?.length !== 0 ? (
        newbies?.map((newb) => {
          return (
            <div key={newb.netId}>
              <NewbieCard newbie={newb} />
            </div>
          );
        })
      ) : (
        <div>No newbies...</div>
      )}

      <button onClick={() => setClicked(!clicked)}>
        Click me to add a newbie!
      </button>

      {clicked ? (
        <form onSubmit={addNewbie}>
          <label>First Name</label>
          <input type="text" name="firstName"></input>
          <label>Last Name</label>
          <input type="text" name="lastName"></input>
          <label>NetId</label>
          <input type="text" name="netId"></input>
          <label>Birthday</label>
          <input type="text" name="birthday"></input>
          <label>Year</label>
          <select name="year">
            <option value="freshman">Freshman</option>
            <option value="sophmore">Sophmore</option>
            <option value="junior">Junior</option>
            <option value="senior">Senior</option>
          </select>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
