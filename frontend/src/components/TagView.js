import React, { useState } from "react";

const TagView = ({ node, onChange, collapsed: collapsedProp = false }) => {
  const [collapsed, setCollapsed] = useState(collapsedProp); 
  const [editing, setEditing] = useState(false);
  const [localData, setLocalData] = useState(node.data || "");
  const [oldData, setOldData] = useState(node.data || "");
  const [oldName, setOldName] = useState(node.name);

  const updateNode = (updatedNode) => {
    onChange && onChange({ ...updatedNode });
  };

  // Handle name editing
  const handleRenameChange = (e) => {
    updateNode({ ...node, name: e.target.value });
  };

  const handleRenameSubmit = (e) => {
    if (e.key === "Enter" || e.type === "blur") {
      if (!node.name.trim()) {
        alert("Name cannot be empty!");
        updateNode({ ...node, name: oldName });
      } else {
        setOldName(node.name);
      }
      setEditing(false);
    }
  };

  // Handle data editing
  const handleDataChange = (e) => setLocalData(e.target.value);

  const handleDataBlur = () => {
    if (!localData.trim()) {
      alert("Data cannot be empty!");
      setLocalData(oldData);
      return;
    }
    setOldData(localData);
    updateNode({ ...node, data: localData });
  };

  // Handle add child ---
  const handleAddChild = () => {
    const newChild = { name: "New Child", data: "Data" };
    const newNode = { ...node };

    // if node had data, convert to parent node
    if ("data" in newNode) {
      delete newNode.data;
      newNode.children = [newChild];
    } else {
      newNode.children = newNode.children
        ? [...newNode.children, newChild]
        : [newChild];
    }

    updateNode(newNode);
  };

  return (
    <div className="ml-4 mt-2 border-l pl-3">
      <div className="flex items-center space-x-2 mb-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-blue-500 font-bold"
        >
          {collapsed ? ">" : "v"}
        </button>

        {editing ? (
          <input
            type="text"
            defaultValue={node.name}
            onChange={handleRenameChange}
            onKeyDown={handleRenameSubmit}
            onBlur={handleRenameSubmit}
            autoFocus
            className="border px-1 py-0.5 rounded text-blue-700 font-semibold"
          />
        ) : (
          <span
            onClick={() => setEditing(true)}
            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md font-semibold cursor-pointer hover:bg-blue-200"
          >
            {node.name}
          </span>
        )}

        <button
          onClick={handleAddChild}
          className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
        >
          + Add Child
        </button>
      </div>

      {!collapsed && (
        <>
          {node.data !== undefined && (
            <input
              type="text"
              value={localData}
              onChange={handleDataChange}
              onBlur={handleDataBlur}
              className="ml-6 border rounded px-2 py-1"
            />
          )}

          {node.children && (
            <div className="ml-6 mt-2">
              {node.children.map((child, index) => (
                <TagView
                  key={index}
                  node={child}
                  onChange={(updatedChild) => {
                    const updatedChildren = node.children.map((c, i) =>
                      i === index ? updatedChild : c
                    );
                    updateNode({ ...node, children: updatedChildren });
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TagView;
