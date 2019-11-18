export class AddAnimal {
  static readonly type = "[Zoo] Add Animal";
  constructor(public name: string) {}
}

export class TakeAnimalsOutside {

}
export class FeedAnimals {
  static readonly type = "[Zoo] Feed Animals";
  animalsToFeed: string;
}
export class FeedZebra {
  static readonly type = "[Zoo] Feed Zebra";
  constructor(public name: string, public hayAmount: number) {}
}
export namespace Todo {
  export class Add {
    static readonly type = "[Todo] Add";
    constructor(public payload: any) {}
  }

  export class Edit {
    static readonly type = "[Todo] Edit";
    constructor(public payload: any) {}
  }

  export class FetchAll {
    static readonly type = "[Todo] Fetch All";
  }

  export class Delete {
    static readonly type = "[Todo] Delete";
    constructor(public id: number) {}
  }
}
