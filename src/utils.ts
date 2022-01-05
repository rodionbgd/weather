export default function addGoogleScript() {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src =
    "https://maps.googleapis.com/maps/api/js" +
    "?key=AIzaSyCFgn8EeO8dUIZuqg7AD-lnG_Yc5jCT4Ek&libraries=places" +
    "&callback=googleAutoComplete";
  document.head.append(script);
}
