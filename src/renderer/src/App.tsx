"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Swal from "sweetalert2";
import { useState } from "react";
import { Button, Input, Checkbox } from "@nextui-org/react";
import LogoWithTextAnimation from "./components/logoWithTextAnimation";
import { sign } from "crypto";
import { electronAPI } from "@electron-toolkit/preload";
import { user } from "@prisma/client";

const SignInZod = z.object({
  email: z.string().email(),
  senha: z.string(),
});

type SignInZodType = z.infer<typeof SignInZod>;

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInZodType>({
    resolver: zodResolver(SignInZod),
  });
  const [carregando, setCarregando] = useState<boolean>(false);
  const [exibirSenha, setExibirSenha] = useState<boolean>(false);
  const [valorSenha, setValorSenha] = useState<string>("");

  const OnSubmit = async (data: SignInZodType) => {
    setCarregando(true);
    try {
      const {token, user}: {token: string, user: user} = await window.electron.login(data.email, data.senha);
      if(token){
        Swal.fire({
          title: "Sucesso",
          icon: "success",
        })
      }
    } catch (error) {
      Swal.fire({
        title: "Erro",
        text: `${error}`,
        icon: "error",
      });
    } finally {
      setCarregando(false);
    }
  };
  return (
    <main className="flex flex-col min-h-screen items-center justify-center bg-gradient-radial from-zinc-800/50 via-black to-black">
      <section className="border m-auto h-1/2 border-zinc-200 flex flex-col p-10 px-14 rounded-md gap-7 ">
        <header className="w-full text-[24px] flex flex-row justify-around gap-2 items-center text-white text-center">
          <LogoWithTextAnimation />
        </header>
        <form
          onSubmit={handleSubmit(OnSubmit)}
          className="flex flex-col text-white gap-4"
        >
          <Input
            color="default"
            variant="bordered"
            label="Email"
            type="email"
            {...register("email")}
          />
          <span className="flex flex-col gap-2">
            <Input
              color="default"
              variant="bordered"
              label="Senha"
              value={valorSenha}
              onValueChange={setValorSenha}
              type="password"
              {...register("senha")}
            />
            {
              exibirSenha ? (
                <span className="text-zinc-500 indent-2">Senha: {valorSenha}</span>
              ) : ""
            }
          </span>
          <span className="flex flex-col gap-1">
            <Checkbox 
              isSelected={exibirSenha} 
              onValueChange={setExibirSenha}
              color="success"
              classNames={{
                label: "text-white"
              }}
            >
              Mostrar Senha
            </Checkbox>
          </span>
          <Button
            color="default"
            variant="ghost"
            className="hover:text-black text-white"
            isLoading={carregando}
            type="submit"
          >
            Entra
          </Button>
        </form>
      </section>
    </main>
  );
}
