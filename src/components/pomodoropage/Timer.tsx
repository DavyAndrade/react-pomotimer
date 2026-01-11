import { Heading, ProgressBar } from "../ui";

export default function Timer() {
  return (
    <article className="flex flex-col w-full gap-4 justify-center items-center">
      <Heading as="h2">25:00</Heading>

      <ProgressBar progress={1} />

      <div className="w-full grid grid-cols-3 gap-2">
        <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md transition-colors">
          Reiniciar
        </button>
        <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md transition-colors">
          Iniciar/Pausar
        </button>
        <button className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-md transition-colors">
          Pular
        </button>
      </div>
    </article>
  );
}
