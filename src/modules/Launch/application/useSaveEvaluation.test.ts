import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("../infrastructure/evaluationApi", () => ({
  postSaveEvaluation: vi.fn(),
}));

import { postSaveEvaluation } from "../infrastructure/evaluationApi";
import useSaveEvaluation from "./useSaveEvaluation";

describe("useSaveEvaluation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls postSaveEvaluation with the token and data and returns its result", async () => {
    const apiResult = { success: true, data: { id: "1" } } as any;
    (postSaveEvaluation as any).mockResolvedValue(apiResult);

    const { result } = renderHook(() => useSaveEvaluation());

    const data = { type: "dialogo-abierto", shortType: "DAB", coinPositions: [[1, 0]] };

    let returned: any;
    await act(async () => {
      returned = await result.current.saveEvaluation("tok", data);
    });

    expect(postSaveEvaluation).toHaveBeenCalledWith("tok", data);
    expect(returned).toBe(apiResult);
    expect(result.current.isSaving).toBe(false);
  });
});
