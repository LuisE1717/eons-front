import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("@modules/Throw/infrastructure/throwApi", () => ({
  postThrow: vi.fn(),
  closeThrow: vi.fn(),
}));

import { postThrow, closeThrow } from "@modules/Throw/infrastructure/throwApi";
import useThrow from "./useThrow";

describe("useThrow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("postThrow delegates to the infrastructure call and returns its result", async () => {
    const apiResult = { data: "ok" } as any;
    (postThrow as any).mockResolvedValue(apiResult);

    const { result } = renderHook(() => useThrow());

    let returned: any;
    await act(async () => {
      returned = await result.current.postThrow("tok", "12", "q=1");
    });

    expect(postThrow).toHaveBeenCalledWith("tok", "12", "q=1");
    expect(returned).toBe(apiResult);
  });

  it("closeThrow delegates to the infrastructure call and returns its result", async () => {
    const apiResult = { data: "closed" } as any;
    (closeThrow as any).mockResolvedValue(apiResult);

    const { result } = renderHook(() => useThrow());

    let returned: any;
    await act(async () => {
      returned = await result.current.closeThrow("tok");
    });

    expect(closeThrow).toHaveBeenCalledWith("tok");
    expect(returned).toBe(apiResult);
  });
});
