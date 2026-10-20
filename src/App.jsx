/**
 * App.jsx — entry point sau khi migrate sang React Router v7.
 *
 * Toàn bộ routing logic đã chuyển sang src/router.jsx.
 * AppProvider + NavBar + Footer nằm trong RootLayout bên trong router.jsx.
 * File này chỉ còn một nhiệm vụ: mount Router.
 */
import Router from './router.jsx';

export default function App() {
  return <Router />;
}
