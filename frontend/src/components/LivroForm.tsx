type Props = {
  titulo: string;
  autor: string;
  erro: string;
  onTituloChange: (valor: string) => void;
  onAutorChange: (valor: string) => void;
  onSalvar: (e: React.FormEvent) => void;
};

export function LivroForm({ titulo, autor, erro, onTituloChange, onAutorChange, onSalvar }: Props) {
  return (
    <form onSubmit={onSalvar} className="bg-white p-6 rounded shadow mb-6 space-y-4">
      <h2 className="text-xl">Novo Livro</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input placeholder="Título" value={titulo} onChange={e => onTituloChange(e.target.value)} className="border p-2 rounded" />
        <input placeholder="Autor" value={autor} onChange={e => onAutorChange(e.target.value)} className="border p-2 rounded" />
      </div>
      {erro && <p className="text-red-600">{erro}</p>}
      <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer">
        Salvar
      </button>
    </form>
  );
}
