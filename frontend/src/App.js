import React, { useState, useEffect } from "react";
import TagView from "./components/TagView";

function App() {
  const [trees, setTrees] = useState([]); // can hold multiple trees
  const [exportedData, setExportedData] = useState("");

  // --- Load trees from backend ---
  useEffect(() => {
    fetch("http://127.0.0.1:5000/tags")
      .then((res) => res.json())
      .then((data) => {
        setTrees(data.length ? data : []); // backend returns list of trees
      })
      .catch((err) => console.error("Error fetching trees:", err));
  }, []);

  // --- Helper: clean tree for export ---
  const cleanTree = (node) => {
    const obj = { name: node.name };
    if (node.children) obj.children = node.children.map(cleanTree);
    else if (node.data) obj.data = node.data;
    return obj;
  };

  // --- Export / Save tree ---
  const handleExport = (tree, id) => {
    const cleaned = cleanTree(tree);
    setExportedData(JSON.stringify(cleaned, null, 2));

    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://127.0.0.1:5000/tags/${id}`
      : "http://127.0.0.1:5000/tags";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleaned),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Saved:", data);
        alert("Tree saved successfully!");
      })
      .catch((err) => console.error("Error saving tree:", err));
  };

  // --- Handle updates from TagView ---
  const handleTreeChange = (updatedTree, index) => {
    const updatedTrees = [...trees];
    updatedTrees[index] = updatedTree;
    setTrees(updatedTrees);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        🌳 Nested Tags Tree
      </h1>

      {trees.length === 0 ? (
        <p className="text-gray-600">No trees found in the database.</p>
      ) : (
        trees.map((tree, index) => (
          <div key={index} className="mb-8 border-b pb-4">
            <TagView
              node={tree}
              onChange={() => handleTreeChange({ ...tree }, index)}
            />

            <button
              onClick={() => handleExport(tree, tree.id)} // id from backend
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Export
            </button>
          </div>
        ))
      )}

      {/* Exported JSON display */}
      {exportedData && (
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Exported JSON:
          </h2>
          <pre className="bg-white p-3 rounded border overflow-x-auto text-sm">
            {exportedData}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
