import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionbankComponent } from './add-questionbank.component';

describe('AddQuestionbankComponent', () => {
  let component: AddQuestionbankComponent;
  let fixture: ComponentFixture<AddQuestionbankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuestionbankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
