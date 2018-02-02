"use strict";

import * as Inflected from "inflected";
import * as _ from "lodash";
import { IPresenter } from "~/core";

export class BasePresenter<T> implements IPresenter {
  constructor(private entity: T[] | T,
              private attributes: string[]) { }

  public keyForAttribute(attribute: string) {
    return Inflected.underscore(attribute);
  }

  public toJson(): any {
    if (_.isArray(this.entity)) {
      return this.collection(this.entity);
    } else {
      return this.resource(this.entity);
    }
  }

  private collection(data: T[]): any[] {
    return data.map((entity: T) => this.resource(entity));
  }

  private resource(entity: T): any {
    const data = _.toPlainObject(entity);
    return Object.keys(data)
      .filter((key: string) => this.attributes.includes(key))
      .reduce((obj: any, key: string) => {
        obj[this.keyForAttribute(key)] = data[key];
        return obj;
      }, {});
  }
}
