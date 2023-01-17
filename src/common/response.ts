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

    const [previous, next] = [results[0], results[results.length - 1]];

    this.results = results;
    this.hasPrevious = hasPrevious;
    this.previous = hasPrevious ? this.encode(previous) : "";
    this.hasNext = hasNext;
    this.next = hasNext ? this.encode(next) : "";
  }

  private isHasPrevious(params: IBaseParams, hasMore: boolean): boolean {
    return !!params.next || !!(params.previous && hasMore);
  }

  private isHasNext(params: IBaseParams, hasMore: boolean): boolean {
    return !!params.previous || hasMore;
  }

  private encode(object: T): string {
    if (!object) {
      return "";
    }

    // @ts-ignore
    const objectId: Bson.ObjectId = object["_id"];
    const id: string = objectId.toHexString();
    return encode(new TextEncoder().encode(id));
  }
}

export { Response };
