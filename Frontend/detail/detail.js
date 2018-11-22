function init() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var uri = url.searchParams.get("uri");
    console.log(uri);

}