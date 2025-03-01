import "./style.css";
import { handleRoute } from "./components/navbar";

// Executa a navegação ao carregar a página
window.onload = handleRoute;

// function navigateTo(page: string) {
//   window.history.pushState({}, "", page);
//   handleRoute();
// }

window.onpopstate = handleRoute;
window.onload = handleRoute;
