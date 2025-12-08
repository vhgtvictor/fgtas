import { useState, useEffect } from "react";
import CRUDTemplate from "../components/CRUDTemplate";

export default function Lancamentos() {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const formFields = [
    { key: "credor", label: "Credor", type: "text" },
    { key: "baseFisica", label: "Base Física", type: "text" },
    { key: "tipoDespesa", label: "Tipo da Despesa", type: "text" },
    { key: "mesCompetencia", label: "Mês Competência", type: "month" },
    { key: "dataVencimento", label: "Data de Vencimento", type: "date" },
    { key: "valorLiquido", label: "Valor Líquido", type: "number" },
    { key: "valorMulta", label: "Multa", type: "number" },
    { key: "valorJuros", label: "Juros", type: "number" },
    { key: "valorCorrecao", label: "Correção", type: "number" },
  ];

  const columns = [
    { key: "credor", label: "Credor" },
    { key: "baseFisica", label: "Base Física" },
    { key: "tipoDespesa", label: "Tipo" },
    { key: "mesCompetencia", label: "Competência" },
    { key: "dataVencimento", label: "Vencimento" },
    { key: "valorTotal", label: "Total" },
  ];

 
  const fetchLancamentos = async () => {
    const res = await fetch("http://localhost:3000/api/lancamentos");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchLancamentos();
  }, []);


  const handleSubmit = async (formData) => {
    const valorTotal =
      Number(formData.valorLiquido || 0) +
      Number(formData.valorMulta || 0) +
      Number(formData.valorJuros || 0) +
      Number(formData.valorCorrecao || 0);

    if (editing) {
      await fetch(`http://localhost:3000/api/lancamentos/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, valorTotal }),
      });
    } else {
      await fetch("http://localhost:3000/api/lancamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, valorTotal }),
      });
    }

    setShowModal(false);
    setEditing(null);
    fetchLancamentos();
  };

  
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/lancamentos/${id}`, {
      method: "DELETE",
    });
    fetchLancamentos();
  };

  return (
    <CRUDTemplate
      title="Lançamentos de Despesas"
      columns={columns}
      items={items}
      onAdd={() => { setEditing(null); setShowModal(true); }}
      onEdit={(item) => { setEditing(item); setShowModal(true); }}
      onDelete={handleDelete}
      formFields={formFields}
      showModal={showModal}
      onCloseModal={() => setShowModal(false)}
      onSubmit={handleSubmit}
      editing={editing}
    />
  );
}
