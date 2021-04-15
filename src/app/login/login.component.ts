import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    username = '';
    myFormControl = new FormControl();
    allUsers: string[] = [];
    filteredUsernameOptions = new Observable<string[]>();

    constructor(private authService: AuthService, private router: Router, private userService: UserService,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.authService.isLoggedIn.subscribe((loggedIn) => {
            if (loggedIn) {
                this.router.navigate([this.authService.redirectUrl]);
            } else {
                this.router.navigate(['/']);
            }
        });
        this.userService.getAllUsers().subscribe(data => {
            this.allUsers = data;
        });
        this.filteredUsernameOptions = this.myFormControl.valueChanges.pipe(
            startWith(''),
            map<string, string[]>((value) => {
                return this.allUsers.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) === 0);
            })
        );
    }

    loginPokerUser(): void {
        if (this.allUsers.includes(this.username)) {
            this.authService.login(this.username);
        } else {
            // user does not exist
            const dialogRef = this.dialog.open(CreateUserDialogComponent, {
                data: {newUsername: this.username}
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    console.log('Create a new user with username ' + this.username);
                    this.userService.createUser(this.username).subscribe(() => {
                        }, error => {
                            switch (error.status) {
                                case 201:
                                    this.authService.login(this.username);
                            }
                        }
                    );
                }
            });
        }
    }
}
