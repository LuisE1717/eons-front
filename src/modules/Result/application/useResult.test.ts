import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

vi.mock("@modules/Launch/infrastructure/evaluationApi", () => ({
  postMesagges: vi.fn(),
}));

import { postMesagges } from "@modules/Launch/infrastructure/evaluationApi";
import useResult from "./useResult";

describe("useResult", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("calls postMesagges with the stage results and exposes the messages", async () => {
    localStorage.setItem("etp1", JSON.stringify([1, 2, 3]));
    (postMesagges as any).mockResolvedValue({
      success: true,
      data: {
        resultadoFinal: "final",
        interpretacion: "interp",
      },
    });

    const { result } = renderHook(() => useResult("tok", "es"));

    await waitFor(() => {
      expect(result.current.messages).toEqual(["final", "interp"]);
    });

    expect(postMesagges).toHaveBeenCalledWith("tok", {
      type: "evaluacion-etapa1",
      language: "es",
      hexResults: [1, 2, 3],
    });
    expect(result.current.etapa).toBe("Etapa 1");
  });
});
