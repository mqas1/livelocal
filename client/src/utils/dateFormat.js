import dayjs from 'dayjs';
import AdvancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(AdvancedFormat);

// Helper function to transcribe `createdAt` timestamps into a more readable/accessible format
const dateFormat = (timestamp) => {
  const dbDate = dayjs(timestamp).format('dddd, DD MMM YYYY');

  return dbDate;
};

export default dateFormat;