import React, { useState } from "react";

const App = () => {
  // initialize newItem variable and setNewItem func from useState
  const [newItem, setNewItem] = useState("");

  // declare a function handleSubmit that accepts an event as a param
  const handleSubmit = async (e) => {
    // call preventDefault on event to prevent page refresh
    e.preventDefault();
    // intialize awaited fetch request with a method of POST, headers that send a json, and a body that sends an itemName with the value of newItem as a json
    try {
      const result = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemName: newItem }),
      });
      // initialize data to the awaited result of converting result from a json to an object
      const data = await result.json();
      console.log(data);
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
    </div>
  );
};
export default App;
