import { useEffect, useState } from "react";
import CRUDTemplate from "./CRUDTemplate";

export default function BasesFisicas() {
  const [bases, setBases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const loadData = async () => {
    const res = await fetch("http://localhost:3000/api/bases-fisicas");
    const data = await res.json();
    setBases(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (formData) => {
    if (editing) {
      await fetch(`http://localhost:3000/api/bases-fisicas/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      await fetch("http://localhost:3000/api/bases-fisicas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }

    setShowModal(false);
    setEditing(null);
    loadData();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/bases-fisicas/${id}`, {
      method: "DELETE",
    });
    loadData();
  };

  const columns = [
    { key: "nome", label: "Nome" },
    { key: "cidade", label: "Cidade" },
    { key: "estado", label: "Estado" },
    { key: "endereco", label: "Endereço" },
  ];

  const formFields = [
    { key: "nome", label: "Nome", type: "text" },
    { key: "cidade", label: "Cidade", type: "text" },
    { key: "estado", label: "Estado", type: "text" },
    { key: "endereco", label: "Endereço", type: "text" },
  ];

  return (
    <CRUDTemplate
      title="Bases Físicas"
      columns={columns}
      items={bases}
      formFields={formFields}
      showModal={showModal}
      editing={editing}
      onAdd={() => {
        setEditing(null);
        setShowModal(true);
      }}
      onEdit={(item) => {
        setEditing(item);
        setShowModal(true);
      }}
      onDelete={handleDelete}
      onCloseModal={() => {
        setShowModal(false);
        setEditing(null);
      }}
      onSubmit={handleSubmit}
    />
  );
}
