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
  person = signal({ firstname: 'bacancy', lastName: 'Tech' });
  person1 = signal(this.person());

  //Object Signal #4 (Set)
  user = signal({ firstname: 'bacancy', lastName: 'Tech' });
  user1 = signal(this.person());


  // Computed Signal #5
  fName = signal('');
  lName = signal('');
  fullName = computed(() => this.fName() + ' ' + this.lName());
  //Computed Signal + example of Cached result #6
  firstNameLazy = computed(() => "Lazy FirstName => " + this.fName() + '  ' + new Date().toLocaleTimeString());
  lastNameLazy = computed(() => "Lazy LastName => " + this.lName() + '  ' + new Date().toLocaleTimeString());

  // Computed Signal #6
  fName1 = signal('');
  lName1 = signal('');

  //Complex DataType #7
  numbers = signal([1, 2, 5, 7, 8, 3, 1, 4, 8, 3, 33, 9]);


  // Passing Signal to Child #8
  first_name = signal('');

  constructor() {
    //Effects #6
    effect(() => {
      console.log("New values in Effect of signal fName() || lName() => ", this.fName(), this.lName());
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
    //Update the current value by mutating it in-place, and notify any dependents.
    this.person.mutate(t => { t.firstname = 'foo' });
  }

  lastName_mutate() {
    // Update the current value by mutating it in-place, and notify any dependents.
    this.person.mutate(t => { t.lastName = 'bar' });
  }

  firstName_set() {
    //Returns new Object,So new memory allocation,Other variable still refers old memory references
    //Directly set the signal to a new value, and notify any dependents.
    this.user.set({ firstname: 'Apple', lastName: this.user().lastName });
  }

  lastName_set() {
    //Directly set the signal to a new value, and notify any dependents.
    this.user.set({ firstname: 'Car', lastName: 'Bike' });
  }

}
