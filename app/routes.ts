// import { route } from '@react-router/dev/routes';
//
// import type { RouteConfig } from '@react-router/dev/routes';
//
// export default [
//   route('/', './routes/_index.tsx'),
//   route('/articles/:contentId', './routes/articles.$contentId.tsx'),
//   route('/tags/:tagId', './routes/tags.$tagId.tsx'),
//   route('/api/revalidate-cache', './routes/api.revalidate-cache.tsx'),
// ] satisfies RouteConfig;
//
import { type RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default flatRoutes() satisfies RouteConfig;
