import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("../infrastructure/spiritsApi", () => ({
  postCreateSpirit: vi.fn(),
}));

vi.mock("js-cookie", () => ({
  default: { get: vi.fn(() => "tok") },
}));

import { postCreateSpirit } from "../infrastructure/spiritsApi";
import useCreateSpirit from "./useCreateSpirit";

describe("useCreateSpirit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls postCreateSpirit with the token and returns its result", async () => {
    const apiResult = { data: { id: "1" } } as any;
    (postCreateSpirit as any).mockResolvedValue(apiResult);

    const { result } = renderHook(() => useCreateSpirit());

    let returned: any;
    await act(async () => {
      returned = await result.current.createSpirit();
    });

    expect(postCreateSpirit).toHaveBeenCalledWith("tok");
    expect(returned).toBe(apiResult);
    expect(result.current.isCreating).toBe(false);
  });
});
