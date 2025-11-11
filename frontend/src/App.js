import React, { useState } from "react";
import TagView from "./components/TagView";

function App() {
  const [tree, setTree] = useState({
    name: "root",
    children: [
      {
        name: "child1",
        children: [
          { name: "child1-child1", data: "Hello" },
          { name: "child1-child2", data: "JS" },
        ],
      },
      { name: "child2", data: "World" },
    ],
  });

  const [exportedData, setExportedData] = useState("");

  const handleTreeChange = () => {
    // re-render tree when updated
    setTree({ ...tree });
  };

  const handleExport = () => {
    // recursive cleaning — remove internal props if any
    const cleanTree = (node) => {
      const obj = { name: node.name };
      if (node.children) obj.children = node.children.map(cleanTree);
      else if (node.data) obj.data = node.data;
      return obj;
    };
    const cleaned = cleanTree(tree);
    setExportedData(JSON.stringify(cleaned));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        🌳 Nested Tags Tree
      </h1>

      <TagView node={tree} onChange={handleTreeChange} />

      <button
        onClick={handleExport}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Export
      </button>

      {/* Exported data display */}
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
