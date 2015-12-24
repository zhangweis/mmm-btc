import {Account} from "app/account.js";
import lodash from 'lodash';
describe('account', function () {
    var txs = 
              {"pagesTotal":1,"txs":[{"txid":"2bd3bbd4a405610f19c08ab6c8d33546a1a204132a1b596a21973be9d7300975","version":1,"locktime":627460,"vin":[{"txid":"c3ad1d3c3001ae3396cb80d00b19a48485d322e3c58e57e13b76ee6af9f6518c","vout":1,"scriptSig":{"asm":"304402206a9b995a64a797c2b2961be7b1f4aca30648be0bef0f0f629396ce8129b5e08f02206b28775f5f61934a7d00a383226fa4143b610300671a32450b5c92984c898c7001 03a3ceacbf66b9ad5513389f7c1f158102436e05047edd94f21548f9f85c436fb1","hex":"47304402206a9b995a64a797c2b2961be7b1f4aca30648be0bef0f0f629396ce8129b5e08f02206b28775f5f61934a7d00a383226fa4143b610300671a32450b5c92984c898c70012103a3ceacbf66b9ad5513389f7c1f158102436e05047edd94f21548f9f85c436fb1"},"sequence":4294967294,"n":0,"addr":"mtGeH3jqZ6Pqec5mCkDV5id3qL4cxqVEnY","valueSat":3574126397,"value":35.74126397,"doubleSpentTxID":null}],"vout":[{"value":"35.44124127","n":0,"scriptPubKey":{"asm":"OP_DUP OP_HASH160 1e284d0bfaf0015544aa487f0de015bf504ac282 OP_EQUALVERIFY OP_CHECKSIG","hex":"76a9141e284d0bfaf0015544aa487f0de015bf504ac28288ac","reqSigs":1,"type":"pubkeyhash","addresses":["miGQqy9zPmAH27FL86areeqvUahsxprGg1"]},"spentTxId":"a3a05f54c7d98811fd6f241f9f5c6d5814a44dac64e6248618c6a084cf5781cc","spentIndex":0,"spentTs":1450923209},{"value":"0.30000000","n":1,"scriptPubKey":{"asm":"OP_DUP OP_HASH160 5023ab12a5b6adeb34a82f253937094c3b8ee845 OP_EQUALVERIFY OP_CHECKSIG","hex":"76a9145023ab12a5b6adeb34a82f253937094c3b8ee84588ac","reqSigs":1,"type":"pubkeyhash","addresses":["mnph5g44T7uzYahGzx7s1eX1wYWqAjBK5r"]}}],"blockhash":"0000000000004db90a6aab8b08587d01041ce4987e8d9b7c47f9ac624843e6f0","confirmations":9,"time":1450919586,"blocktime":1450919586,"valueOut":35.74124127,"size":225,"valueIn":35.74126397,"fees":0.0000227},{"txid":"4bfdfe28250bdf394a7504d600cee780999e197e35c52e53930733d002e228ca","version":1,"locktime":627460,"vin":[{"txid":"40c86e382f0cd451d9c59445be7cd79160485d514024cc7b0b17fdb0c026461c","vout":0,"scriptSig":{"asm":"3044022052b54256667ae1248b1c63c19096e22407f24b65de19b03d22cf613587c14b9f02200e764fa7c475be8216af21b859d52c5c757b41c71e2e8d8d60218f47ebf7960601 02954ed3c3284a25634b749c699323315ce7c0b10a2262082052e7b41f3a35bd9a","hex":"473044022052b54256667ae1248b1c63c19096e22407f24b65de19b03d22cf613587c14b9f02200e764fa7c475be8216af21b859d52c5c757b41c71e2e8d8d60218f47ebf79606012102954ed3c3284a25634b749c699323315ce7c0b10a2262082052e7b41f3a35bd9a"},"sequence":4294967294,"n":0,"addr":"mgNiyVzJZQeH5e9GCPwhgUjuDaJ5vm5x36","valueSat":391674845369,"value":3916.74845369,"doubleSpentTxID":null}],"vout":[{"value":"1.00430286","n":0,"scriptPubKey":{"asm":"OP_DUP OP_HASH160 5023ab12a5b6adeb34a82f253937094c3b8ee845 OP_EQUALVERIFY OP_CHECKSIG","hex":"76a9145023ab12a5b6adeb34a82f253937094c3b8ee84588ac","reqSigs":1,"type":"pubkeyhash","addresses":["mnph5g44T7uzYahGzx7s1eX1wYWqAjBK5r"]}},{"value":"3915.74412803","n":1,"scriptPubKey":{"asm":"OP_DUP OP_HASH160 40e047422f3ca2ea2e0d31811906c79794eca418 OP_EQUALVERIFY OP_CHECKSIG","hex":"76a91440e047422f3ca2ea2e0d31811906c79794eca41888ac","reqSigs":1,"type":"pubkeyhash","addresses":["mmRzDTtPnvRq3SMhhqK5t7zZXjyjEMaHLV"]}}],"blockhash":"0000000000004db90a6aab8b08587d01041ce4987e8d9b7c47f9ac624843e6f0","confirmations":9,"time":1450919586,"blocktime":1450919586,"valueOut":3916.74843089,"size":225,"valueIn":3916.74845369,"fees":0.0000228}]};
    var tx = txs.txs[0];
    var account;
    beforeEach(function() {
        account = new Account('mnph5g44T7uzYahGzx7s1eX1wYWqAjBK5r');
        jasmine.clock().install();
    });
    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it('creates tx from btc tx', function(done) {
        var accountTx = account.addBtcTx(tx);
        // jasmine.clock().mockDate(new Date(1450919586*1000));
        expect(account.getBalance(new Date(1450919586*1000))).toBe(0.3);
        done();
    });
    it('accumulate interest', function(done) {
        var accountTx = account.addBtcTx(tx);
        // jasmine.clock().mockDate(new Date(1450919586*1000+24*60*60*1000));
        expect(account.getBalance(new Date(1450919586*1000+24*60*60*1000))).toBe(0.3*1.3);
        done();
    });
    it('withdraw', function(done) {
        var accountTx = account.addBtcTx(tx);
        jasmine.clock().mockDate(new Date(1450919586*1000+24*60*60*1000));
        var withdrawTx = lodash.cloneDeep(tx);
        withdrawTx.vin[0].addr = 'mnph5g44T7uzYahGzx7s1eX1wYWqAjBK5r';
        withdrawTx.vin[0].value = 0.3;
        withdrawTx.blocktime = 1450919586+24*60*60;
        account.withdraw(withdrawTx);
        expect(account.getBalance(1450919586*1000+24*60*60*1000).toFixed(8)).toBe((0.3*0.3).toFixed(8));
        done();
    });
    it('accumulate after withdraw', function(done) {
        var accountTx = account.addBtcTx(tx);
        var withdrawTx = lodash.cloneDeep(tx);
        withdrawTx.vin[0].addr = 'mnph5g44T7uzYahGzx7s1eX1wYWqAjBK5r';
        withdrawTx.vin[0].value = 0.3;
        withdrawTx.blocktime = 1450919586+24*60*60;
        account.withdraw(withdrawTx);
        expect(account.getBalance(1450919586*1000+2*24*60*60*1000).toFixed(8)).toBe((0.3*0.3*1.3).toFixed(8));
        done();
    });

});