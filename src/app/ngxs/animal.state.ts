import { State, Action, StateContext } from "@ngxs/store";

@State<string[]>({
  name: "animals",
  defaults: []
})
export class AnimalsState {}

// @State<ZooStateModel>({
//   name: "zoo",
//   defaults: {
//     feed: false
//   }
// })
// export class ZooState {
//   constructor(private zooService: ZooService) {}
// }


export class FeedAnimals {
  static readonly type = "[Zoo] FeedAnimals";
}

export interface ZooStateModel {
  feed: boolean;
}

@State<ZooStateModel>({
  name: "zoo",
  defaults: {
    feed: false
  }
})
export class ZooState {
  @Action(FeedAnimals)
  feedAnimals(ctx: StateContext<ZooStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      feed: !state.feed
    });
  }
}




