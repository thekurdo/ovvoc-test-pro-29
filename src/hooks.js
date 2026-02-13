import { useNavigate, useSearchParams, useParams, useLocation, useRouteLoaderData } from 'react-router-dom';

function useAppNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  return {
    goTo: (path) => navigate(path),
    goBack: () => navigate(-1),
    replace: (path) => navigate(path, { replace: true }),
    currentPath: location.pathname,
    getParam: (key) => searchParams.get(key),
    setParam: (key, value) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(key, value);
      setSearchParams(newParams);
    },
  };
}

function useUserParams() {
  const params = useParams();
  return {
    userId: params.userId,
    tabId: params.tabId,
  };
}

export { useAppNavigation, useUserParams };
