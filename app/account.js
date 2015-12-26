import lodash from 'lodash';
class Tx {
    passedDays(now) {
        var ticksPerDay = 24*60*60*1000;
        var passedDays = (Math.floor(Number(now-this.time)/ticksPerDay));
        return passedDays;
    }
    getBalance(now) {
        return this.amount*Math.pow(1.03, this.passedDays(now));
    }
}
class HelpingTx {
    constructor(address, toAddress, btcTx) {
        var outs = lodash.filter(btcTx.vout, function(out) {
            return lodash.get(out,'scriptPubKey.addresses').indexOf(toAddress)>=0;
        });
        this.amount = lodash.reduce(outs, function(s, out) {
            return s+Number(out.value);
        }, 0);
        this.time = btcTx.blocktime*1000;
    }
}

class WithdrawTx {
    constructor(address, btcTx) {
        HelpingTx.apply(this, [address, address, btcTx]);
    }
}

WithdrawTx.prototype.getBalance= Tx.prototype.getBalance;
HelpingTx.prototype.getBalance= Tx.prototype.getBalance;
WithdrawTx.prototype.passedDays= Tx.prototype.passedDays;
HelpingTx.prototype.passedDays= Tx.prototype.passedDays;

export class Account {
    constructor(address) {
        this.address = address;
        this.addTxs = [];
        this.withdrawTxs = [];
        this.balance = 0;
    }
    addBtcTx(btcTx, toAddress) {
        if (Account.getSender(btcTx)!=this.address) return;
        var tx = new HelpingTx(this.address, toAddress, btcTx);
        if (tx.amount<=0) return;
        this.addTxs.push(tx);
    }
    withdraw(btcTx) {
        var tx = new WithdrawTx(this.address, btcTx);
        if (tx.amount<=0) return;
        this.withdrawTxs.push(tx);
    }
    getBalance(now) {
        var helping = lodash.reduce(this.addTxs, function(total, tx) {
            return total + tx.getBalance(now);
        }, 0);
        var requested = lodash.reduce(this.withdrawTxs, function(total, tx) {
            return total + tx.getBalance(now);
        }, 0);
        return helping - requested;
    }
    getHelpingAmount() {
        return lodash.reduce(this.addTxs, function(total, tx){
            return total+tx.amount;
        }, 0);
    }
}
Account.getSender = function (btcTx) {
    return btcTx.vin[0].addr;
}
Account.getReceiver = function (btcTx) {
    return lodash.get(btcTx.vout[0], 'scriptPubKey.addresses[0]');
}