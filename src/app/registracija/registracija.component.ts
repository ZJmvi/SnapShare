import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrl: './registracija.component.css'
})
export class RegistracijaComponent {
  email: string = '';
  geslo: string = '';

  constructor(private database: DatabaseService, private router: Router) {}

  registracija() {
    this.database.register(this.email, this.geslo).subscribe((database) => {
      this.router.navigate(['/prijava']);
    });
  }
}
