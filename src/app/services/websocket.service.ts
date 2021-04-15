import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    public socket: Socket;

    constructor(private http: HttpClient) {
        this.socket = io(ConfigService.pokerConfig.apiBaseUrl);
        this.http.get(ConfigService.pokerConfig.apiBaseUrl + '/api/socket')
            .subscribe(data => {
                console.log(data);
            });
    }
}
