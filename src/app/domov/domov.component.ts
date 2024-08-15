import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../database.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NovaSlikaComponent } from '../nova-slika/nova-slika.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SlikaComponent } from '../slika/slika.component';

@Component({
  selector: 'app-domov',
  templateUrl: './domov.component.html',
  styleUrl: './domov.component.css'
})
export class DomovComponent {
  public podatki!: any[]
  public stolpci: string[] = ['Naslov', 'Lastnik', 'Opis', 'Slika', 'Komentar', 'Uporabnik'];
  public currentUser: any;
  


  constructor(private databaseService: DatabaseService, public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router) {
    this.IsUserLoggedIn()
  }

  async IsUserLoggedIn() {
    const result = await this.databaseService.MyID()
    if (result == undefined || result == null) {
      this.snackbar.open(`Za ogled podrobnosti se prijavite!`, "", { duration: 5000 })
      this.router.navigate(["/login"])
    }
    else{
      this.currentUser = result;
      this.GetPodatki()
    }
  }

  GetPodatki(): void {
    this.databaseService.getData().subscribe((data) => {
      console.log(data);
      this.podatki = data
    });
  }

  Podrobnosti(id: number) {
    const podatek = this.podatki.find(p => p.id === id);
    this.dialog.open(SlikaComponent, {
      data: podatek
    });
  }

  async IzbrisiZapis(id: number) {
    const podatek = this.podatki.find(p => p.id === id);
    if (podatek && podatek.Uporabnik === this.currentUser) {
      try {
        await this.databaseService.deleteRecordById(id.toString());
        this.snackbar.open('Zapis uspešno izbrisan!', '', { duration: 3000 });
        this.GetPodatki(); // Osvežite podatke po brisanju
      } catch (error) {
        this.snackbar.open('Napaka pri brisanju slike', '', { duration: 5000 });
        console.error('Error deleting record:', error);
      }
    } else {
      this.snackbar.open('Nimate dovoljenja za brisanje te slike!', '', { duration: 5000 });
    }
  }

  async DodajLike(id: number) {
    const podatek = this.podatki.find(p => p.id === id);
    if (podatek) {
      podatek.Like += 1;
      const { error } = await this.databaseService.supabase
        .from('slike')
        .update({ Like: podatek.Like })
        .eq('id', id);

      if (error) {
        this.snackbar.open('Napaka pri dodajanju všečka', '', { duration: 5000 });
        console.error('Error adding like:', error);
      } else {
        this.snackbar.open('Všeček uspešno dodan!', '', { duration: 3000 });
      }
    }
  }

}
