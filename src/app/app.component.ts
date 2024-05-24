import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  //Number Signal #1
  count = signal<number>(3);

  //String Signal #2
  name = signal('');

  //Object Signal #3 (Mutate)
  //Object Signal #4 (Set)
  person = signal({ firstname: 'bacancy', lastName: 'Tech' });
  person1 = signal(this.person());

  // Computed Signal #5
  fName = signal('');
  lName = signal('');
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

  //Complex DataType #7
  numbers = signal([1, 2, 5, 7, 8, 3, 1, 4, 8, 3, 33, 9]);

  constructor() {
    //Effects #6
    effect(() => {
      console.log("New values in Effect", this.fName(), this.lName());
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

  firstName_mutate() {
    //Motifies and returns Existing Object,hence all reference will be updated
    this.person.mutate(t => { t.firstname = 'foo' });
  }

  lastName_mutate() {
    this.person.mutate(t => { t.lastName = 'bar' });
  }

  firstName_set() {
    //Returns new Object,So new memory allocation,Other variable still refers old memory references
    this.person.set({ firstname: 'Apple', lastName: 'Banana' });
  }

  lastName_set() {
    this.person.set({ firstname: 'Car', lastName: 'Bike' });

  }

}
