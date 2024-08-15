import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, map } from 'rxjs';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }
  // Create a single supabase client for interacting with your database
  supabase = createClient('https://mzsvkesndfrdhlfpxpuq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16c3ZrZXNuZGZyZGhsZnB4cHVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI1ODU2MTEsImV4cCI6MjAzODE2MTYxMX0.8ZIYBY-__gpuIXrW7gDnP60U5GgI2RsJGwhAk246HjY')

  getData(): Observable<any> {
    return from(this.supabase.from('slike').select('*')).pipe(map(data => data?.data))

  }

  CurrentUser(): Observable<string | undefined> {
    return from(this.supabase.auth.getUser()).pipe(map(user => user.data.user?.email))
  }

  register(email: string, password: string) {
    return from(this.supabase.auth.signUp({
      email,
      password,
    }))
  }

  Login(email: string, password: string): Observable<any> {
    return from(this.supabase.auth.signInWithPassword({
      email,
      password,
    }))
  }

  Logout() {
    return from(this.supabase.auth.signOut())
  }

  async MyID() {
    const user = await this.supabase.auth.getUser()
    return user.data.user?.id
  }


  async AddItemToDB(Naslov: string, Lastnik: string, Opis: string, Slika: string, Komentar: string, currentUser: string, userEmail: string, Like: number): Promise<boolean> {
    console.log('Dodajamo: ', 'Naslov: ', Naslov, 'Lastnik: ', Lastnik, 'Opis: ', Opis, 'Slika: ', Slika, 'Komentar: ', Komentar, 'Uporabnik:', currentUser, 'Email:', userEmail, 'Like:', Like)
    const { data, error } = await this.supabase
      .from('slike')
      .insert(
        { 'Naslov': Naslov, 'Lastnik': Lastnik, 'Opis': Opis, 'Slika': Slika, 'Komentar': Komentar, 'Uporabnik': currentUser, 'Email': userEmail, 'Like': Like }
      )
  
    return error == null
  }

  async deleteImage(imagePath: string): Promise<void> {
    const { error } = await this.supabase.storage.from('slike').remove([imagePath]);
    if (error) {
      throw new Error('Slike ni bilo mogoče brisati!');
    }
  }

  async GetImageURL(ImageName: string) {
    const { data } = this.supabase
      .storage
      .from('slike')
      .getPublicUrl(ImageName)

      console.log(data.publicUrl)
    return data.publicUrl
  }

  async uploadImage(file: File, path: string): Promise<any> {
    const { data, error } = await this.supabase.storage
      .from('slike')
      .upload(path, file);

    if (error) {
      throw error;
    }

    return data;
  }

  getPublicUrl(path: string): string {
    return this.supabase.storage.from('slike').getPublicUrl(path).data.publicUrl;
  }

  async deleteRecordById(recordId: string): Promise<void> {
    const { error } = await this.supabase
      .from('slike')
      .delete()
      .eq('id', recordId);
  
    if (error) {
      throw new Error('Zapis ni bilo mogoče brisati!');
    }
  }

}