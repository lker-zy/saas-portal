(function() {
  var targets = [
    "本平台仅提供数据服务，不构成投资建议 | © 2025 某和量化科技有限公司 | ICP备案号: 京ICP备2025149116号 | © 2025 某和量化科技有限公司，保留所有权利",
    "本平台仅提供数据服务，不构成投资建议|© 2025 某和量化科技有限公司|ICP备案号: 京ICP备2025149116号|© 2025 某和量化科技有限公司，保留所有权利",
    "This platform provides data services only and does not constitute investment advice."
  ];
  var linkTargets = ["Privacy Policy", "Terms of Service", "Refund Policy"];

  function cleanFooterText() {
    var nodes = document.querySelectorAll("body *");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (!el || !el.childNodes || el.childNodes.length !== 1) continue;
      var child = el.childNodes[0];
      if (!child || child.nodeType !== 3) continue;
      var text = child.nodeValue || "";
      for (var j = 0; j < targets.length; j++) {
        if (text.indexOf(targets[j]) !== -1) {
          child.nodeValue = text.replace(targets[j], "").trim();
        }
      }
    }

    var links = document.querySelectorAll("a");
    for (var k = 0; k < links.length; k++) {
      var linkText = (links[k].textContent || "").trim();
      for (var m = 0; m < linkTargets.length; m++) {
        if (linkText === linkTargets[m]) {
          links[k].remove();
          break;
        }
      }
    }
  }

  cleanFooterText();
  var observer = new MutationObserver(function() {
    cleanFooterText();
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
})();