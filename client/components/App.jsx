import React, { useState } from "react";
import Inventory from "./Inventory";

const App = () => {
  // initialize newItem variable and setNewItem func from useState
  const [newItem, setNewItem] = useState("");

  // declare a function handleSubmit that accepts an event as a param
  const handleSubmit = async (e) => {
    // call preventDefault on event to prevent page refresh
    e.preventDefault();
    // intialize awaited fetch request with a method of POST, headers that send a json, and a body that sends an itemName with the value of newItem as a json
    try {
      const result = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemName: newItem }),
      });
      // initialize data to the awaited result of converting result from a json to an object
      const data = await result.json();
      // reset setNewItem input field
      setNewItem("");
      // catch errors and console.error them
    } catch (err) {
      console.error(err);
    }
  };

  // initialize handleInputChange func that accepts an event as a param
  const handleInputChange = (e) => {
    // call setNewItem and pass in the target value of the event as an arg to it
    setNewItem(e.target.value);
  };

  return (
    <div>
      <div id="top">
        <h2>Please input the name of the item you are returning below</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="newItem"
            value={newItem}
            type="text"
            placeholder="Name of Found Item"
            onChange={handleInputChange}
          />
          <input type="submit" value="Submit" />
        </form>
        <p>Below you will see items returned by other cohort mates.</p>
        <p>
          These items include a description, the date at which they were found,
        </p>
        <p>and the time at which they were submitted to the Lost and Found.</p>
      </div>
      <Inventory newItem={newItem} />
    </div>
  );
};
export default App;
