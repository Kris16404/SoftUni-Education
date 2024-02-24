import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedTestComponent } from './generated-test.component';

describe('GeneratedTestComponent', () => {
  let component: GeneratedTestComponent;
  let fixture: ComponentFixture<GeneratedTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneratedTestComponent]
    });
    fixture = TestBed.createComponent(GeneratedTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
