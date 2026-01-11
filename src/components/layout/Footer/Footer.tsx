import { Heading } from "../../ui/Typography";

export default function Footer() {
  return (
    <footer className="flex flex-col w-full bg-gray-800 text-white min-h-16">
      <div className="flex justify-center items-center w-full p-4 md:mx-auto border-t-2 border-gray-700">
        <Heading as="h4">© 2025 Pomotimer</Heading>
      </div>
    </footer>
  );
}
