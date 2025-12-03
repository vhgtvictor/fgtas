import { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

interface Lancamento {
  id: number;
  credor: string;
  baseFisica: string;
  tipoDespesa: string;
  mesCompetencia: string;
  dataVencimento: string;
  valorLiquido: number;
  valorMulta: number;
  valorJuros: number;
  valorCorrecao: number;
  valorTotal: number;
}

export default function Lancamentos() {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([
    {
      id: 1,
      credor: 'Fornecedor ABC Ltda',
      baseFisica: 'Matriz São Paulo',
      tipoDespesa: 'Aluguel',
      mesCompetencia: '2024-01',
      dataVencimento: '2024-01-10',
      valorLiquido: 5000,
      valorMulta: 50,
      valorJuros: 30,
      valorCorrecao: 20,
      valorTotal: 5100,
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState<Lancamento | null>(null);
  const [formData, setFormData] = useState({
    id: 0,
    credor: '',
    baseFisica: '',
    tipoDespesa: '',
    mesCompetencia: '',
    dataVencimento: '',
    valorLiquido: '',
    valorMulta: '',
    valorJuros: '',
    valorCorrecao: '',
    valorTotal: 0,
  });

  const calcularValorTotal = () => {
    const liquido = parseFloat(formData.valorLiquido) || 0;
    const multa = parseFloat(formData.valorMulta) || 0;
    const juros = parseFloat(formData.valorJuros) || 0;
    const correcao = parseFloat(formData.valorCorrecao) || 0;
    return liquido + multa + juros + correcao;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setFormData({
      id: 0,
      credor: '',
      baseFisica: '',
      tipoDespesa: '',
      mesCompetencia: '',
      dataVencimento: '',
      valorLiquido: '',
      valorMulta: '',
      valorJuros: '',
      valorCorrecao: '',
      valorTotal: 0,
    });
    setShowModal(true);
  };

  const handleEdit = (lancamento: Lancamento) => {
    setEditingItem(lancamento);
    setFormData({
      id: lancamento.id,
      credor: lancamento.credor,
      baseFisica: lancamento.baseFisica,
      tipoDespesa: lancamento.tipoDespesa,
      mesCompetencia: lancamento.mesCompetencia,
      dataVencimento: lancamento.dataVencimento,
      valorLiquido: String(lancamento.valorLiquido),
      valorMulta: String(lancamento.valorMulta),
      valorJuros: String(lancamento.valorJuros),
      valorCorrecao: String(lancamento.valorCorrecao),
      valorTotal: lancamento.valorTotal,
    });
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const novoLancamento: Lancamento = {
      id: formData.id || Math.max(...lancamentos.map((l) => l.id), 0) + 1,
      credor: formData.credor,
      baseFisica: formData.baseFisica,
      tipoDespesa: formData.tipoDespesa,
      mesCompetencia: formData.mesCompetencia,
      dataVencimento: formData.dataVencimento,
      valorLiquido: parseFloat(formData.valorLiquido) || 0,
      valorMulta: parseFloat(formData.valorMulta) || 0,
      valorJuros: parseFloat(formData.valorJuros) || 0,
      valorCorrecao: parseFloat(formData.valorCorrecao) || 0,
      valorTotal: calcularValorTotal(),
    };

    if (formData.id) {
      setLancamentos(lancamentos.map((l) => (l.id === formData.id ? novoLancamento : l)));
    } else {
      setLancamentos([...lancamentos, novoLancamento]);
    }
    
    setShowModal(false);
    setFormData({
      id: 0,
      credor: '',
      baseFisica: '',
      tipoDespesa: '',
      mesCompetencia: '',
      dataVencimento: '',
      valorLiquido: '',
      valorMulta: '',
      valorJuros: '',
      valorCorrecao: '',
      valorTotal: 0,
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este lançamento?')) {
      setLancamentos(lancamentos.filter((l) => l.id !== id));
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Lançamentos de Despesas</h2>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="w-5 h-5" />
            Novo Lançamento
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar lançamentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Base Física
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Competência
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vencimento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lancamentos.map((lancamento) => (
                <tr key={lancamento.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {lancamento.credor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lancamento.baseFisica}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lancamento.tipoDespesa}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(lancamento.mesCompetencia + '-01').toLocaleDateString('pt-BR', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(lancamento.dataVencimento).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {formatCurrency(lancamento.valorTotal)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleEdit(lancamento)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(lancamento.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingItem ? 'Editar' : 'Novo'} Lançamento de Despesa
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Credor
                  </label>
                  <select
                    value={formData.credor}
                    onChange={(e) => handleInputChange('credor', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Selecione um credor</option>
                    <option value="Fornecedor ABC Ltda">Fornecedor ABC Ltda</option>
                    <option value="Empresa XYZ S.A.">Empresa XYZ S.A.</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Base Física
                  </label>
                  <select
                    value={formData.baseFisica}
                    onChange={(e) => handleInputChange('baseFisica', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Selecione uma base</option>
                    <option value="Matriz São Paulo">Matriz São Paulo</option>
                    <option value="Filial Rio de Janeiro">Filial Rio de Janeiro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de Despesa
                  </label>
                  <select
                    value={formData.tipoDespesa}
                    onChange={(e) => handleInputChange('tipoDespesa', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Selecione um tipo</option>
                    <option value="Aluguel">Aluguel</option>
                    <option value="Energia Elétrica">Energia Elétrica</option>
                    <option value="Internet">Internet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mês de Competência
                  </label>
                  <input
                    type="month"
                    value={formData.mesCompetencia}
                    onChange={(e) => handleInputChange('mesCompetencia', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Vencimento
                  </label>
                  <input
                    type="date"
                    value={formData.dataVencimento}
                    onChange={(e) => handleInputChange('dataVencimento', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valor Líquido
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.valorLiquido}
                    onChange={(e) => handleInputChange('valorLiquido', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valor Multa
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.valorMulta}
                    onChange={(e) => handleInputChange('valorMulta', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valor Juros
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.valorJuros}
                    onChange={(e) => handleInputChange('valorJuros', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valor Correção
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.valorCorrecao}
                    onChange={(e) => handleInputChange('valorCorrecao', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valor Total
                  </label>
                  <input
                    type="text"
                    value={`R$ ${calcularValorTotal()}`}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded-lg text-gray-700 font-semibold"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {editingItem ? 'Atualizar' : 'Salvar'} Lançamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
