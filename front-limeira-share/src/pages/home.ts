export function createHomePage() {
  const container = document.createElement("div");
  container.className =
    "flex items-center justify-center min-h-screen flex-col bg-gray-100";

  const title = document.createElement("h1");
  title.textContent = "LimeiraShare";
  title.className = "text-5xl font-bold text-blue-600";

  container.appendChild(title);
  return container;
}
