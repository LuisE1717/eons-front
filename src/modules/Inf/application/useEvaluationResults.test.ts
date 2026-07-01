import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("@modules/Launch/infrastructure/evaluationApi", () => ({
  postMesagges: vi.fn(),
}));

import { postMesagges } from "@modules/Launch/infrastructure/evaluationApi";
import useEvaluationResults from "./useEvaluationResults";

describe("useEvaluationResults", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("getEtp1Results calls postMesagges and exposes formatted results in a modal", async () => {
    localStorage.setItem("etp1", JSON.stringify([1, 2, 3]));
    (postMesagges as any).mockResolvedValue({
      success: true,
      data: { a: "uno", b: "dos" },
    });

    const { result } = renderHook(() => useEvaluationResults("tok"));

    await act(async () => {
      await result.current.getEtp1Results();
    });

    expect(postMesagges).toHaveBeenCalledWith("tok", {
      type: "evaluacion-etapa1",
      language: "es",
      hexResults: [1, 2, 3],
    });
    expect(result.current.etp1Results).toEqual(["uno", "dos"]);
    expect(result.current.showEtp1Modal).toBe(true);
  });

  it("getEtp2Results does nothing when there is no stored stage", async () => {
    const { result } = renderHook(() => useEvaluationResults("tok"));

    await act(async () => {
      await result.current.getEtp2Results();
    });

    expect(postMesagges).not.toHaveBeenCalled();
    expect(result.current.showEtp2Modal).toBe(false);
  });
});
