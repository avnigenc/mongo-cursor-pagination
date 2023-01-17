import { ICommandProcessor, IResponse } from "./command.ts";
import { Response } from "../common/response.ts";
import { Bson, Collection } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { IFindParams } from "../interfaces/find-params.interface.ts";
import { decode } from "https://deno.land/std@0.173.0/encoding/base64.ts";

export class FindCommand implements IFindParams {
  limit: number;
  sort = true;
  next?: string;
  previous?: string;
  query = {};

  constructor(limit: number) {
    this.limit = limit;
  }

  setSort(sort: boolean): void {
    this.sort = sort;
  }

  setNext(next: string): void {
    const textDecoder = new TextDecoder("utf-8");
    this.next = textDecoder.decode(decode(next));
  }

  setPrevious(previous: string): void {
    const textDecoder = new TextDecoder("utf-8");
    this.previous = textDecoder.decode(decode(previous));
  }
}

function generateCursorQuery(command: FindCommand) {
  if (!command.next && !command.previous) {
    return {};
  }

  const objectId: string =
    (command.next as string) || (command.previous as string);
  const op = new Bson.ObjectId(objectId);

  if (isAscSort(command)) {
    return { _id: { $gt: op } };
  }

  return { _id: { $lt: op } };
}

function generateSortQuery(command: FindCommand): { _id: number } {
  if (isAscSort(command)) {
    return { _id: 1 };
  }

  return { _id: -1 };
}

function isAscSort(command: FindCommand): boolean {
  return (
    (!command.sort && !!command.previous) || (command.sort && !command.previous)
  );
}

function generateLimitQuery(command: FindCommand): number {
  return command.limit + 1;
}

class FindCommandProcessor implements ICommandProcessor {
  async execute<T>(
    command: FindCommand,
    collection: Collection<T>
  ): Promise<IResponse<T>> {
    const meta = {
      query: generateCursorQuery(command),
      sort: generateSortQuery(command),
      limit: generateLimitQuery(command),
    };

    const cursor = collection
      .find({ $and: [meta.query, command.query] }, {})
      .sort(meta.sort)
      .limit(meta.limit);

    const results = await cursor.toArray();

    return new Response<T>(results, command);
  }
}

export { FindCommandProcessor };
