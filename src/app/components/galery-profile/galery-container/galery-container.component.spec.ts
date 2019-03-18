import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleryContainerComponent } from './galery-container.component';

describe('GaleryContainerComponent', () => {
  let component: GaleryContainerComponent;
  let fixture: ComponentFixture<GaleryContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaleryContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaleryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
