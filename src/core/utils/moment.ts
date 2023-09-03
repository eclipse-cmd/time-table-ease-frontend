import moment from 'moment';

export const formateDate = (date: string) => moment(date).format('MMM D, YYYY');

export const timeago = (date: string | Date) => moment.utc(date).local().startOf('seconds').fromNow();
