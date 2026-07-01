import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

vi.mock("@modules/Essence/infrastructure/essenceApi", () => ({
  getPackages: vi.fn(),
  getTransfers: vi.fn(),
  calculatePrice: vi.fn(),
  startPayment: vi.fn(),
  startCustomPayment: vi.fn(),
}));

import {
  getPackages,
  getTransfers,
} from "@modules/Essence/infrastructure/essenceApi";
import useList from "./useList";

describe("useList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads packages on mount and exposes them as the list", async () => {
    const packages = [
      { id: "1", descripcion: "Pack", precio: 10, descuento: 0 },
    ];
    (getPackages as any).mockResolvedValue({ data: packages });
    (getTransfers as any).mockResolvedValue({ data: [] });

    const { result } = renderHook(() => useList());

    await waitFor(() => expect(getPackages).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(result.current.list).toEqual(packages));
  });
});
