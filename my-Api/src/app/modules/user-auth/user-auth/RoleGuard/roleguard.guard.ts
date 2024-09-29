import { CanActivateFn, Router, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../service/auth.service';

export const roleguardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
  const loginService = inject(AuthService);
  const router = inject(Router);

  const token = loginService.getToken(); 
  const userRole = loginService.getUserRole(); 
  
  if (!token || userRole === null) {
    return router.createUrlTree(['/login']); 
    }

  // Check if user is Employee
  if (loginService.isEmployee()) {
    const allowedRoutes = ['/project', '/task']; // Employee can only access these routes
    if (!allowedRoutes.includes(state.url)) {
      return router.createUrlTree(['/project']); 
    }
  }

  // Admin or SuperAdmin can access project and task
  if (loginService.isSuperAdmin() || loginService.isAdmin()) {
    return true;
  }

  return true; 
};