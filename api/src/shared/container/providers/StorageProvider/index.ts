import { container } from "tsyringe";

import { LocalStorageProvider } from "./implementations/LocalStorageProvider";
import { StorageProvider } from "./implementations/StorageProvider";
import { IStorageProvider } from "./IStorageProvider";

const diskStorage = {
  local: LocalStorageProvider,
  s3: StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.disk]
);
