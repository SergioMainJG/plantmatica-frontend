import { Route } from "@angular/router";
import Login from "./login/login";
import Signup from "./signup/signup";

const SessionRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () => Login,
  },
  {
    path: 'signup',
    loadComponent: () => Signup,
  }
]

export default SessionRoutes;