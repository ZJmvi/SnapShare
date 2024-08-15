import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaSlikaComponent } from './nova-slika.component';

describe('NovaSlikaComponent', () => {
  let component: NovaSlikaComponent;
  let fixture: ComponentFixture<NovaSlikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NovaSlikaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaSlikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
