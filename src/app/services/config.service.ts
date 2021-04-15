import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokerConfig } from '../primitive/poker-config';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    static pokerConfig: PokerConfig;

    constructor(private http: HttpClient) {
    }

    loadConfig(): Promise<void> {
        const jsonFile = window.location.origin + '/assets/poker-config.json';
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response) => {
                ConfigService.pokerConfig = response as PokerConfig;
                ConfigService.pokerConfig.apiBaseUrl =
                    window.location.protocol + '//' + window.location.hostname + ':'
                    + ConfigService.pokerConfig.apiPort;
                resolve();
            }).catch((response) => {
                reject('Could not load file ' + jsonFile + '.');
            });
        });
    }
}
