import { describe, it, expect, vi } from "vitest";

vi.mock("js-cookie", () => ({
  default: { get: vi.fn(() => "tok"), set: vi.fn(), remove: vi.fn() },
}));

describe("httpClient", () => {
  it("exposes axiosI and intanceAxios", async () => {
    const mod = await import("./httpClient");
    expect(typeof mod.axiosI).toBe("function");
    expect(mod.intanceAxios).toBeDefined();
  });

  it("axiosI returns an instance with a configured baseURL", async () => {
    const { axiosI } = await import("./httpClient");
    const instance = axiosI("tok");
    expect(instance.defaults.baseURL).toBeDefined();
  });
});
