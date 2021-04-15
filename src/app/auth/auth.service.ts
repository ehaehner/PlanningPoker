import { Injectable } from '@angular/core';
import { UserProfile } from '../primitive/user-profile';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ConfigService } from '../services/config.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    redirectUrl = '/pokerlist';
    NOONE: UserProfile = {username: '', stories: []};
    activeUser: BehaviorSubject<UserProfile> = new BehaviorSubject<UserProfile>(this.NOONE);
    isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private cookieService: CookieService, private httpClient: HttpClient) {
        this.activeUser.subscribe(profile => {
            if (profile === this.NOONE) {
                this.isLoggedIn.next(false);
            } else {
                this.isLoggedIn.next(true);
            }
        });
        const cookieUserName = this.cookieService.get('PlanningPokerUser');
        if (cookieUserName !== '' && !this.isLoggedIn.value) {
            this.login(cookieUserName);
        }
    }

    login(formUsername: string): void {
        this.cookieService.set('PlanningPokerUser', formUsername);
        this.httpClient.post<UserProfile[]>(ConfigService.pokerConfig.apiBaseUrl + '/api/users', {username: formUsername})
            .subscribe(responseData => {
                if (responseData.length === 1) {
                    // successful login
                    this.activeUser.next(responseData[0]);
                    this.cookieService.set('PlanningPokerUser', responseData[0].username);
                } else {
                    this.cookieService.delete('PlanningPokerUser');
                    console.log('There are ' + responseData.length + ' entries for username ' + formUsername);
                    this.activeUser.next(this.NOONE);
                }
            });
    }

    logout(): void {
        this.cookieService.delete('PlanningPokerUser');
        this.activeUser.next(this.NOONE);
    }
}
