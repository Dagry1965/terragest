export class ERPRuntimeCollection<T> {

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

  remove(
    predicate:
      (item: T) => boolean
  ) {

    this.items =
      this.items.filter(
        item =>
          !predicate(item)
      );
  }

  clear() {

    this.items = [];
  }

  count() {

    return this.items.length;
  }
}