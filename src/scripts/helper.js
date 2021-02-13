import moment from "moment";

export const dateFormat = (date) => {
  if (date) return moment(date).format("DD MMM YYYY");
  else return "";
};

export const loadPageVar = (sVar) => {
  return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1")) || 1;
}