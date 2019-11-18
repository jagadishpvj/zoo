import { State, Action, StateContext } from "@ngxs/store";
import { FeedAnimals, TakeAnimalsOutside } from './animal.actions';
import { tap, mergeMap } from 'rxjs/operators';
import { AnimalService } from '../ngsx/_services/animal.service';

export interface ZebraFood {
  name: string;
  hay: number;
  carrots: number;
}

export interface ZooStateModel {
  zebraFood: ZebraFood[];
}

@State<ZooStateModel>({
  name: "zoo",
  defaults: {
    zebraFood: []
  }
})
// naming your action metadata explicitly makes it easier to understand what the action
// is for and makes debugging easier.
export class FeedZebra {
  static readonly type = "[Zoo] FeedZebra";
  constructor(public zebraToFeed: ZebraFood) {}
}

export class ZooState {
         @Action(FeedZebra)
         feedZebra(ctx: StateContext<ZooStateModel>, action: FeedZebra) {
           const state = ctx.getState();
           ctx.patchState({
             zebraFood: [...state.zebraFood, action.zebraToFeed]
           });
         }
       }


       //actions to actions for state


       export interface ZooStateModel1 {
         feedAnimals1: string[];
       }

       @State<ZooStateModel1>({
         name: "zoo",
         defaults: {
           feedAnimals1: []
         }
       })
       export class ZooState1 {
         constructor(private animalService: AnimalService) {}

         /**
          * Simple Example
          */
         @Action(FeedAnimals)
         feedAnimals(ctx: StateContext<ZooStateModel1>, action: FeedAnimals) {
           const state = ctx.getState();
           ctx.setState({
             ...state,
             feedAnimals1: [...state.feedAnimals1, action.animalsToFeed]
           });

           return ctx.dispatch(new TakeAnimalsOutside());
         }

         /**
          * Async Example
          */
         @Action(FeedAnimals)
         feedAnimals2(ctx: StateContext<ZooStateModel1>, action: FeedAnimals) {
           return this.animalService.feed(action.animalsToFeed)
          //  .pipe(
          //    tap(animalsToFeedResult => {
          //      const state = ctx.getState();
          //      ctx.patchState({
          //        get feedAnimals1() {
          //          return this._feedAnimals1;
          //        },
          //        set feedAnimals1(value) {
          //          this._feedAnimals1 = value;
          //        },
          //      });
          //    }),
          //    mergeMap(() => ctx.dispatch(new TakeAnimalsOutside()))
          //  );
         }
       }
