function copy() {
  var copyText = document.getElementById("roomid");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

