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
export function navigateTo(page: string) {
  window.history.pushState({}, "", page);
  handleRoute();
}

// Função que lida com o carregamento da página conforme a rota
export function handleRoute() {
  const root = document.getElementById("app");
  if (!root) return;

  root.innerHTML = ""; // Limpa o conteúdo anterior

  createNavbar();

  if (window.location.pathname.startsWith("/disciplinas/")) {
    const pathParts = window.location.pathname
      .split("/disciplinas/")[1]
      .split("/");

    if (pathParts.length === 2) {
      import("../pages/arquivos").then((module) =>
        root.appendChild(module.createArquivosPage())
      );
    } else {
      import("../pages/disciplinasArquivos").then((module) =>
        root.appendChild(module.createDisciplinaArquivosPage())
      );
    }
  } else if (window.location.pathname.startsWith("/cursos/")) {
    const pathParts = window.location.pathname.split("/cursos/")[1].split("/");

    if (pathParts.length === 3) {
      import("../pages/cursoDisciplinas").then((module) =>
        root.appendChild(module.createCursoDisciplinasPage())
      );
    } else if (pathParts.length === 2) {
      import("../pages/cursoAnos").then((module) =>
        root.appendChild(module.createCursoAnosPage())
      );
    } else {
      import("../pages/cursos").then((module) =>
        root.appendChild(module.createCursosPage())
      );
    }
  } else {
    switch (window.location.pathname) {
      case "/disciplinas":
        import("../pages/disciplinas").then((module) =>
          root.appendChild(module.createDisciplinasPage())
        );
        break;
      case "/cursos":
        import("../pages/cursos").then((module) =>
          root.appendChild(module.createCursosPage())
        );
        break;
      case "/sobre":
        import("../pages/sobre").then((module) =>
          root.appendChild(module.createSobrePage())
        );
        break;
      default:
        import("../pages/home").then((module) =>
          root.appendChild(module.createHomePage())
        );
        break;
    }
  }
}

// Ativa a navegação quando o usuário volta no histórico
window.onpopstate = handleRoute;
