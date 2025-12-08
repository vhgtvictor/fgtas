import { useState, useEffect } from 'react';
import CRUDTemplate from './CRUDTemplate';

interface Credor {
  id: number;
  nome: string;
  cnpj: string;
  telefone: string;
  email: string;
}

export default function Credores() {
  const [credores, setCredores] = useState<Credor[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Credor | null>(null);

  const API_URL = "http://localhost:3000/api/credores";

  // Carregar lista
  const loadData = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setCredores(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = () => {
    setEditing(null);
    setShowModal(true);
  };

  const handleEdit = (item: Credor) => {
    setEditing(item);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadData();
  };

  const handleSubmit = async (formData: any) => {
    if (editing) {
      // UPDATE
      await fetch(`${API_URL}/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      // CREATE
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }

    setShowModal(false);
    loadData();
  };

  const columns = [
    { key: 'nome', label: 'Nome' },
    { key: 'cnpj', label: 'CNPJ' },
    { key: 'telefone', label: 'Telefone' },
    { key: 'email', label: 'Email' },
  ];

  const formFields = [
    { key: 'nome', label: 'Nome do Credor', type: 'text' },
    { key: 'cnpj', label: 'CNPJ', type: 'text' },
    { key: 'telefone', label: 'Telefone', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
  ];

  return (
    <CRUDTemplate
      title="Credores"
      columns={columns}
      items={credores}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      formFields={formFields}
      showModal={showModal}
      onCloseModal={() => setShowModal(false)}
      onSubmit={handleSubmit}
      editing={editing}
    />
  );
}
