import mixpanel from "mixpanel-browser";

mixpanel.init("5da091d5319caabf38bcd491524082d8", {
  debug: false,
  track_pageview: true,
});

export default mixpanel;
