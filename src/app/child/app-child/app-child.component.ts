import { Component, Input, OnInit, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './app-child.component.html',
  styleUrls: ['./app-child.component.scss']
})
export class AppChildComponent {

  @Input({ required: true }) first_name = signal('');
  first_name_child_computed = computed(() => "Child Component first_name" + this.first_name() + '  ' + new Date().toLocaleTimeString());

  constructor() {}

}
