import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("@modules/user/infrastructure/userApi", () => ({
  postResetPass: vi.fn(),
}));

import { postResetPass } from "@modules/user/infrastructure/userApi";
import useForgetPass from "./useForgetPass";

describe("useForgetPass", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("handleSubmit routes a valid email through postResetPass", async () => {
    (postResetPass as any).mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useForgetPass());

    await act(async () => {
      await result.current.handleSubmit("user@example.com");
    });

    expect(postResetPass).toHaveBeenCalledTimes(1);
    expect(postResetPass).toHaveBeenCalledWith(
      expect.objectContaining({ email: "user@example.com" })
    );
  });

  it("does not call postResetPass for an invalid email", async () => {
    const { result } = renderHook(() => useForgetPass());

    await act(async () => {
      await result.current.handleSubmit("not-an-email");
    });

    expect(postResetPass).not.toHaveBeenCalled();
  });
});
