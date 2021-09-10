import { injectable } from "inversify";
import { IConfigService, IFlexible } from "../interface";
import { DEFAULT_CONFIG } from "../constant/defaultConfig";
@injectable()
export class ConfigService implements IConfigService {
  private config: IFlexible = {};

  constructor() {
    this.config = DEFAULT_CONFIG;
  }
  public assign(config: IFlexible) {
    this.config = { ...this.config, ...config };
  }

  public get(key?: string) {
    if (key) {
      return this.getValue(this.config, key);
    } else {
      return this.config;
    }
  }
  public set(key: string, value: IFlexible | number | string) {}
  private getValue(config: IFlexible, keys: string) {
    const arr = keys.split(".");
    let temp: IFlexible = config;
    while (arr.length) {
      const key = arr.shift() || "";
      if (temp.hasOwnProperty(key)) {
        temp = temp[key];
      }
    }
    return temp;
  }
}
