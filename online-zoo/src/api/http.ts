const baseUrl: string =
  "https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod";

const errorMsg = "Something went wrong. Please, refresh the page.";

export async function getAll<T>(path: string): Promise<T> {
  const res = await fetch(`${baseUrl}/${path}`);
//   const res = await fetch("error" + path);
  if (!res.ok) throw new Error(errorMsg);
  return await res.json();
}


export async function getById<T>(path: string, id: string): Promise<T> {
  const res = await fetch(`${baseUrl}/${path}/${id}`);
  // const res = await fetch("error" + path);
  if (!res.ok) throw new Error(errorMsg);

  return await res.json();
}

export async function post<T, B>(path: string, body: B): Promise<T> {
  // const res = await fetch("error" + path, {
    const res = await fetch(`${baseUrl}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

 if (!res.ok) {
    if (res.status >= 500) throw new Error(errorMsg);
    
    const data = await res.json();
    throw new Error(data.error || "Request failed");
  }

  return await res.json();
}
