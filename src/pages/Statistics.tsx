import { useEffect } from "react";

export default function Statistics() {
  useEffect(() => {
    document.title = "Pomotimer - Statistics";
  });

  return <h1 className="text-2xl font-bold">Statistics Page</h1>;
}
