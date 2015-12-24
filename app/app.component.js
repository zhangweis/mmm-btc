import {Component} from 'angular2/core';
import {Http} from 'angular2/http';

@Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App</h1>'
})
export class AppComponent { 
    static get parameters() {
      return [[Http]];  
    }
    constructor(http) {
        this.http = http;
        http.get('https://testnet.blockexplorer.com/api/txs/?address=mnph5g44T7uzYahGzx7s1eX1wYWqAjBK5r')
            .subscribe(txs => console.log(txs.json().txs));
    }
}

