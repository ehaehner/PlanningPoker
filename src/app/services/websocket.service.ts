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
        this.http.get<SocketInitData>(ConfigService.pokerConfig.apiBaseUrl + '/api/socket')
            .subscribe(data => {
                if (data.ok !== 'success') {
                    console.log('Cannot connect to socket');
                }
            });
    }
}
export interface SocketInitData {
    ok: string;
}
