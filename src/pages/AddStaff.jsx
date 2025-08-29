import React, { useState } from "react";

const RoleForm = () => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [workspace, setWorkspace] = useState("");
  const [userStatus, setUserStatus] = useState(true);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 bg-[#f9fafb] rounded-xl shadow-md w-full max-w-5xl mx-auto mt-15">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
      >
        ← Back
      </button>

      <h2 className="text-xl font-semibold mb-4">Roles Information</h2>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Role Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Role Name</label>
          <input
            type="text"
            placeholder="Enter role name"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Add Workspace */}
        <div>
          <label className="block text-sm font-medium mb-1">Add Workspace</label>
          <select
            value={workspace}
            onChange={(e) => setWorkspace(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select Workspace</option>
            <option value="Workspace 1">Workspace 1</option>
            <option value="Workspace 2">Workspace 2</option>
          </select>
        </div>

        {/* Tag Input */}
        <div>
          <label className="block text-sm font-medium mb-1">Tags</label>
          <div className="flex items-center border rounded-lg px-2 py-2 w-[100%] max-w-[400px] overflow-x-auto whitespace-nowrap scrollbar-thin">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-orange-500 text-white px-2 py-1 rounded-lg mr-2 flex items-center"
              >
                {tag}
                <button
                  onClick={() => removeTag(index)}
                  className="ml-2 text-sm"
                >
                  ✕
                </button>
              </span>
            ))}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type and press Enter"
              className="flex-grow min-w-[120px] border-none focus:ring-0 outline-none"
            />
          </div>
        </div>

        {/* User Name */}
        <div>
          <label className="block text-sm font-medium mb-1">User Name</label>
          <input
            type="text"
            placeholder="Enter user name"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {/* User Status */}
      <div className="mt-6 flex items-center gap-8">
        <label className="text-sm font-medium">User Status:</label>
        <label className="flex items-center gap-2 text-lg">
          <input
            type="radio"
            name="status"
            checked={userStatus}
            onChange={() => setUserStatus(true)}
            className="w-5 h-5"
          />
          Active
        </label>
        <label className="flex items-center gap-2 text-lg">
          <input
            type="radio"
            name="status"
            checked={!userStatus}
            onChange={() => setUserStatus(false)}
            className="w-5 h-5"
          />
          Inactive
        </label>
      </div>

      {/* Create Role Button */}
      <div className="mt-8">
        <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
          Create Role
        </button>
      </div>
    </div>
  );
};

export default RoleForm;
