import { Component, OnInit  } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: fromAuth.AuthState;

  constructor(private dataService: DataStorageService,
          private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select('auth')
    .subscribe(authState  => {
      this.authState = { ...authState };
    });
  }

  onSaveData() {
    this.dataService.storeRecipes()
    .subscribe((response) => {
      console.log(response);
    });
  }
  onLogout() {
    this.store.dispatch(new AuthActions.LogoutUser());
  }

  onFetchData() {
    this.dataService.getRecipes();
  }

  isAuth() {
    return this.authState.authenticated;
  }
}