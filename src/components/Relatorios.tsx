import { useState, useEffect } from 'react';
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
  const [dadosRelatorio, setDadosRelatorio] = useState([]);
  const [opcoesCredor, setOpcoesCredor] = useState([]);
  const [opcoesBase, setOpcoesBase] = useState([]);
  const [opcoesTipoDespesa, setOpcoesTipoDespesa] = useState([]);

  const carregarFiltros = async () => {
    const res1 = await fetch('http://localhost:3000/api/credores');
    const credores = await res1.json();

    const res2 = await fetch('http://localhost:3000/api/bases-fisicas');
    const bases = await res2.json();

    const res3 = await fetch('http://localhost:3000/api/tipos-despesa');
    const tipos = await res3.json();

    setOpcoesCredor(credores);
    setOpcoesBase(bases);
    setOpcoesTipoDespesa(tipos);
  };

  useEffect(() => {
    carregarFiltros();
  }, []);

  const handleFilterChange = (field: string, value: string) => {
    setFiltros({ ...filtros, [field]: value });
  };

  const aplicarFiltros = async () => {
    const params = new URLSearchParams(filtros as any).toString();

    const res = await fetch('http://localhost:3000/api/relatorios?' + params);
    const data = await res.json();

    setDadosRelatorio(data);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
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

              {/* Credor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credor
                </label>
                <select
                  value={filtros.credor}
                  onChange={(e) => handleFilterChange('credor', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Todos os credores</option>
                  {opcoesCredor.map((c: any) => (
                    <option key={c.id} value={c.nome}>{c.nome}</option>
                  ))}
                </select>
              </div>

              {/* Base Física */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Base Física
                </label>
                <select
                  value={filtros.baseFisica}
                  onChange={(e) => handleFilterChange('baseFisica', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Todas as bases</option>
                  {opcoesBase.map((b: any) => (
                    <option key={b.id} value={b.nome}>{b.nome}</option>
                  ))}
                </select>
              </div>

              {/* Tipo Despesa */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Despesa
                </label>
                <select
                  value={filtros.tipoDespesa}
                  onChange={(e) => handleFilterChange('tipoDespesa', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Todos os tipos</option>
                  {opcoesTipoDespesa.map((t: any) => (
                    <option key={t.id} value={t.nome}>{t.nome}</option>
                  ))}
                </select>
              </div>

              {/* Datas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data Início
                </label>
                <input
                  type="date"
                  value={filtros.dataInicio}
                  onChange={(e) => handleFilterChange('dataInicio', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={aplicarFiltros}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Aplicar Filtros
                </button>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* TABELA */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Resultados ({dadosRelatorio.length} registros)
          </h3>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg">
              <Download className="w-5 h-5" /> Excel
            </button>

            <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg">
              <Download className="w-5 h-5" /> PDF
            </button>
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Credor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Base Física</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Competência</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dadosRelatorio.map((item: any) => (
              <tr key={item.id}>
                <td className="px-6 py-4">{item.credor}</td>
                <td className="px-6 py-4">{item.baseFisica}</td>
                <td className="px-6 py-4">{item.tipoDespesa}</td>
                <td className="px-6 py-4">{item.competencia}</td>
                <td className="px-6 py-4">{formatCurrency(item.valorTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
