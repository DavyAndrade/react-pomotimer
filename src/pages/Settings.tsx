import { useEffect } from "react";

export default function Settings() {
  useEffect(() => {
    document.title = "Pomotimer - Settings";
  });

  return <h1 className="text-2xl font-bold">Settings Page</h1>;
}
