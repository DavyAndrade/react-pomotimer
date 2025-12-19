import Tasks from "../components/homepage/Tasks/Tasks";

export default function Home() {
  return (
    <main className="w-full bg-gray-800 text-white flex flex-col py-16 items-center px-4">
      <div className="flex flex-col justify-center items-center w-full gap-4 md:max-w-3xl">
        <Tasks />
      </div>
    </main>
  );
}
