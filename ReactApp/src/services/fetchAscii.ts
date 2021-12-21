export const fetchAscii = async (formData: FormData) => {
  const response = await fetch("https://localhost:7291/api/ascii", {
    method: "POST",
    body: formData,
    mode: "cors",
  });

  return await response.text();
};
