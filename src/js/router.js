import App from "../App";
import Clock from "../components/ClockComponent/Clock";

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

export function backEvent() {
  history.pushState(null, null, "/");
  router();
}

const router = async () => {
  const routers = [
    { path: "/" },
    { path: "/alarm" },
    { path: "/memo" },
    { path: "/image" },
  ];

  const potentialMatches = routers.map((route) => {
    return {
      route: route,
      isMatch: route.path === location.pathname,
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  new App(document.querySelector("#app"));
};

new Clock(document.querySelector("#clock"));

window.addEventListener("popstate", () => {
  navigateTo("/");
});

window.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches(".anchor")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});
