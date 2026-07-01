import { useState } from "react";
import {
  postSaveEvaluation,
  type EvaluationData,
  type EvaluationResponse,
} from "../infrastructure/evaluationApi";

// Use case: persist a launch evaluation. Wraps the infrastructure call so the
// component never talks to the API directly.
export default function useSaveEvaluation() {
  const [isSaving, setIsSaving] = useState(false);

  const saveEvaluation = async (
    token: string,
    data: EvaluationData
  ): Promise<EvaluationResponse> => {
    setIsSaving(true);
    try {
      return await postSaveEvaluation(token, data);
    } finally {
      setIsSaving(false);
    }
  };

  return { saveEvaluation, isSaving };
}
