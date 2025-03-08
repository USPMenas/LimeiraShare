export function createNavbar() {
  // Verifica se a navbar já existe para evitar duplicação
  if (document.getElementById("navbar")) return;

  const navbar = document.createElement("nav");
  navbar.id = "navbar"; // Define um ID para controle
  navbar.className =
    "w-full bg-blue-600 p-4 shadow-md flex justify-around text-white text-lg font-bold";

  const links = [
    { name: "Página Inicial", path: "/" }, // Novo botão para a Home
    { name: "Disciplinas", path: "/disciplinas" },
    { name: "Cursos", path: "/cursos" },
    { name: "Sobre Nós", path: "/sobre" },
  ];

  links.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.path;
    a.textContent = link.name;
    a.className = "hover:text-gray-300 cursor-pointer";
    a.addEventListener("click", (event) => {
      event.preventDefault();
      navigateTo(link.path);
    });
    navbar.appendChild(a);
  });

  // Adiciona a navbar diretamente ao body para garantir que ela fique no topo
  document.body.prepend(navbar);
}

// Função de navegação para atualizar a URL sem recarregar a página
export async function navigateTo(page: string) {
  window.history.pushState({}, "", page);
  await handleRoute();
}

// Função que lida com o carregamento da página conforme a rota
export async function handleRoute() {
  const root = document.getElementById("app");
  if (!root) return;

  console.log("🔹 Path atual:", window.location.pathname);

  root.innerHTML = ""; // Limpa o conteúdo anterior

  createNavbar();

  if (window.location.pathname.startsWith("/disciplinas/")) {
    const pathParts = window.location.pathname
      .split("/disciplinas/")[1]
      .split("/");

    if (pathParts.length === 2) {
      const module = await import("../pages/arquivos");
      root.appendChild(await module.createArquivosPage());
    } else if (pathParts.length === 3) {
      console.log("🔹 Carregando disciplinaPastasPage()");
      const module = await import("../pages/disciplinasPastas");
      root.appendChild(await module.createDisciplinaPastasPage());
    } else {
      const module = await import("../pages/disciplinasArquivos");
      root.appendChild(await module.createPastaArquivosPage());
    }
  } else if (window.location.pathname.startsWith("/cursos/")) {
    const decodedPath = decodeURIComponent(window.location.pathname);
    const pathParts = decodedPath.split("/cursos/")[1].split("/");

    console.log("🔹 Path Decodificado:", decodedPath);
    console.log("🔹 PathParts:", pathParts);

    if (pathParts.length === 4) {
      console.log("🔹 Carregando cursoDisciplinasPage()");
      const module = await import("../pages/cursoDisciplinas");
      root.appendChild(await module.createCursoDisciplinasPage());
    } else if (pathParts.length === 2) {
      console.log("🔹 Carregando cursoAnosPage()");
      const module = await import("../pages/cursoAnos");
      root.appendChild(await module.createCursoAnosPage());
    } else {
      console.log("🔹 Carregando cursosPage()");
      const module = await import("../pages/cursos");
      root.appendChild(await module.createCursosPage());
    }
  } else {
    let module;
    switch (window.location.pathname) {
      case "/disciplinas":
        module = await import("../pages/disciplinas");
        root.appendChild(await module.createDisciplinasPage());
        break;
      case "/cursos":
        module = await import("../pages/cursos");
        root.appendChild(await module.createCursosPage());
        break;
      case "/sobre":
        module = await import("../pages/sobre");
        root.appendChild(await module.createSobrePage());
        break;
      default:
        module = await import("../pages/home");
        root.appendChild(await module.createHomePage());
        break;
    }
  }
}

// Ativa a navegação quando o usuário volta no histórico
window.onpopstate = handleRoute;
