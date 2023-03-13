import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'AcademyPortalUI';

  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.authService.autoLogin();
    console.log(environment.production);
  }
  
}
