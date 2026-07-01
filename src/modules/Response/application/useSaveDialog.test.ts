import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";

vi.mock("@modules/Dialogs/infrastructure/dialogApi", () => ({
  postSaveDialog: vi.fn().mockResolvedValue({ data: {} }),
}));

import { postSaveDialog } from "@modules/Dialogs/infrastructure/dialogApi";
import useSaveDialog from "./useSaveDialog";

describe("useSaveDialog", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("persists a dialog via postSaveDialog", () => {
    const { result } = renderHook(() => useSaveDialog());

    const datah = { respuesta: "r", descripcion: "q", tipo: "dialog" };
    result.current.saveDialog(datah);

    expect(postSaveDialog).toHaveBeenCalledWith(expect.any(String), datah);
  });
});
