import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRutinaComponent } from './create-rutina.component';

describe('CreateRutinaComponent', () => {
  let component: CreateRutinaComponent;
  let fixture: ComponentFixture<CreateRutinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRutinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
