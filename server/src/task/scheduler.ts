import { scheduleJob, Job } from 'node-schedule';
import logger from '../util/logger';

export enum TaskTime {
  MIN_30,
  HOUR,
  HOUR_3,
  HOUR_6,
  HOUR_12,
  DAY,
}

const schedulerMemoryStore: { job: Job } = { job: null };

const taskTimeToCronExp = (tick: TaskTime) => {
  switch (tick) {
    case TaskTime.MIN_30:
      return '*/30 * * * *';
    case TaskTime.HOUR:
      return '* */1 * * *';
    case TaskTime.HOUR_3:
      return '* */3 * * *';
    case TaskTime.HOUR_6:
      return '* */6 * * *';
    case TaskTime.HOUR_12:
      return '* */12 * * *';
    case TaskTime.DAY:
      return '* * 1/* * *';
  }
};

export const registeTask = (tick: TaskTime, handler: () => void): void => {
  schedulerMemoryStore.job && schedulerMemoryStore.job.cancel();
  schedulerMemoryStore.job = scheduleJob(taskTimeToCronExp(tick), () => {
    logger.info('Start scheduled task');
    Promise.resolve(handler())
      .then(() => logger.info('Task done successfully'))
      .catch((e) => logger.error('Task failed:', e));
  });
};

export const clearTask = (): void => {
  schedulerMemoryStore.job && schedulerMemoryStore.job.cancel();
  schedulerMemoryStore.job = null;
};
