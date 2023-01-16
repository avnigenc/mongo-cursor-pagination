import { Response } from "../interfaces/response.interface.ts";

// deno-lint-ignore no-empty-interface
interface ICommand {}

interface ICommandProcessor {
  execute<T, K>(command: ICommand, collection: T, params: K): Response;
}

export { type ICommand, type Response, type ICommandProcessor };
