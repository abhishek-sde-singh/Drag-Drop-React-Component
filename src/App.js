import "./App.css";
import { useState, useRef } from "react";
import { initialData } from "./data";

function App() {
  const [data, setData] = useState(initialData);
  const dragItem = useRef();
  const dragContainer = useRef();

  const handleDrop = (e, container) => {
    const item = dragItem.current;
    const source = dragContainer.current;

    setData((prev) => {
      const newData = { ...prev };
      newData[source] = newData[source].filter((i) => i !== item);
      newData[container] = [...newData[container], item];
      return newData;
    });
  };

  const handleDragStart = (e, child, container) => {
    dragItem.current = child;
    dragContainer.current = container;
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  return (
    <div>
      <h1>Drag & Drop</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          height: "300px",
          columnGap: "20px",
        }}
      >
        {Object.keys(data).map((container, index) => {
          return (
            <div
              style={{ backgroundColor: "grey" }}
              key={index}
              onDrop={(e) => handleDrop(e, container)}
              onDragOver={(e) => e.preventDefault()}
            >
              <h1>{container}</h1>
              {data[container].map((child, index) => {
                return (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, child, container)}
                    onDragEnd={(e) => handleDragEnd(e)}
                    style={{
                      height: "20px",
                      width: "max-content",
                      backgroundColor: "red",
                      padding: "6px",
                      margin: "4px",
                      cursor: "move",
                    }}
                  >
                    {child}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
