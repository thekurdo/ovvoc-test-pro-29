import { redirect } from 'react-router-dom';

function requireAuth({ request }) {
  const url = new URL(request.url);
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;

  if (!token) {
    return redirect(`/login?from=${url.pathname}`);
  }

  return null;
}

function requireRole(role) {
  return ({ request }) => {
    const userRole = typeof localStorage !== 'undefined' ? localStorage.getItem('role') : null;
    if (userRole !== role) {
      return redirect('/unauthorized');
    }
    return null;
  };
}

export { requireAuth, requireRole };
