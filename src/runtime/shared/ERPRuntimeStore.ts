export class ERPRuntimeStore<T> {

  protected items:
    T[] = [];

  all() {

    return this.items;
  }

  add(
    item: T
  ) {

    this.items.push(item);
  }

  clear() {

    this.items = [];
  }
}