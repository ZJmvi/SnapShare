import { Component, Inject, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-slika',
  templateUrl: './slika.component.html',
  styleUrl: './slika.component.css'
})
export class SlikaComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
