import { useState, useEffect } from 'react';
import CRUDTemplate from './CRUDTemplate';

interface TipoDespesa {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
}

export default function TiposDespesas() {
  const [tipos, setTipos] = useState<TipoDespesa[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<TipoDespesa | null>(null);

  const API_URL = "http://localhost:3000/api/tipos-despesas";


  const loadData = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTipos(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = () => {
    setEditing(null);
    setShowModal(true);
  };

  const handleEdit = (item: TipoDespesa) => {
    setEditing(item);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadData();
  };

  const handleSubmit = async (formData: any) => {
    if (editing) {
      await fetch(`${API_URL}/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
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
    { key: 'descricao', label: 'Descrição' },
    { key: 'categoria', label: 'Categoria' },
  ];

  const formFields = [
    { key: 'nome', label: 'Nome do Tipo', type: 'text' },
    { key: 'descricao', label: 'Descrição', type: 'text' },
    { key: 'categoria', label: 'Categoria', type: 'text' },
  ];

  return (
    <CRUDTemplate
      title="Tipos de Despesas"
      columns={columns}
      items={tipos}
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

