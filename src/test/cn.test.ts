import { describe, it, expect } from "vitest";
import { cn } from "../lib/utils";

describe("cn utility function", () => {
  it("deve combinar múltiplas classes corretamente", () => {
    const result = cn("px-4", "py-2", "bg-blue-500");
    expect(result).toBe("px-4 py-2 bg-blue-500");
  });

  it("deve resolver conflitos do Tailwind", () => {
    const result = cn("px-4", "px-6", "bg-blue-500", "bg-red-500");
    expect(result).toBe("px-6 bg-red-500");
  })
});
