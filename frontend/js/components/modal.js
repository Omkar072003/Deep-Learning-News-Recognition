// modal.js - simple modal popup handling

export function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) {
    console.error(`Modal with id ${modalId} not found.`);
    return;
  }
  modal.style.display = "block";
}

export function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) {
    console.error(`Modal with id ${modalId} not found.`);
    return;
  }
  modal.style.display = "none";
}

export function toggleModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) {
    console.error(`Modal with id ${modalId} not found.`);
    return;
  }
  modal.style.display = modal.style.display === "block" ? "none" : "block";
}
