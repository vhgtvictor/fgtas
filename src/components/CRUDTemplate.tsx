import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

export default function CRUDTemplate({
  title,
  columns,
  items,
  onAdd,
  onEdit,
  onDelete,
  formFields,
  showModal,
  onCloseModal,
  onSubmit,
  editing,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({});

  
  useEffect(() => {
    if (editing) {
      setFormData(editing);
    } else {
      setFormData({});
    }
  }, [editing]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white shadow p-6 rounded-lg">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus /> Adicionar
          </button>
        </div>

        {/* Busca */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded-lg w-full"
          />
        </div>

        {/* Tabela */}
        <table className="w-full">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="text-left p-2 border-b">
                  {col.label}
                </th>
              ))}
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {items
              .filter((item) =>
                Object.values(item).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((item) => (
                <tr key={item.id} className="border-b">
                  {columns.map((col) => (
                    <td key={col.key} className="p-2">
                      {item[col.key]}
                    </td>
                  ))}

                  <td className="p-2">
                    <button
                      className="text-blue-600 mr-3"
                      onClick={() => onEdit(item)}
                    >
                      <Edit />
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => onDelete(item.id)}
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Salvar</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {formFields.map((field) => (
                <div key={field.key}>
                  <label className="mr-2">{field.label}</label>
                  <input
                    type={field.type}
                    value={formData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="border px-3 py-2 w-full rounded-lg"
                  />
                </div>
              ))}

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={onCloseModal}
                  className="flex-1 border py-2 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
