import { useState } from 'react';
import CRUDTemplate from './CRUDTemplate';

interface BaseFisica {
  id: number;
  nome: string;
  cidade: string;
  estado: string;
  endereco: string;
}

export default function BasesFisicas() {
  const [bases, setBases] = useState<BaseFisica[]>([
    { id: 1, nome: 'Matriz São Paulo', cidade: 'São Paulo', estado: 'SP', endereco: 'Av. Paulista, 1000' },
    { id: 2, nome: 'Filial Rio de Janeiro', cidade: 'Rio de Janeiro', estado: 'RJ', endereco: 'Av. Atlântica, 500' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<BaseFisica | null>(null);

  const columns = [
    { key: 'nome', label: 'Nome' },
    { key: 'cidade', label: 'Cidade' },
    { key: 'estado', label: 'Estado' },
    { key: 'endereco', label: 'Endereço' },
  ];

  const formFields = [
    { key: 'nome', label: 'Nome da Base', type: 'text' },
    { key: 'cidade', label: 'Cidade', type: 'text' },
    { key: 'estado', label: 'Estado', type: 'text' },
    { key: 'endereco', label: 'Endereço', type: 'text' },
  ];

  const handleAdd = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = (item: BaseFisica) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleSave = (item: any) => {
    if (item.id) {
      setBases(bases.map((b) => (b.id === item.id ? item : b)));
    } else {
      const newItem = { ...item, id: Math.max(...bases.map((b) => b.id), 0) + 1 };
      setBases([...bases, newItem]);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar esta base física?')) {
      setBases(bases.filter((b) => b.id !== id));
    }
  };

  return (
    <CRUDTemplate
      title="Bases Físicas"
      columns={columns}
      items={bases}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onSave={handleSave}
      formFields={formFields}
      showModal={showModal}
      onCloseModal={() => setShowModal(false)}
      editingItem={editingItem}
    />
  );
}
