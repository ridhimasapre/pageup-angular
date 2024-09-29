import { Component,Output,EventEmitter, OnInit} from '@angular/core';
import { SidebarComponent } from '../../Sidebar/sidebar/sidebar.component';
import { AuthService } from '../../../../user-auth/user-auth/service/auth.service';
import { Role } from '../../../../user-auth/user-auth/Model/login.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  public userRole: string | null = null;
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();
  constructor(private authService:AuthService){}
ngOnInit(): void {
}
isEmployee(): boolean {
  return this.userRole === 'Employee';
}
}
