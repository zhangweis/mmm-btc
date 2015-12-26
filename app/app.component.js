import {bootstrap, Component, View, Inject, NgZone} from 'angular2/core';
import {Http} from 'angular2/http';
import {Account} from './account.js';
import lodash from 'lodash';

@Component({selector: 'my-app'})
@View({
  templateUrl: 'app/home.tml'
})
export class AppComponent {
    static get parameters() {
        return [[Http], [NgZone]];  
    }
    constructor(http, zone) {
        var self = this;
        self.accounts=[];
        var donationAddress = 'mnph5g44T7uzYahGzx7s1eX1wYWqAjBK5r';
        http.get('https://testnet.blockexplorer.com/api/txs/?address=' + donationAddress)
            .subscribe(res => {
                var txs = res.json();
                var accounts = {};
                txs.txs.forEach(function(tx){
                    var sender = Account.getSender(tx);
                    var account = accounts[sender];
                    if (!account) {
                        account = accounts[sender] = new Account(sender);
                    }
                    account.addBtcTx(tx, donationAddress);
                })
                self.accounts = lodash.values(accounts);
            });
    }
    getBalance(account) {
        return account.getBalance(new Date());
    }
}
