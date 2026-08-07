import GreetForm from "../../components/greet-form";

export default function GreetPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="w-full max-w-md">
        <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">
          Greeting Demo
        </p>
        <GreetForm />
      </div>
    </main>
  );
}
