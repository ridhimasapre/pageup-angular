import { CanActivateFn,Router,RouterStateSnapshot,ActivatedRouteSnapshot, UrlTree} from '@angular/router';
import { inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth.service';
export const roleguardGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean | UrlTree => {
  // return true;
  const loginService = inject(AuthService);
  const router = inject(Router);

  const token = AuthService.getToken();
  const userRole = AuthService.getUserRole();

  if (!token || userRole === null) {
    return router.createUrlTree(['/login']);
  }

  const restrictedRoutes = ['/employeeList', '/departmentList'];

  if (AuthService.isSuperAdmin() || AuthService.isAdmin()) {
    return true;
  }

  if (AuthService.isEmployee() && restrictedRoutes.includes(state.url)) {
    return router.createUrlTree(['/projectList']);
  }

  return true;
};

