import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-nova-slika',
  templateUrl: './nova-slika.component.html',
  styleUrls: ['./nova-slika.component.css']
})
export class NovaSlikaComponent {
  Naslov: string = "";
  Lastnik: string = "";
  Opis: string = "";
  Slika: string = "";
  Komentar: string = "";
  srcResult: any;
  selectedFile!: File;
  imageUrl: string | null = null;
  isLoading = false;
  imagePath: string | null = null;
  fileName: string | null = null;
  currentUser: string | undefined;
  user = '';

  constructor(private database: DatabaseService, private router: Router, private snackbar: MatSnackBar) {
    this.IsUserLoggedIn();
    this.database.CurrentUser().subscribe(user => this.user = user ?? 'Uporabnik ni vpisan!');
  }

  async IsUserLoggedIn() {
    try {
      const result = await this.database.MyID();
      if (!result) {
        this.snackbar.open(`Prosim, prijavite se!`, "", { duration: 5000 });
        this.router.navigate(['/prijava']);
      } else {
        this.currentUser = result;
      }
    } catch (error) {
      console.error('Error checking user login status:', error);
    }
  }

  async NewItem() {
    if (!this.Naslov || !this.Lastnik || !this.Opis || !this.Komentar) {
      this.snackbar.open(`Eno ali več polj je praznih. Prosim, vpišite podatke v vsa polja.`, "", { duration: 5000 });
      return;
    }
  
    if (this.imageUrl) {
      this.Slika = this.imageUrl;
  
      try {
        const success = await this.database.AddItemToDB(this.Naslov, this.Lastnik, this.Opis, this.Slika, this.Komentar, this.currentUser!, this.user, 0);
  
        if (success) {
          this.snackbar.open(`Slika ${this.Naslov} ${this.Lastnik} uspešno dodana v bazo!`, "", { duration: 5000 });
          this.router.navigate(['']);
        } else {
          this.snackbar.open(`Pri dodajanju smo naleteli na težavo!`, "", { duration: 5000 });
          console.error('Pri dodajanju smo naleteli na težavo!');
          if (this.imagePath) {
            await this.database.deleteImage(this.imagePath);
            this.imagePath = null;
          }
        }
      } catch (error) {
        this.snackbar.open(`Pri dodajanju smo naleteli na težavo!`, "", { duration: 5000 });
        console.error('Error adding item to database:', error);
      }
    } else {
      this.snackbar.open(`Pri nalaganju smo naleteli na težavo!`, "", { duration: 5000 });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileName = this.selectedFile.name;
    }
  }

  async onUpload(): Promise<void> {
    if (!this.selectedFile) {
      return;
    }

    this.isLoading = true;

    try {
      const path = `${new Date().getTime()}_${this.selectedFile.name}`;
      const result = await this.database.uploadImage(this.selectedFile, path);
      this.imageUrl = this.database.getPublicUrl(result.path);
      this.imagePath = result.path;

      if (this.imageUrl) {
        this.snackbar.open(`Slika uspešno naložena!`, "", { duration: 5000 });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      this.isLoading = false;
    }
  }
}