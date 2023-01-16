import { ICommand, ICommandProcessor, Response } from "./command.ts";

export class FindCommand implements ICommand {
  // TODO: Implement this method
}

class FindCommandProcessor implements ICommandProcessor {
  execute<T, K>(command: ICommand, collection: T, params: K): Response {
    const processedCommand = command as FindCommand;

    console.log({
      processedCommand,
      collection,
      params,
    });

    return {
      data: "",
    };
  }
}

export { FindCommandProcessor };
