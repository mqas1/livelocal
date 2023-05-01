const dayjs = require('dayjs');
const AdvancedFormat = require('dayjs/plugin/advancedFormat');

dayjs.extend(AdvancedFormat);

// Helper function to transcribe `createdAt` timestamps into a more readable/accessible format
const dateFormat = (timestamp) => {
  const dbDate = dayjs(timestamp).format('MMM Do, YYYY [at] hh:mm a');

  return dbDate;
}

module.exports = dateFormat;