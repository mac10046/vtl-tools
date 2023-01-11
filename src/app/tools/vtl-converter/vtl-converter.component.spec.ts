import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VtlConverterComponent } from './vtl-converter.component';

describe('VtlConverterComponent', () => {
  let component: VtlConverterComponent;
  let fixture: ComponentFixture<VtlConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VtlConverterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VtlConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
