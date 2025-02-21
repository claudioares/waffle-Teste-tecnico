export function Login() {
    return (
        <div className="h-screen bg-black flex items-center justify-center p-4">
            <div className="bg-white backdrop-opacity-80 rounded-xl p-8 shadow-xl max-w-sm w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Bem-vindo de volta
                </h2>
                <p className="text-center text-gray-500 mb-8">
                Faça login para continuar
                </p>
                <form>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                        E-mail
                        </label>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
                        placeholder="Digite seu e-mail"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-400 transition duration-300"
                    >
                        Entrar
                    </button>
                </form>
                <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                    Não tem uma conta?{' '}
                    <a href="#" className="text-yellow-500 font-semibold hover:text-yellow-400">
                    Cadastre-se
                    </a>
                </p>
                </div>
            </div>
        </div>
    );
}