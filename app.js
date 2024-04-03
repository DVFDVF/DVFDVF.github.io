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
  console.log("DISPLAY_MODE_LAUNCH:", displayMode);
  document.querySelector("#install").addEventListener("click", installApp);
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
    deferredPrompt.prompt();
    showResult("🆗 Installation Dialog opened");
    // Find out whether the user confirmed the installation or not
    const { outcome } = await deferredPrompt.userChoice;
    // The deferredPrompt can only be used once.
    deferredPrompt = null;
    // Act on the user's choice
    if (outcome === "accepted") {
      showResult("😀 User accepted the install prompt.", true);
      let number = 0;
      let timer = setInterval(function () {
        if (number < 90) {
          number += 1;
          loadingText.innerHTML = `${number}%`;
        } else if (appinstalled) {
          if (number < 100) {
            number += 1;
            loadingText.innerHTML = `${number}%`;
          }
        } else {
          window.installApp();
          clearInterval(timer);
          loadingText.innerHTML = `${number}%`;
          loadingContainer.style.display = "none";
        }
      }, 80);
    } else if (outcome === "dismissed") {
      showResult("😟 User dismissed the install prompt");
    }
    // We hide the install button
    document.querySelector("#install").style.display = "none";
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
window.addEventListener("appinstalled", () => {
  // If visible, hide the install promotion
  hideInAppInstallPromotion();
  // Log install to analytics
  console.log("INSTALL: Success");
});
