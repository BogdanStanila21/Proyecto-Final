import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIntercambioComponent } from './modal-intercambio.component';

describe('ModalIntercambioComponent', () => {
  let component: ModalIntercambioComponent;
  let fixture: ComponentFixture<ModalIntercambioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalIntercambioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalIntercambioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
