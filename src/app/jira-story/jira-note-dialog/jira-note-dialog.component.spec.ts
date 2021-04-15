import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JiraNoteDialogComponent } from './jira-note-dialog.component';

describe('JiraNoteDialogComponent', () => {
  let component: JiraNoteDialogComponent;
  let fixture: ComponentFixture<JiraNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JiraNoteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JiraNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
