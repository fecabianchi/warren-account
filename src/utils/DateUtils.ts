import * as dayjs from 'dayjs';

export default class DateUtils {
  public static dateDiff(accountDate: Date, dateCandidate: Date) {
    return dayjs(dateCandidate).diff(dayjs(accountDate), 'd');
  }
}
