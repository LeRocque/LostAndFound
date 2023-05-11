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
    const confirmation = confirm(
      "WARNING, claiming this item will permanently remove it from the lost and found"
    );
    if (!confirmation) {
      return;
    }
    try {
      const removed = await fetch("/api/removeItem", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });
      const deletedItem = await removed.json();
      setDbData(dbData.filter((el) => el._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const sortAZ = () => {
    setDbData([...dbData].sort((a, b) => a.itemName.localeCompare(b.itemName)));
  };

  const sortZA = () => {
    setDbData([...dbData].sort((a, b) => b.itemName.localeCompare(a.itemName)));
  };

  const sortDateLast = () => {
    setDbData([...dbData].sort((a, b) => b.foundOn.localeCompare(a.foundOn)));
  };

  const sortDateFirst = () => {
    setDbData([...dbData].sort((a, b) => a.foundOn.localeCompare(b.foundOn)));
  };

  return (
    <div>
      <div className="dropdown">
        <button className="dropbtn">Sort By:</button>
        <div className="dropdown-content">
          <ul>
            <li onClick={sortAZ}>Item Name A-Z</li>
            <li onClick={sortZA}>Item Name Z-A</li>
            <li onClick={sortDateLast}>Date Found Last-First</li>
            <li onClick={sortDateFirst}>Date Found First-Last</li>
          </ul>
        </div>
      </div>
      <div id="dbContainer">
        {dbData.map(({ _id, itemName, foundOn }) => (
          <div key={_id} className="dbDoc">
            <p className="stock">{itemName}</p>
            <p className="stock">{foundOn}</p>
            <button className="stock" onClick={() => onDelete(_id)}>
              Click to claim me 🐤
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
