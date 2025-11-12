import React, { useState, useEffect } from "react";
import TagView from "./components/TagView";
import { BACKEND_API } from "./utils/constants";

function App() {
  const [trees, setTrees] = useState([]);
  const [exportedData, setExportedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [lastSavedTreeId, setLastSavedTreeId] = useState(null);

  useEffect(() => {
    loadTrees();
  }, []);

  // Load and normalize trees from backend
  async function loadTrees() {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_API}/trees`);
      if (!res.ok) throw new Error("Failed to fetch trees");
      const data = await res.json();
      const normalized = data.map((item) => {
        if (item.tree) {
          return {
            id: item.id,
            name: item.name || item.tree.name,
            tree: item.tree,
          };
        }
        if (item.tree_json) {
          try {
            const parsed =
              typeof item.tree_json === "string"
                ? JSON.parse(item.tree_json)
                : item.tree_json;
            return {
              id: item.id,
              name: item.name || parsed.name,
              tree: parsed,
            };
          } catch {
            return {
              id: item.id,
              name: item.name || "Tree",
              tree: { name: item.name || "Tree", children: [] },
            };
          }
        }
        if (item.tree_data) {
          return {
            id: item.id,
            name: item.name || item.tree_data.name,
            tree: item.tree_data,
          };
        }
        return { id: item.id, name: item.name || item.name, tree: { ...item } };
      });

      setTrees(normalized);
    } catch (err) {
      console.error("Error fetching trees:", err);
      setTrees([]);
    } finally {
      setLoading(false);
    }
  }

  // Add new tree
  const handleAddTree = () => {
    let rootName = prompt("Enter root name of a tree.", "Root Node");
    if (!rootName) return;

    // Default tree structure
    const newTree = {
      name: rootName,
      children: [{ name: "New Child", data: "Data" }],
    };

    fetch(`${BACKEND_API}/trees/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTree),
    })
      .then((res) => res.json())
      .then((savedTree) => {
        alert("✅ A new tree is created Successfully!");
        setExportedData(null);
        setLastSavedTreeId(savedTree.id);
        loadTrees();
      })
      .catch((err) => console.error("Error adding tree:", err));
  };

  // clean tree before saving (children XOR data enforced)
  const cleanTree = (node) => {
    const cleaned = { name: node.name };
    if (node.children && node.children.length > 0) {
      cleaned.children = node.children.map(cleanTree);
    } else if (
      node.data !== undefined &&
      node.data !== null &&
      String(node.data).trim() !== ""
    ) {
      cleaned.data = node.data;
    }
    return cleaned;
  };

  // Save/Export with multiple backend-format attempts (robust)
  const handleExport = async (treeObj, id) => {
    const cleaned = cleanTree(treeObj);
    setExportedData(cleaned);

    const attempts = [
      {
        url: `${BACKEND_API}/trees/${id}`,
        body: { tree_json: JSON.stringify(cleaned) },
      },
      { url: `${BACKEND_API}/trees/${id}`, body: cleaned },
      { url: `${BACKEND_API}/tags/${id}`, body: cleaned },
    ];

    let success = false;
    for (const attempt of attempts) {
      try {
        const res = await fetch(attempt.url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(attempt.body),
        });
        if (res.ok) {
          success = true;
          break;
        }
      } catch (err) {
        console.warn("Save attempt error:", err);
      }
    }

    if (success) {
      alert("✅ Tree saved successfully!");
      setLastSavedTreeId(id);
      await loadTrees();
    } else {
      alert("❌ Failed to save tree. Check backend / console.");
    }
  };

  // Update local tree state when TagView calls onChange(updatedNode)
  const handleTreeChange = (updatedTree, index) => {
    setTrees((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...(updated[index] || {}),
        tree: updatedTree,
        name: updatedTree.name,
        id: updated[index]?.id,
      };
      return updated;
    });
  };

  // Helper to extract node passed into TagView
  const getNodeForRender = (item) => {
    if (item.tree) return item.tree;
    if (item.name && (item.children || item.data !== undefined)) return item;
    return { name: item.name || "Root", children: item.children || [] };
  };

  // Render
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        🌳 Nested Tags Tree Manager
      </h1>

      <button
        onClick={handleAddTree}
        disabled={adding}
        className={`mb-6 ${
          adding ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
        } text-white px-4 py-2 rounded`}
      >
        ➕ Add Tree
      </button>

      {loading ? (
        <div>Loading...</div>
      ) : trees.length === 0 ? (
        <p className="text-gray-700 text-lg font-medium">
          No trees to display. Click <b>Add Tree</b> to create one.
        </p>
      ) : (
        trees.map((item, idx) => {
          const node = getNodeForRender(item);
          const id = item.id;

          const isCollapsed = id !== lastSavedTreeId;

          return (
            <div key={id || idx} className="mb-8 border-b pb-4">
              <TagView
                node={node}
                collapsed={isCollapsed}
                onChange={(updatedNode) => handleTreeChange(updatedNode, idx)}
              />
              <button
                onClick={() => handleExport(node, id)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                💾 Export / Save
              </button>
            </div>
          );
        })
      )}

      {exportedData && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Exported Tree:
          </h2>
          <pre className="bg-white p-3 rounded border overflow-x-auto text-sm">
            {JSON.stringify(exportedData, null, 4)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
