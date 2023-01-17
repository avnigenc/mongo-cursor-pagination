import { IBaseParams } from "../interfaces/base-params.interface.ts";
import { IResponse } from "../interfaces/response.interface.ts";
import { Bson } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { encode } from "https://deno.land/std@0.173.0/encoding/base64.ts";

class Response<T> implements IResponse<T> {
  results: T[];
  hasPrevious: boolean;
  previous: string;
  hasNext: boolean;
  next: string;

  constructor(results: T[], params: IBaseParams) {
    const hasMore: boolean = results.length > params.limit;

    if (hasMore) {
      results.pop();
    }

    const hasPrevious: boolean = this.isHasPrevious(params, hasMore);
    const hasNext: boolean = this.isHasNext(params, hasMore);

    if (params?.previous) {
      results = results.reverse();
    }

    const previous = this.getPrevious(results);
    const next = this.getNext(results);

    this.results = results;
    this.hasPrevious = hasPrevious;
    this.previous = this.encode(previous, hasPrevious);
    this.hasNext = hasNext;
    this.next = this.encode(next, hasNext);
  }

  private isHasPrevious(params: IBaseParams, hasMore: boolean): boolean {
    return !!params.next || !!(params.previous && hasMore);
  }

  private isHasNext(params: IBaseParams, hasMore: boolean): boolean {
    return !!params.previous || hasMore;
  }

  private encode<T>(object: T, isExists: boolean): string {
    if (!object || !isExists) {
      return "";
    }

    // @ts-ignore
    const objectId = new Bson.ObjectId(object["_id"]).toHexString();
    return encode(new TextEncoder().encode(objectId));
  }

  private getPrevious<T>(results: T[]): T | undefined {
    if (!Array.isArray(results) || results.length === 0) {
      return undefined;
    }

    return results[0];
  }

  private getNext<T>(results: T[]): T | undefined {
    if (!Array.isArray(results) || results.length === 0) {
      return undefined;
    }

    return results[results.length - 1];
  }
}

export { Response };
