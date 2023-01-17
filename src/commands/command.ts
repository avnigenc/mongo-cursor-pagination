import { Collection } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { IResponse } from "../interfaces/response.interface.ts";

// deno-lint-ignore no-empty-interface
interface ICommand {}

interface ICommandProcessor {
  execute<T>(
    command: ICommand,
    collection: Collection<T>
  ): Promise<IResponse<T>>;
}

export { type ICommand, type IResponse, type ICommandProcessor };
