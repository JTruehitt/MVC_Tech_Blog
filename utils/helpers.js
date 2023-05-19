module.exports = {
  format_date: (date) => {
    const formattedDate = new Date(date);

    const options = {
      weekday: "short",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return formattedDate.toLocaleString(undefined, options);
  },
};
