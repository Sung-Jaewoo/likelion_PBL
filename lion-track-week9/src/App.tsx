import { useEffect, useState } from "react";
import "./styles/style.css";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./hooks/useAuth";
import { useLions } from "./hooks/useLions";
import type { RouteState, ViewOptions } from "./types/lion";

const defaultViewOptions: ViewOptions = {
  filter: "all",
  sort: "latest",
  search: "",
};

function getRouteFromLocation(): RouteState {
  const detailMatch = window.location.pathname.match(/^\/lions\/([^/]+)$/);

  if (detailMatch) {
    return {
      page: "detail",
      lionId: decodeURIComponent(detailMatch[1]),
    };
  }

  if (window.location.pathname === "/login") {
    return {
      page: "login",
      lionId: null,
    };
  }

  return {
    page: "list",
    lionId: null,
  };
}

function getViewOptionsFromLocation(): ViewOptions {
  const params = new URLSearchParams(window.location.search);
  const filter = params.get("part");
  const sort = params.get("sort");

  return {
    filter: filter === "Frontend" || filter === "Backend" || filter === "Design" ? filter : "all",
    sort: sort === "asc" || sort === "desc" ? sort : "latest",
    search: params.get("search") ?? "",
  };
}

function buildListUrl({ filter, sort, search }: ViewOptions): string {
  const params = new URLSearchParams();

  if (filter !== defaultViewOptions.filter) params.set("part", filter);
  if (sort !== defaultViewOptions.sort) params.set("sort", sort);
  if (search.trim() !== defaultViewOptions.search) params.set("search", search.trim());

  const query = params.toString();
  return query ? `/?${query}` : "/";
}

function App() {
  const auth = useAuth();
  const lionsState = useLions();
  const [route, setRoute] = useState<RouteState>(getRouteFromLocation);
  const [viewOptions, setViewOptions] = useState<ViewOptions>(getViewOptionsFromLocation);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getRouteFromLocation());
      setViewOptions(getViewOptionsFromLocation());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (url: string) => {
    window.history.pushState(null, "", url);
    setRoute(getRouteFromLocation());
    setViewOptions(getViewOptionsFromLocation());
  };

  const updateViewOption = <K extends keyof ViewOptions>(key: K, value: ViewOptions[K]) => {
    const nextOptions = {
      ...viewOptions,
      [key]: value,
    };

    window.history.pushState(null, "", buildListUrl(nextOptions));
    setViewOptions(nextOptions);
    setRoute({ page: "list", lionId: null });
  };

  if (route.page === "login") {
    return (
      <LoginPage
        user={auth.user}
        authLoading={auth.isLoading}
        authMessage={auth.message}
        onLogin={auth.signIn}
        onSignup={auth.signUp}
        onLogout={auth.signOut}
        onNavigate={navigate}
      />
    );
  }

  if (route.page === "detail") {
    return (
      <DetailPage
        lionId={route.lionId}
        lions={lionsState.lions}
        isLoading={lionsState.isLoading}
        errorMessage={lionsState.errorMessage}
        user={auth.user}
        onDelete={lionsState.deleteLion}
        onNavigate={navigate}
        listUrl={buildListUrl(viewOptions)}
      />
    );
  }

  return (
    <HomePage
      lions={lionsState.lions}
      isLoading={lionsState.isLoading}
      isSaving={lionsState.isSaving}
      errorMessage={lionsState.errorMessage}
      status={lionsState.status}
      user={auth.user}
      viewOptions={viewOptions}
        onCreate={lionsState.createLion}
        onCreateRandom={lionsState.createRandomLions}
        onDelete={lionsState.deleteLion}
      onRefresh={lionsState.fetchLions}
      onNavigate={navigate}
      onUpdateViewOption={updateViewOption}
    />
  );
}

export default App;
