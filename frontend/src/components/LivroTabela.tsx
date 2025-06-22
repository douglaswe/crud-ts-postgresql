import type { Livro } from '../types';

type Props = {
  livros: Livro[];
  carregando: boolean;
  onEditar: (livro: Livro) => void;
  onExcluir: (livro: Livro) => void;
};

export function LivroTabela({ livros, carregando, onEditar, onExcluir }: Props) {

  if (carregando) return <p className="p-4 text-center text-gray-500">Carregando...</p>;
  if (!livros || livros.length === 0) return <p className="p-4 text-center text-gray-500">Nenhum livro</p>;
  return (
    <div className="bg-white shadow rounded">
      <table className="min-w-full">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">Título</th>
            <th className="px-4 py-2">Autor</th>
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map(livro => (
            <tr key={livro.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2 text-center">{livro.titulo}</td>
              <td className="px-4 py-2 text-center">{livro.autor}</td>
              <td className="px-4 py-2 flex gap-2 items-center justify-center">
                <button onClick={() => onEditar(livro)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer">Editar</button>
                <button onClick={() => onExcluir(livro)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded cursor-pointer">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
