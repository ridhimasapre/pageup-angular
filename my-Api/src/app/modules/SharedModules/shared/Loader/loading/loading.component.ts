import { Component } from '@angular/core';
import { LoaderService } from '../Service/loader.service';
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
constructor(public loaderservice:LoaderService){}
}
