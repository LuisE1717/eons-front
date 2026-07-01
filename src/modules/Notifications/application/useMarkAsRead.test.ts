import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";

vi.mock("@modules/user/infrastructure/userApi", () => ({
  patchNotification: vi.fn(),
}));

import { patchNotification } from "@modules/user/infrastructure/userApi";
import useMarkAsRead from "./useMarkAsRead";

describe("useMarkAsRead", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("marks a notification as read via patchNotification", () => {
    const { result } = renderHook(() => useMarkAsRead());

    result.current.markAsRead(42);

    expect(patchNotification).toHaveBeenCalledWith(expect.any(String), {
      id: 42,
      state: true,
    });
  });
});
