type Props = {
  tab: string;
  setTab: (tab: 'livros' | 'config') => void;
};

export function TabsNavegacao({ tab, setTab }: Props) {
  return (
    <nav className="flex gap-4 mb-6 border-b">
      <button
        onClick={() => setTab('livros')}
        className={`pb-2 ${tab === 'livros' ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-600'} cursor-pointer`}
      >
        Livros
      </button>
      <button
        onClick={() => setTab('config')}
        className={`pb-2 ${tab === 'config' ? 'border-b-2 border-blue-600 font-semibold' : 'text-gray-600'} cursor-pointer`}
      >
        Configurações
      </button>
    </nav>
  );
}
