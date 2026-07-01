import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

vi.mock("../infrastructure/spiritsApi", () => ({
  getAllSpirits: vi.fn(),
}));

import { getAllSpirits } from "../infrastructure/spiritsApi";
import useGetAllSpirits from "./useGetAllSpirits";

describe("useGetAllSpirits", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches spirits when control is true and exposes the data", async () => {
    const spirits = [
      {
        id: "1",
        nombre: "Ancestro",
        description: null,
        descripcion_sistema: "sys",
        foto: null,
      },
    ];
    (getAllSpirits as any).mockResolvedValue({ data: spirits });

    const setControl = vi.fn();
    const { result } = renderHook(() => useGetAllSpirits(true, setControl));

    await waitFor(() => expect(getAllSpirits).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(result.current.data).toEqual(spirits));

    expect(setControl).toHaveBeenCalledWith(false);
  });

  it("does not fetch when control is false", async () => {
    const setControl = vi.fn();
    const { result } = renderHook(() => useGetAllSpirits(false, setControl));

    expect(getAllSpirits).not.toHaveBeenCalled();
    expect(result.current.data).toEqual([]);
  });
});
