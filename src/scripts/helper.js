import moment from "moment";

export const dateFormat = (date) => {
  if (date) return moment(date).format("DD MMM YYYY");
  else return "";
};