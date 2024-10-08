import { useState } from "react";

function App() {
  const [packing_list, setPacking_list] = useState([
    { item_name: "towel", packed: true, quantity: 1 },
    { item_name: "toothbrush", packed: false, quantity: 2 },
    { item_name: "sunglasses", packed: true, quantity: 2 },
    { item_name: "swimsuit", packed: false, quantity: 1 },
    { item_name: "sunscreen", packed: true, quantity: 2 },
    { item_name: "flip flops", packed: false, quantity: 3 },
    { item_name: "passport", packed: true, quantity: 2 },
    { item_name: "camera", packed: false, quantity: 1 },
    { item_name: "hat", packed: true, quantity: 4 },
    { item_name: "snacks", packed: false, quantity: 9 },
    { item_name: "water bottle", packed: true, quantity: 5 },
    { item_name: "charging cable", packed: false, quantity: 2 },
  ]);

  return (
    <element>
      <Header packing_list={packing_list} setPacking_list={setPacking_list} />
      <List packing_list={packing_list} setPacking_list={setPacking_list} />
      <Footer packing_list={packing_list} />
    </element>
  );
}

function Header({ packing_list, setPacking_list }) {
  const [newItem, setNewItem] = useState("");

  function addItem(e) {
    e.preventDefault();
    if (newItem === "") return;
    const newObj = { item_name: newItem, packed: false, quantity: 1 };
    setPacking_list((packing_list) => [newObj, ...packing_list]);
    setNewItem("");
  }

  return (
    <div className="header">
      <h1>🌴Far Away🌴</h1>
      <h3 className="sub-heading">What do you need for your trip? 📁</h3>
      <div className="sub-heading">
        <form onSubmit={addItem}>
          <div className="input-h3">
            <input
              type="text>"
              placeholder="Add new item"
              onChange={(e) => {
                setNewItem(e.target.value);
              }}
              value={newItem}
            ></input>
            <button>Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function List({ packing_list, setPacking_list }) {
  function delete_item(itemname) {
    setPacking_list(() => {
      return packing_list.filter((iter) => iter.item_name !== itemname);
    });
  }

  function onCheckboxChange(itemname) {
    console.log("checking, unchecking");

    setPacking_list((prevPackingList) => {
      return prevPackingList.map((item) => {
        if (item.item_name === itemname) {
          // Toggle the packed property
          return { ...item, packed: !item.packed };
        } else {
          return item; // Return the other items unchanged
        }
      });
    });
  }
  return (
    <div className="list-div1 row">
      {packing_list.map((item, index) => {
        return (
          <div
            className="div2 d-flex justify-content-left col-sm-3 align-items-center"
            key={index}
          >
            <input
              type="checkbox"
              className="item_checkbox"
              onChange={() => onCheckboxChange(item.item_name)}
              checked={item.packed}
            ></input>
            <p
              style={item.packed ? { textDecoration: "line-through" } : {}}
              className="item_description"
            >
              {item.quantity} {item.item_name}
            </p>
            <button
              className="list_button"
              onClick={() => delete_item(item.item_name)}
            >
              ❌
            </button>
          </div>
        );
      })}
    </div>
  );
}

function Footer({ packing_list }) {
  const packedItemsCount = packing_list
    .filter((el) => el.packed)
    .reduce((sum, el) => sum + 1, 0);
  const totalItems = packing_list.length;
  return (
    <div className="sub-heading">
      <h3>
        You have packed {packedItemsCount} items out of {totalItems}
      </h3>
    </div>
  );
}

export default App;
