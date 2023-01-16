import { ICommand, Response } from "../commands/command.ts";
import { FindCommand, FindCommandProcessor } from "../commands/find.ts";
import { FindParams } from "../interfaces/find-params.interface.ts";

class Find {
  async run<T>(collection: T, params: FindParams): Promise<Response> {
    const findCommandProcessor = new FindCommandProcessor();
    const command: ICommand = new FindCommand();
    return await findCommandProcessor.execute<T, FindParams>(
      command,
      collection,
      params
    );
  }
}

export { Find };
