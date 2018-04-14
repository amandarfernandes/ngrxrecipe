import { Component,
    OnInit,
    Output,
    EventEmitter
  } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataService: DataStorageService,
          private authService: AuthService) { }

  ngOnInit() {}

  onSaveData() {
    this.dataService.storeRecipes()
    .subscribe((response) => {
      console.log(response);
    });
  }
  onLogout() {
    this.authService.logout();
  }

  onFetchData() {
    this.dataService.getRecipes();
  }

  isAuth() {
    return this.authService.isAuthenticated();
  }
}
