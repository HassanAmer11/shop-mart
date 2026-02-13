import { LoginForm } from "@/components/Auth/LoginForm";

export default function Login() {
  return <div className="w-full flex flex-col justify-center items-center">
    <h2 className="text-3xl font-bold mb-5">Login</h2>
    <LoginForm/>
  </div>;
}
