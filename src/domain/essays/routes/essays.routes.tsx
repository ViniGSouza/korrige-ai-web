import type { RouteObject } from "react-router-dom";
import { EssaysListPage, NewEssayPage, EssayDetailPage } from "../pages";

type AppRouteObject = RouteObject;

export const essaysRoutes: AppRouteObject[] = [
  {
    path: "essays",
    children: [
      { index: true, element: <EssaysListPage /> },
      { path: "new", element: <NewEssayPage /> },
      { path: ":essayId", element: <EssayDetailPage /> },
    ],
  },
];
