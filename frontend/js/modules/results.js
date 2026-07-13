export async function fetchResults() {
  let res = await fetch('/api/v1/results');
  return await res.json();
}