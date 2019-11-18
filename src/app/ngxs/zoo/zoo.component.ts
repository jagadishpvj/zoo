import { Component, OnInit } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { AddAnimal } from "../animal.actions";
import { Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: "app-zoo",
  templateUrl: "./zoo.component.html",
  styleUrls: ["./zoo.component.scss"]
})
export class ZooComponent implements OnInit {
  form: any;
  @Select(state => state.animals) animals$: Observable<any>;
  constructor(private store: Store) {}

  ngOnInit() {}
  addAnimal(name: string) {
    // this.store.dispatch(new AddAnimal(name));
    // this.store.dispatch([new AddAnimal("Panda"), new AddAnimal("Zebra")]);
    // this.store.dispatch(new AddAnimal(name)).subscribe(() => this.form.reset());
     this.store
       .dispatch(new AddAnimal(name))
       .pipe(withLatestFrom(this.animals$))
       .subscribe(([_, animals]) => {
         // do something with animals
         this.form.reset();
       });
  }
}
