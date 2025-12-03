import { useState } from 'react';
import { Download, FileText, Filter } from 'lucide-react';

interface FiltrosRelatorio {
  credor: string;
  baseFisica: string;
  tipoDespesa: string;
  dataInicio: string;
  dataFim: string;
}

export default function Relatorios() {
  const [filtros, setFiltros] = useState<FiltrosRelatorio>({
    credor: '',
    baseFisica: '',
    tipoDespesa: '',
    dataInicio: '',
    dataFim: '',
  });

  const [showFiltros, setShowFiltros] = useState(true);

  const dadosRelatorio = [
    {
      id: 1,
      credor: 'Fornecedor ABC Ltda',
      baseFisica: 'Matriz São Paulo',
      tipoDespesa: 'Aluguel',
      competencia: '2024-01',
      valorTotal: 5100,
    },
    {
      id: 2,
      credor: 'Empresa XYZ S.A.',
      baseFisica: 'Filial Rio de Janeiro',
      tipoDespesa: 'Energia Elétrica',
      competencia: '2024-01',
      valorTotal: 2500,
    },
  ];

  const handleFilterChange = (field: string, value: string) => {
    setFiltros({ ...filtros, [field]: value });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const calcularTotal = () => {
    return dadosRelatorio.reduce((acc, item) => acc + item.valorTotal, 0);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Relatórios de Despesas</h2>
          </div>
          <button
            onClick={() => setShowFiltros(!showFiltros)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            <Filter className="w-5 h-5" />
            {showFiltros ? 'Ocultar Filtros' : 'Mostrar Filtros'}
          </button>
        </div>

        {showFiltros && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Filtros</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credor
                </label>
                <select
                  value={filtros.credor}
                  onChange={(e) => handleFilterChange('credor', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                >
                  <option value="">Todos os credores</option>
                  <option value="Fornecedor ABC Ltda">Fornecedor ABC Ltda</option>
                  <option value="Empresa XYZ S.A.">Empresa XYZ S.A.</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Base Física
                </label>
                <select
                  value={filtros.baseFisica}
                  onChange={(e) => handleFilterChange('baseFisica', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                >
                  <option value="">Todas as bases</option>
                  <option value="Matriz São Paulo">Matriz São Paulo</option>
                  <option value="Filial Rio de Janeiro">Filial Rio de Janeiro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Despesa
                </label>
                <select
                  value={filtros.tipoDespesa}
                  onChange={(e) => handleFilterChange('tipoDespesa', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                >
                  <option value="">Todos os tipos</option>
                  <option value="Aluguel">Aluguel</option>
                  <option value="Energia Elétrica">Energia Elétrica</option>
                  <option value="Internet">Internet</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Início
                </label>
                <input
                  type="date"
                  value={filtros.dataInicio}
                  onChange={(e) => handleFilterChange('dataInicio', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Fim
                </label>
                <input
                  type="date"
                  value={filtros.dataFim}
                  onChange={(e) => handleFilterChange('dataFim', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="flex items-end">
                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                  Aplicar Filtros
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Resultados ({dadosRelatorio.length} registros)
          </h3>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
              <Download className="w-5 h-5" />
              Exportar Excel
            </button>
            <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
              <Download className="w-5 h-5" />
              Exportar PDF
            </button>
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
                  Tipo de Despesa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Competência
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dadosRelatorio.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.credor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.baseFisica}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.tipoDespesa}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.competencia + '-01').toLocaleDateString('pt-BR', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {formatCurrency(item.valorTotal)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 border-t-2 border-gray-300">
              <tr>
                <td colSpan={4} className="px-6 py-4 text-right text-sm font-bold text-gray-900">
                  Total Geral:
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  {formatCurrency(calcularTotal())}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
