import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

const getTimeElapsed = (updatedTime: string | Date) => {
  if (typeof updatedTime !== 'string' && !(updatedTime instanceof Date)) {
    return null;
  }

  let date;

  if (typeof updatedTime === 'string') {
    const numericValue = Number(updatedTime);
    if (!isNaN(numericValue)) {
      return null;
    }
    date = dayjs(updatedTime, 'YYYY-MM-DDTHH:mm:ss.SSSZ', true);
  } else {
    date = dayjs(updatedTime);
  }

  if (!date.isValid()) {
    return null;
  }

  return date.fromNow();
};

export default getTimeElapsed;
