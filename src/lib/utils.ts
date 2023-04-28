import type { QueryItem } from "../types";

export default class Utils {
  static getId(item: QueryItem) {
    return item.sys.contentType.sys.id;
  }

  static findFromId(items: QueryItem[], id: string) {
    return items.find((item) => this.getId(item) == id);
  }

  static findAllFromId(items: QueryItem[], id: string) {
    return items.filter((item) => this.getId(item) == id);
  }
}
