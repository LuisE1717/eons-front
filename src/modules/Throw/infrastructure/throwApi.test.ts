import { describe, it, expect, vi } from "vitest";

vi.mock("@modules/Shared/infrastructure/httpClient", () => ({
  axiosI: vi.fn(() => ({ get: vi.fn(), post: vi.fn() })),
}));

describe("throwApi", () => {
  it("exposes postThrow and closeThrow as functions", async () => {
    const mod = await import("./throwApi");
    expect(typeof mod.postThrow).toBe("function");
    expect(typeof mod.closeThrow).toBe("function");
  });
});
