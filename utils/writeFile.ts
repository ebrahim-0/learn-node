import { promises as fsPromises } from "fs";

const writeFile = async (path: string, data: any) => {
  await fsPromises.writeFile(path, JSON.stringify(data, null, 2));
};

export default writeFile;
