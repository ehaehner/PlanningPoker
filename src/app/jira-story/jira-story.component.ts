import { Component, Input, OnInit } from '@angular/core';
import { JiraStory } from '../primitive/jira-story';
import { UserService } from '../services/user.service';
import { JiraService } from '../services/jira.service';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '../services/config.service';
import { WebsocketService } from '../services/websocket.service';
import { PokerResult } from '../primitive/poker-result';
import { JiraNoteDialogComponent } from './jira-note-dialog/jira-note-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RestartVotingDialogComponent } from './restart-voting-dialog/restart-voting-dialog.component';

@Component({
    selector: 'app-jira-story',
    templateUrl: './jira-story.component.html',
    styleUrls: ['./jira-story.component.scss']
})
export class JiraStoryComponent implements OnInit {
    @Input() story: JiraStory = {
        description: '',
        summary: '',
        key: '',
        async: false,
        revealed: false,
        activePokerUsers: []
    };
    validStoryPoints: string[] = ['?', '0', '1', '2', '3', '5', '8', '13', '20', '40', '100'];
    descriptionHtmlRendered = false;
    jiraUrl = '';
    revealedStoryPoints: PokerResult[] = [];
    displayedColumns = ['username', 'storyPoints'];
    descriptionHeaderRowHeight = '70px';
    headerHeight = '60px';

    constructor(public userService: UserService, private jiraService: JiraService,
                private authService: AuthService, private webSocketService: WebsocketService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.authService.activeUser.subscribe(user => {
            user.stories?.forEach(jiraStory => {
                if (jiraStory.key === this.story.key) {
                    // merge object from jira api and object from poker api
                    Object.assign(this.story, jiraStory);
                }
                this.story.async = false;
            });
        });
        this.jiraUrl = ConfigService.pokerConfig.jiraUrl + '/browse/' + this.story.key;

        // wait until someone pressed the button to reveal poker results
        this.webSocketService.socket.on('show-poker-results', (receivedData: MsgShowPokerResult) => {
            if (this.story.key === receivedData.storyKey) {
                this.showPokerResults();
            }
        });
        // wait until someone pressed the button to hide poker results
        this.webSocketService.socket.on('hide-poker-results', (receivedData: MsgShowPokerResult) => {
            if (this.story.key === receivedData.storyKey) {
                this.hidePokerResults();
            }
        });
        // page was reloaded after story points were reveled
        if (this.story.revealed && this.revealedStoryPoints.length === 0) {
            this.showPokerResults();
        }

        // update active poker users when user joins his result
        this.webSocketService.socket.on('update-active-poker-users', (receivedData: MsgActivePokerUsers) => {
            if (this.story.key === receivedData.storyKey) {
                this.story.activePokerUsers = receivedData.activePokerUsers;
            }
        });
    }

    sendMsgToShowPokerResults(): void {
        const msg: MsgShowPokerResult = {storyKey: this.story.key};
        this.webSocketService.socket.emit('send-show-poker-results', msg);
        this.showPokerResults();
    }

    showPokerResults(): void {
        this.story.revealed = true;
        this.userService.getPokerResult(this.story.key).subscribe(data => {
            this.revealedStoryPoints = data;
            this.descriptionHeaderRowHeight = (this.revealedStoryPoints.length * 50 + 20) + 'px';
        });
    }

    sendMsgToHidePokerResults(): void {
        const dialogRef = this.dialog.open(RestartVotingDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const msg: MsgShowPokerResult = {storyKey: this.story.key};
                this.webSocketService.socket.emit('send-hide-poker-results', msg);
                this.hidePokerResults();
            }
        });
    }

    hidePokerResults(): void {
        this.story.revealed = false;
        this.story.points = undefined;
        this.descriptionHeaderRowHeight = '70px';
    }

    openAddNodeDialog(): void {
        const dialogRef = this.dialog.open(JiraNoteDialogComponent, {
            data: {story: this.story}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed ' + this.story.note);
            if (result) {
                this.story.note = result;
                this.userService.updateStoryAtServer(this.story);
            }
        });
    }
}

export interface MsgShowPokerResult {
    storyKey: string;
}

export interface MsgActivePokerUsers {
    storyKey: string;
    activePokerUsers: string[];
}
