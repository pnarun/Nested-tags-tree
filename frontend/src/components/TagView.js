import React, { useState } from "react";

const TagView = ({ node, onChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [editing, setEditing] = useState(false);
  const [localData, setLocalData] = useState(node.data || "");
  const [oldData, setOldData] = useState(node.data || "");
  const [oldName, setOldName] = useState(node.name);

  // --- handle data editing ---
  const handleDataChange = (e) => {
    setLocalData(e.target.value);
  };

  const handleDataBlur = () => {
    if (localData.trim() === "") {
      alert("Data field cannot be empty!");
      setLocalData(oldData); // revert
    } else {
      node.data = localData;
      setOldData(localData);
      onChange && onChange();
    }
  };

  // --- handle rename ---
  const handleNameChange = (e) => {
    node.name = e.target.value;
    onChange && onChange();
  };

  const handleRenameSubmit = (e) => {
    if (e.key === "Enter" || e.type === "blur") {
      if (node.name.trim() === "") {
        alert("Tag name cannot be empty!");
        node.name = oldName; // revert
        onChange && onChange();
      } else {
        setOldName(node.name);
      }
      setEditing(false);
    }
  };

  // --- handle add child ---
  const handleAddChild = () => {
    if (node.data) {
      delete node.data;
      node.children = [];
    }
    node.children.push({ name: "New Child", data: "Data" });
    onChange && onChange();
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
            onChange={handleNameChange}
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
          {"data" in node && (
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
                <TagView key={index} node={child} onChange={onChange} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TagView;
