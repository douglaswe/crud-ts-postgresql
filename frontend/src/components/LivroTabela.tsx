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
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-center">Título</th>
            <th className="px-4 py-2 text-center">Autor</th>
            <th className="px-4 py-2 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map(livro => (
          
            <tr key={livro.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2 text-center break-words max-w-xs ">{livro.titulo}</td>
              <td className="px-4 py-2 text-center break-words max-w-xs">{livro.autor}</td>
              <td className="px-4 py-2 flex gap-2 items-center justify-center">
                <button onClick={() => onEditar(livro)} className="text-blue-600 hover:underline text-base cursor-pointer">Editar</button>
                <button onClick={() => onExcluir(livro)} className="text-red-600 hover:underline text-base cursor-pointer">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
