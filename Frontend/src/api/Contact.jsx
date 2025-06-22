export async function sendContactForm(formData) {
  const response = await fetch("http://localhost:8000/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Greška prilikom slanja e-maila.");
  }

  return response.json();
}
