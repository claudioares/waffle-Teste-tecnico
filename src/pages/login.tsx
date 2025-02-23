import { z } from "zod";
import { useForm } from "react-hook-form";
import api from "../services/api";
import { IUserResponse } from "../services/interface";
import { useNavigate } from 'react-router-dom';
import useEmailStorage from "../hooks/useEmailStorage";

type FormData = {
  email: string;
};

export function Login() {
    const { saveEmail } = useEmailStorage();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            const loginSchema = z.object({
                email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
            });
            const _email = loginSchema.safeParse(data);
            if (!_email.success) {
                // Define os erros do zod no react-hook-form
                _email.error.errors.forEach((err) => {
                    setError("email", { message: err.message });
                });
                return;
            }

            const response: IUserResponse = await api.post("/user", {
                email: _email.data.email,
            });

            const responseEmail = response.user.email;
            
            responseEmail === _email.data.email ? navigate('/') : setError("email", { message: "Email invalido" });

            saveEmail(responseEmail);
            return;

        } catch (error) {
             if (error instanceof Error) {
                const axiosError = error as any;
                const erro500 = axiosError.response?.status;

                if (erro500) {
                    setError("email", { message: "Email inválido" });
                }

                console.error("Erro ao fazer login:", error);
            }
        }
    };

  return (
    <div className="h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-white backdrop-opacity-80 rounded-xl p-8 shadow-xl max-w-sm w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Bem-vindo de volta</h2>
        <p className="text-center text-gray-500 mb-8">Faça login para continuar</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
              E-mail
            </label>
            <input
              type="email"
              {...register("email")}
              id="email"
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
              placeholder="Digite seu e-mail"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-400 transition duration-300 cursor-pointer"
          >
            Entrar
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{" "}
            <a href="#" className="text-yellow-500 font-semibold hover:text-yellow-400">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
