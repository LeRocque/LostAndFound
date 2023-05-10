import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { debounce } from "lodash";

const Inventory = ({ newItem }) => {
  const [dbData, setDbData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = await fetch("/api/database");
        const data = await query.json();
        setDbData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [newItem]);

  const onDelete = async (id) => {
    try {
      const removed = await fetch("/api/removeItem", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });
      const deletedItem = await removed.json();
      console.log(deletedItem);
      setDbData(dbData.filter((el) => el._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="dbContainer">
      {dbData.map(({ _id, itemName, foundOn }) => (
        <div key={_id}>
          <button onClick={() => onDelete(_id)}>{itemName}</button>
          <p>{foundOn}</p>
        </div>
      ))}
    </div>
  );
};

export default Inventory;
