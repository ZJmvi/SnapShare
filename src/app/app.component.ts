import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './database.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SnapShare'
  user = 'Uporabnik ni vpisan!';
  constructor(private database:DatabaseService, private router:Router, private snackbar:MatSnackBar){
    database.CurrentUser().subscribe(user => this.user = user ?? 'Uporabnik ni vpisan!')
  }

  getCurrentUser() {
    this.database.CurrentUser().subscribe(user => this.user = user ?? 'Uporabnik ni vpisan!');
  }

 logout(){
  this.database.Logout().subscribe((response) => {
    this.user = 'Uporabnik ni vpisan!'
    this.snackbar.open(`Uporabnik odjavljen!`, "", { duration: 5000 })
    this.router.navigate(['/prijava']);
  })
 }
 
}
