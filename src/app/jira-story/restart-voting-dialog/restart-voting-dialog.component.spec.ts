import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestartVotingDialogComponent } from './restart-voting-dialog.component';

describe('RestartVotingDialogComponent', () => {
  let component: RestartVotingDialogComponent;
  let fixture: ComponentFixture<RestartVotingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestartVotingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestartVotingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
