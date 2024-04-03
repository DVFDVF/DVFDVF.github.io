navigator.serviceWorker.register("dummy-sw.js");
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      if (registration.active.scriptURL.includes("sw.js")) {
        registration.unregister();
      }
    }
  });
}

window.addEventListener("DOMContentLoaded", async (event) => {
  if ("BeforeInstallPromptEvent" in window) {
    showResult("⏳ BeforeInstallPromptEvent supported but not fired yet");
  } else {
    showResult("❌ BeforeInstallPromptEvent NOT supported");
  }
  let displayMode = "browser tab";
  if (window.matchMedia("(display-mode: standalone)").matches) {
    // 替换当前页的 URL
    window.location.replace("https://w.between777.com/#/");
  }
  // Log launch display mode to analytics
});

let deferredPrompt;
let appinstalled = false;

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevents the default mini-infobar or install dialog from appearing on mobile
  e.preventDefault();
  deferredPrompt = e;
  deferredPrompt.prompt();
  // Save the event because you’ll need to trigger it later.
  // Show your customized install prompt for your PWA
  document.querySelector("#install").style.display = "block";
  showResult("✅ BeforeInstallPromptEvent fired", true);
});

window.addEventListener("appinstalled", (e) => {
  appinstalled = true;
  showResult("✅ AppInstalled fired", true);
});

async function installApp() {
  if (deferredPrompt) {
    deferredPrompt
      .prompt()
      .then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          showResult("😀 User accepted the install prompt.", true);
          const loadingContainer = document.getElementById("loadingContainer");
          const loadingText = document.getElementById("loadingText");
          loadingContainer.style.display = "flex";
          let number = 0;
          let timer = setInterval(function () {
            if (number < 90) {
              number += 1;
              loadingText.innerHTML = `${number}%`;
            } else if (number < 100) {
              if (appinstalled) {
                number += 1;
                loadingText.innerHTML = `${number}%`;
              }
            } else {
              clearInterval(timer);
              loadingText.innerHTML = `${number}%`;
              loadingContainer.style.display = "none";
              const tipMain = document.getElementById("tipMain");
              tipMain.style.display = "flex";
            }
          }, 80);
        } else if (choiceResult.outcome === "dismissed") {
          showResult("😟 User dismissed the install prompt");
        }
      })
      .catch((error) => {
        console.error("Error occurred while prompting:", error);
        // 处理出现的错误
      });
    showResult("🆗 Installation Dialog opened");
  }
}
window.installApp = installApp;

function showResult(text, append = false) {
  console.log(text);
  // if (append) {
  //   document.querySelector("output").innerHTML += "<br>" + text;
  // } else {
  //   document.querySelector("output").innerHTML = text;
  // }
}
