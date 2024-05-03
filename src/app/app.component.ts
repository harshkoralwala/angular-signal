import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  //Number Signal
  count = signal<number>(3);
  //String Signal
  name = signal('');
  //Object Signal
  person = signal({ firstname: 'bacancy', lastName: 'Tech' });
  person1 = signal(this.person());

  //Computed Signal
  fName = signal('A');
  lName = signal('Z');
  fullName = computed(() => this.fName() + ' ' + this.lName());

  //Computed Signal + example of Cached result
  fullNameLazy = computed(() => {
    console.log('Computed Signal')
    if (this.fName()) {
      return `The FirstName changed`;
    } else {
      return `The LastName changed`;
    }
  });


  constructor() {
    effect(() => {
      console.log("New values", this.fName(), this.lName());
    })
  }

  increment() {
    this.count.update(value => value + 1);
  }

  decrement() {
    this.count.update(value => value - 1);
  }

  foo() {
    this.name.set('foo');
  }

  bar() {
    this.name.set('bar');
  }

  firstName() {
    //Motifies and returns Existing Object,hence all reference will be updated
    this.person.mutate(t => { t.firstname = 'foo' });
    //Returns new Object,So new memory allocation,Other variable still refers old memory references
    this.person.set({ firstname: 'Apple', lastName: 'Banana' });
  }

  lastName() {
    this.person.mutate(t => { t.lastName = 'bar' });
  }

  test() {
    // console.log('test')
  }

}
