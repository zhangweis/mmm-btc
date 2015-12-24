import lodash from 'lodash';
class Tx {
    passedDays(now) {
        var ticksPerDay = 24*60*60*1000;
        var passedDays = (Math.floor(Number(now-this.time)/ticksPerDay));
        return passedDays;
    }
    getBalance(now) {
        return this.amount*Math.pow(1.3, this.passedDays(now));
    }
}
class HelpingTx {
    constructor(address, btcTx) {
        // this.btcTx = btcTx;
        var outs = lodash.filter(btcTx.vout, function(out) {
            return lodash.get(out,'scriptPubKey.addresses').indexOf(address)>=0;
        });
        this.amount = lodash.reduce(outs, function(s, out) {
            return s+Number(out.value);
        }, 0);
        this.time = btcTx.blocktime*1000;
    }
}

class WithdrawTx {
    constructor(address, btcTx) {
        // this.btcTx = btcTx;
        var ins = lodash.filter(btcTx.vin, {addr:address});
        if (ins.length<=0) return;

        this.amount = lodash.reduce(ins, function(s, txIn) {
            return s+Number(txIn.value);
        }, 0);;
        this.time = btcTx.blocktime*1000;
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
    addBtcTx(tx) {
        var self = this;
        this.addTxs.push(new HelpingTx(this.address, tx));
    }
    withdraw(tx) {
        var self = this;
        this.withdrawTxs.push(new WithdrawTx(this.address, tx));
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
}