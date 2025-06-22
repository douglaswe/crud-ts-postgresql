import type { Livro } from '../types';

type Props = {
  livro: Livro;
  onClose: () => void;
  onConfirmar: () => void;
};

export function DeletarModal({ livro, onClose, onConfirmar }: Props) {
  return (
    <div className="fixed inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm">
        <h3 className="text-lg font-semibold">Confirmar exclusão</h3>
        <p>Deseja mesmo excluir <strong>{livro.titulo}</strong>?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 cursor-pointer">Cancelar</button>
          <button onClick={onConfirmar} className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer">Excluir</button>
        </div>
      </div>
    </div>
  );
}
