const baseUrl: string =
  "https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod";
const errorMsg: string = "Something went wrong. Please, refresh the page.";

export async function getAll<T>(path: string): Promise<T> {
  const res = await fetch(`${baseUrl}/${path}`);

    // if (!res.ok) throw new Error(errorMsg);
    
  if (!res.ok) {
      const error = res.status === 500 ? "Server error" : errorMsg;
      console.log(error);
  }

  const resData: T = await res.json();
  return resData;
}
