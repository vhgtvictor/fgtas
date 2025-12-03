import { useState } from 'react';
import CRUDTemplate from './CRUDTemplate';

interface TipoDespesa {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
}

export default function TiposDespesas() {
  const [tipos, setTipos] = useState<TipoDespesa[]>([
    { id: 1, nome: 'Aluguel', descricao: 'Despesas com locação de imóveis', categoria: 'Fixas' },
    { id: 2, nome: 'Energia Elétrica', descricao: 'Contas de energia', categoria: 'Variáveis' },
    { id: 3, nome: 'Internet', descricao: 'Serviços de telecomunicações', categoria: 'Fixas' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<TipoDespesa | null>(null);

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

  const handleAdd = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = (item: TipoDespesa) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleSave = (item: any) => {
    if (item.id) {
      setTipos(tipos.map((t) => (t.id === item.id ? item : t)));
    } else {
      const newItem = { ...item, id: Math.max(...tipos.map((t) => t.id), 0) + 1 };
      setTipos([...tipos, newItem]);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este tipo de despesa?')) {
      setTipos(tipos.filter((t) => t.id !== id));
    }
  };

  return (
    <CRUDTemplate
      title="Tipos de Despesas"
      columns={columns}
      items={tipos}
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
