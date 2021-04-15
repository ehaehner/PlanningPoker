import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JiraStory } from '../../primitive/jira-story';

@Component({
    selector: 'app-jira-note-dialog',
    templateUrl: './jira-note-dialog.component.html',
    styleUrls: ['./jira-note-dialog.component.scss']
})
export class JiraNoteDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<JiraNoteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

export interface DialogData {
    story: JiraStory;
}
