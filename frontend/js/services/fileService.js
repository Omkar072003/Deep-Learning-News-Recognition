export async function uploadFileService(file) {
  const formData = new FormData();
  formData.append('file', file);
  let res = await fetch('/api/v1/upload', {
    method: 'POST',
    body: formData
  });
  return await res.json();
}