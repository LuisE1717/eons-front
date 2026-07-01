import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";

vi.mock("@modules/user/infrastructure/userApi", () => ({
  postLogin: vi.fn(),
  singUp: vi.fn(),
  googleLogin: vi.fn(),
  googleRegister: vi.fn(),
  microsoftLogin: vi.fn(),
}));

import { postLogin } from "@modules/user/infrastructure/userApi";
import useContent from "./useContent";

describe("useContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("handleSubmit routes the login path through postLogin", async () => {
    (postLogin as any).mockResolvedValue({ data: null });

    const { result } = renderHook(() => useContent(null));

    act(() => {
      result.current.handleChangeEmail("user@example.com");
      result.current.handleChangePassword("password123");
    });

    await waitFor(() => expect(result.current.validation_mail).toBe(true));
    await waitFor(() => expect(result.current.validation_pass).toBe(true));

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(postLogin).toHaveBeenCalledTimes(1);
    expect(postLogin).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "password123",
    });
  });
});
