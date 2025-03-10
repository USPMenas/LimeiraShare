export function createModal(
  title: string,
  content: HTMLElement,
  onClose: () => void
) {
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50";

  const modalContent = document.createElement("div");
  modalContent.className = "bg-white p-6 rounded-lg shadow-lg max-w-md w-full";

  const modalTitle = document.createElement("h2");
  modalTitle.textContent = title;
  modalTitle.className = "text-xl font-bold mb-4";

  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.className = "absolute top-2 right-2 text-gray-600";
  closeButton.addEventListener("click", () => {
    modal.remove();
    onClose();
  });

  modalContent.appendChild(closeButton);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(content);
  modal.appendChild(modalContent);

  document.body.appendChild(modal);
}
