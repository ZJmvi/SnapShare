import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import {MatFormFieldModule, } from '@angular/material/form-field';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrl: './prijava.component.css'
})
export class PrijavaComponent {

  email: string = '';
  geslo: string = '';

  constructor(private database: DatabaseService, private router: Router, private snackbar:MatSnackBar) {
    this.IsUserLoggedIn()
  }


  login() {
    this.database.Login(this.email, this.geslo).subscribe((database) => {
      this.snackbar.open(`Uspešna ste prijavljeni kot ${this.email}`, "", {duration:5000})
      this.router.navigate(['']);
    });
  }
  
  async IsUserLoggedIn() {
    const result = await this.database.MyID()
    if (result != undefined && result != null) {
      this.snackbar.open(`Ste že prijavljeni. Če želiš drugo prijavo, se prej odjavite! ` , "", {duration:5000})
      this.router.navigate([''])
    }
  }

}
