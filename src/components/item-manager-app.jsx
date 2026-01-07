import "./item-manager-app.css";

import { useState, useRef } from "react";

import deleteLogo from "../assets/delete.svg";
import stationaryLogo from "../assets/ink_pen.svg";
import kitchenwareLogo from "../assets/flatware.svg";
import applianceLogo from "../assets/electrical_services.svg";

function ItemManager() {
  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // MUST use ref for name input
  const itemName = useRef(null);

  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [nextId, setNextId] = useState(1);

  function handleAddItem() {
    const name = itemName.current.value.trim();

    if (name === "") {
      setErrorMsg("Item name must not be empty");
      return;
    }

    const duplicated = items.some(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicated) {
      setErrorMsg("Item must not be duplicated");
      return;
    }

    if (category === "") {
      setErrorMsg("Please select a category");
      return;
    }

    if (price < 0) {
      setErrorMsg("Price must not be less than 0");
      return;
    }

    const newItem = {
      id: nextId,
      name,
      category,
      price,
    };

    setItems([...items, newItem]);
    setNextId(nextId + 1);

    itemName.current.value = "";
    setCategory("");
    setPrice("");
    setErrorMsg("");
  }

  function handleDelete(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  return (
    <>
      <div id="h1">Item Management</div>

      <div id="data-area">
        <table id="item-table" className="item-table">
          <thead>
            <tr>
              <th id="col-item-id">ID</th>
              <th id="col-item-name">Name</th>
              <th id="col-item-category">Category</th>
              <th id="col-item-price">Price</th>
              <th id="col-item-action">Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  {item.category === "Stationary" && (
                    <img src={stationaryLogo} alt="Stationary" width="20" />
                  )}
                  {item.category === "Kitchenware" && (
                    <img src={kitchenwareLogo} alt="Kitchenware" width="20" />
                  )}
                  {item.category === "Appliance" && (
                    <img src={applianceLogo} alt="Appliance" width="20" />
                  )}
                </td>
                <td>{item.price}</td>
                <td>
                  <img
                    src={deleteLogo}
                    className="delete-icon"
                    onClick={() => handleDelete(item.id)}
                  />
                </td>
              </tr>
            ))}

            {/* FORM ROW (must be last row) */}
            <tr>
              <td></td>
              <td>
                <input type="text" ref={itemName} placeholder="Item name" />
              </td>
              <td>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Stationary">Stationary</option>
                  <option value="Kitchenware">Kitchenware</option>
                  <option value="Appliance">Appliance</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </td>
              <td>
                <button onClick={handleAddItem}>Add Item</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="error-message">{errorMsg}</div>
    </>
  );
}

export default ItemManager;
