import {
  postThrow as postThrowApi,
  closeThrow as closeThrowApi,
} from "@modules/Throw/infrastructure/throwApi";

// Use case: expose the throw network calls as a thin seam so the UI never
// talks to infrastructure directly. Keeps the same signatures the component
// already relies on.
export default function useThrow() {
  const postThrow = (token: string, code: string, dataE: any) =>
    postThrowApi(token, code, dataE);

  const closeThrow = (token: string) => closeThrowApi(token);

  return { postThrow, closeThrow };
}
