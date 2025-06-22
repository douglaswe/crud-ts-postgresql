import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export function TrocarSenhaLogado() {
    const navigate = useNavigate()
    const [senhaAtual, setSenhaAtual] = useState('')
    const [novaSenha, setNovaSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [mensagem, setMensagem] = useState('')
    const [erro, setErro] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMensagem('')
        setErro('')

        if (novaSenha !== confirmarSenha) {
            setErro('A nova senha e a confirmação devem ser iguais')
            return
        }

        try {
            const token = localStorage.getItem('token')
            await axios.put(
                'http://localhost:3000/usuario/alterar-senha',
                { senhaAtual, novaSenha },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            setMensagem('Senha alterada com sucesso!')
            setSenhaAtual('')
            setNovaSenha('')
            setConfirmarSenha('')
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Erro ao alterar a senha'
            setErro(msg)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">Alterar Senha</h1>

                {mensagem && <p className="text-green-600 mb-4 text-center">{mensagem}</p>}
                {erro && <p className="text-red-600 mb-4 text-center">{erro}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="senhaAtual" className="block text-sm font-medium text-gray-700">Senha atual</label>
                        <input
                            id="senhaAtual"
                            type="password"
                            value={senhaAtual}
                            onChange={e => setSenhaAtual(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="novaSenha" className="block text-sm font-medium text-gray-700">Nova senha</label>
                        <input
                            id="novaSenha"
                            type="password"
                            value={novaSenha}
                            onChange={e => setNovaSenha(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700">Confirmar nova senha</label>
                        <input
                            id="confirmarSenha"
                            type="password"
                            value={confirmarSenha}
                            onChange={e => setConfirmarSenha(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                    >
                        Alterar Senha
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="w-full mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200"
                    >
                        Voltar
                    </button>
                </form>
            </div>
        </div>
    )
}