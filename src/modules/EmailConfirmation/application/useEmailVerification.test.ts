import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("@modules/user/infrastructure/userApi", () => ({
  sendVerificationMail: vi.fn(),
  getValidateMail: vi.fn(),
}));

import { sendVerificationMail } from "@modules/user/infrastructure/userApi";
import useEmailVerification from "./useEmailVerification";

describe("useEmailVerification", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sendVerification routes the email through sendVerificationMail", async () => {
    (sendVerificationMail as any).mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useEmailVerification());

    await act(async () => {
      await result.current.sendVerification("user@example.com");
    });

    expect(sendVerificationMail).toHaveBeenCalledTimes(1);
    expect(sendVerificationMail).toHaveBeenCalledWith(
      "user@example.com",
      expect.any(String)
    );
  });
});
