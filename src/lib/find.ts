import { Collection } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { IResponse } from "../commands/command.ts";
import { FindCommand, FindCommandProcessor } from "../commands/find.ts";
import { IFindParams } from "../interfaces/find-params.interface.ts";

class Find {
  async run<T>(
    collection: Collection<T>,
    params: IFindParams
  ): Promise<IResponse<T>> {
    const findCommandProcessor = new FindCommandProcessor();
    const command = new FindCommand(params.limit);

    if (params.sort !== undefined) {
      command.setSort(params.sort);
    }

    if (params.next) {
      command.setNext(params.next);
    }

    if (params.previous) {
      command.setPrevious(params.previous);
    }

    return await findCommandProcessor.execute<T>(command, collection);
  }
}

export { Find };
