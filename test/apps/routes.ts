
import { redirect, Route } from "@ferrugemjs/router";

const ModuleList = () => import("./module-list.html");
const Mudule1 = () => import("./module-a.html");
const Mudule2 = () => import("./module-b.html");
const NotFound = () => import("./not-found.html");

export class Routes {
    public routes: Route[] = [
        {
            path: "/list-modules",
            view: ModuleList,
        },
        {
            path: "/module-a/:name",
            view: Mudule1,
        },
        {
            path: "module-b/:id/:name",
            view: Mudule2,
        },
        {
            path: "/redirect-test",
            redirectTo: "/module-a/from_a_redirect",
        },
        {
            path: "/not-found",
            view: NotFound,
        },
        {
            path: "*",
            redirectTo: "/not-found",
        },
    ];
    private redirectTest() {
        redirect("/module-a/manual_redirect");
    }
}