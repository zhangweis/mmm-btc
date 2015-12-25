import {bootstrap, Component, View, Inject, NgZone} from 'angular2/core';
import {Http} from 'angular2/http';

@Component({selector: 'my-app'})
@View({
  template: `
    <h1>people</h1>{{name}}
    <ul class="people">
      <li *ngFor="#person of people">
        hello, {{person.name}}
      </li>
    </ul>
  `
})
export class AppComponent {
  static get parameters() {
    return [[Http], [NgZone]];  
  }
  constructor(http, zone) {
var self = this;
zone = new NgZone({enableLongStackTrace:true});
self.name='old';
      var got = http.get('./people.json');
    got.subscribe(
        people => {
        // zone.run(function(){
            self.people = people.json();
        // });
        }
    );
    setTimeout(() => {
        zone.run(() =>{ 
        self.name='changed';
        self.people = [
            {
                name:'1'
            },
            {
                name:'2'
            }
            ];
            
            // self.ref.markForCheck();
        });
    });

  }
}
