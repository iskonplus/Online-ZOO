const baseUrl: string =
  "https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod";

const errorMsg = "Something went wrong. Please, refresh the page.";

export async function getAll<T>(path: string): Promise<T> {
  const res = await fetch(`${baseUrl}/${path}`);
  if (!res.ok) throw new Error(errorMsg);
  return await res.json();
}
