import { useState } from "react";

const CreateStoreForm = ({ onStoreCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("store", JSON.stringify(formData));
    alert("Store created successfully!");
    onStoreCreated(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Create Your Store</h2>

      <input
        type="text"
        name="name"
        placeholder="Store Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded mb-3"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Contact Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded mb-3"
        required
      />
      <textarea
        name="address"
        placeholder="Store Address"
        value={formData.address}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded mb-3"
        required
      />

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Create Store
      </button>
    </form>
  );
};

export default CreateStoreForm;
