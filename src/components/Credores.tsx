import { useState } from 'react';
import CRUDTemplate from './CRUDTemplate';

interface Credor {
  id: number;
  nome: string;
  cnpj: string;
  telefone: string;
  email: string;
}

export default function Credores() {
  const [credores, setCredores] = useState<Credor[]>([
    { id: 1, nome: 'Fornecedor ABC Ltda', cnpj: '12.345.678/0001-90', telefone: '(11) 3456-7890', email: 'contato@abc.com' },
    { id: 2, nome: 'Empresa XYZ S.A.', cnpj: '98.765.432/0001-10', telefone: '(21) 9876-5432', email: 'financeiro@xyz.com' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Credor | null>(null);

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

  const handleAdd = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = (item: Credor) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleSave = (item: any) => {
    if (item.id) {
      // Editar existente
      setCredores(credores.map((c) => (c.id === item.id ? item : c)));
    } else {
      // Novo item
      const newItem = { ...item, id: Math.max(...credores.map((c) => c.id), 0) + 1 };
      setCredores([...credores, newItem]);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este credor?')) {
      setCredores(credores.filter((c) => c.id !== id));
    }
  };

  return (
    <CRUDTemplate
      title="Credores"
      columns={columns}
      items={credores}
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
