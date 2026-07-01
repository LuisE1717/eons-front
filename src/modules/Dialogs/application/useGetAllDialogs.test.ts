import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

vi.mock("@modules/Dialogs/infrastructure/dialogApi", () => ({
  getAllDialogs: vi.fn(),
}));

vi.mock("@modules/SpiritualFamily/infrastructure/spiritsApi", () => ({
  getAllSpirits: vi.fn(),
}));

import { getAllDialogs } from "@modules/Dialogs/infrastructure/dialogApi";
import useGetAllDialogs from "./useGetAllDialogs";

describe("useGetAllDialogs", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches dialogs when control is true and exposes the data", async () => {
    const dialogs = [
      {
        id: 1,
        descripcion: "pregunta",
        respuesta: "respuesta",
        id_usuario: "user-1",
        fecha: new Date(),
        tipo: "general",
        favorito: false,
      },
    ];
    (getAllDialogs as any).mockResolvedValue({ data: dialogs });

    const setControl = vi.fn();
    const { result } = renderHook(() =>
      useGetAllDialogs(true, setControl, "general")
    );

    await waitFor(() =>
      expect(getAllDialogs).toHaveBeenCalledWith(expect.any(String), "general")
    );
    await waitFor(() => expect(result.current.data).toEqual(dialogs));

    expect(setControl).toHaveBeenCalledWith(false);
  });

  it("does not fetch when control is false", async () => {
    const setControl = vi.fn();
    const { result } = renderHook(() =>
      useGetAllDialogs(false, setControl, "general")
    );

    expect(getAllDialogs).not.toHaveBeenCalled();
    expect(result.current.data).toEqual([]);
  });
});
