export function createSobrePage() {
  const container = document.createElement("div");
  container.className =
    "flex items-center justify-center min-h-screen bg-gray-100";

  const title = document.createElement("h1");
  title.textContent = "Sobre Nós";
  title.className = "text-3xl font-bold text-blue-600";

  container.appendChild(title);
  return container;
}
