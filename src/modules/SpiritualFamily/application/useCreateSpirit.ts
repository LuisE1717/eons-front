import { useState } from "react";
import Cookies from "js-cookie";
import { postCreateSpirit } from "../infrastructure/spiritsApi";

// Use case: create a new spirit. Wraps the infrastructure call so the
// component never talks to the API directly.
export default function useCreateSpirit() {
  const [isCreating, setIsCreating] = useState(false);

  const createSpirit = async () => {
    setIsCreating(true);
    try {
      return await postCreateSpirit(Cookies.get("eons_token") || "");
    } finally {
      setIsCreating(false);
    }
  };

  return { createSpirit, isCreating };
}
