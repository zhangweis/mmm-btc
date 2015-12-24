// var tests = ['common/global'];
// for (var i=0;i<window.__karma__.files.length;i++) {
//     var file = window.__karma__.files[i];
//     if (window.__karma__.files.hasOwnProperty(file)) {
//         if (/-spec\.js$/.test(file)||/-spec1\.js$/.test(file)) {
//             tests.push(file);
//         }
//     }
// }
// Promise.all(tests.map(function(test) {
//     return System.import(test);
// }));