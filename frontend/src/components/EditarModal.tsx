import type { Livro } from '../types';

type Props = {
  livro: Livro;
  onChange: (campo: keyof Livro, valor: string) => void;
  onClose: () => void;
  onSalvar: () => void;
};

export function EditarModal({ livro, onChange, onClose, onSalvar }: Props) {
  return (
    <div className="fixed inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
        <h3 className="text-lg font-semibold">Editar Livro #{livro.titulo}</h3>
        <input value={livro.titulo} placeholder='Titulo' onChange={e => onChange('titulo', e.target.value)} className="border p-2 w-full rounded" />
        <input value={livro.autor} placeholder='Autor' onChange={e => onChange('autor', e.target.value)} className="border p-2 w-full rounded" />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 cursor-pointer">Cancelar</button>
          <button onClick={onSalvar} className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">Salvar</button>
        </div>
      </div>
    </div>
  );
}
