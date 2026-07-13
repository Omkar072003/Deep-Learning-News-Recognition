// fileUploader.js - handles file input initialization and validation

export function initializeUploader(inputId) {
  const inputElement = document.getElementById(inputId);
  if (!inputElement) {
    console.error(`File input element with id '${inputId}' not found.`);
    return;
  }

  inputElement.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert("No file selected.");
      return;
    }

    // Example: basic file type check (could be extended)
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert("Unsupported file type. Please upload JPG, PNG, or PDF.");
      inputElement.value = ''; // reset file input
      return;
    }

    // Further validations can be added here (file size, etc.)
  });
}
