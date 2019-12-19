import uuid from 'uuid';

export default [
  {
    id: uuid(),
    date: 'December 16, 2019',
    startTime: '10:00AM',
    endTime: '11:00AM',
    booked: true,
    by:'John Doe'
  },
  {
    id: uuid(),
    date: 'December 16, 2019',
    startTime: '12:00PM',
    endTime: '1:00PM',
    booked: true,
    by:'Maria Parvati'
  },
  {
    id: uuid(),
    date: 'December 17, 2019',
    startTime: '9:00AM',
    endTime: '10:00AM',
    booked: false,
  },
  {
    id: uuid(),
    date: 'December 18, 2019',
    startTime: '10:00AM',
    endTime: '11:00AM',
    booked: false,
  },
  {
    id: uuid(),
    date: 'December 19, 2019',
    startTime: '10:00AM',
    endTime: '11:00AM',
    booked: false,
  },
  {
    id: uuid(),
    date: 'December 22, 2019',
    startTime: '10:00AM',
    endTime: '11:00AM',
    booked: false,
  },
];
