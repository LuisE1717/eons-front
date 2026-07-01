import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";

vi.mock("@modules/payment/infrastructure/paymentApi", () => ({
  confirmPayment: vi.fn(),
}));

import { confirmPayment } from "@modules/payment/infrastructure/paymentApi";
import useForm from "./useForm";

describe("useForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("confirm() routes the payment through confirmPayment", async () => {
    (confirmPayment as any).mockResolvedValue({ data: {} });

    const { result } = renderHook(() => useForm());

    const payload = { bankOrderCode: "abc", reference: "ref-1" };
    await result.current.confirm(payload);

    expect(confirmPayment).toHaveBeenCalledTimes(1);
    expect(confirmPayment).toHaveBeenCalledWith(expect.any(String), payload);
  });
});
