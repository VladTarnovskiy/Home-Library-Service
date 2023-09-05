import { join } from 'path';
import { appendFile, readdir, stat, mkdir } from 'fs/promises';
import * as dotenv from 'dotenv';
import { access } from 'fs/promises';
import { cwd } from 'process';
dotenv.config();

export const logsFolder = 'logs';
export const logsFolderPath = join(cwd(), logsFolder);

export const checkItemExistence = async (path: string) => {
  try {
    await access(path);
    return true;
  } catch (error) {
    return false;
  }
};

const createLogsFolder = async () => {
  const isFolderExists = await checkItemExistence(logsFolderPath);

  if (!isFolderExists) {
    await mkdir(logsFolderPath);
  }
};

export const writeLogs = async (logType: string, message: string) => {
  const maxFileSize = Number(process.env.MAX_FILE_SIZE) || 10000;

  await createLogsFolder();

  const logsFiles = await readdir(logsFolderPath);

  const currentFileToWrightIdx = parseInt(
    logsFiles
      .filter((file) => file.includes(logType))
      .map((item) => item.replace(/\D/g, ''))
      .sort()
      .at(-1),
  );

  const fileName = `${logType}-${currentFileToWrightIdx || 0}.log`;

  let filePath = join(logsFolderPath, fileName);
  const isFileExists = await checkItemExistence(filePath);

  if (isFileExists) {
    const { size } = await stat(filePath);

    if (size >= maxFileSize) {
      filePath = join(
        logsFolderPath,
        `${logType}-${currentFileToWrightIdx + 1}.log`,
      );
    }
  }

  appendFile(filePath, `${message}\n`, { flag: 'a' });
};
