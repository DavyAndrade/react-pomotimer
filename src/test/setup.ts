import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Adiciona matchers do jest-dom
expect.extend(matchers);

// Limpa DOM após cada teste
afterEach(() => {
  cleanup();
});
