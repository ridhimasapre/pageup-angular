import { Component } from '@angular/core';
import { AuthService } from './modules/user-auth/user-auth/service/auth.service';
import { SidebarServiceService } from './modules/SharedModules/shared/Sidebar/SidebarService/sidebar-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-Api';
}
