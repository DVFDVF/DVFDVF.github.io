const columnArr = [
  {
    id: "fromName",
    title: "you name",
    type: "text",
    value: "",
    required: true,
  },
  { id: "fromAge", title: "Age", type: "text", value: "" },
  {
    id: "fromGender",
    title: "Gender",
    type: "check",
    value: "1",
    required: true,
    source: [
      { id: "0", title: "male" },
      { id: "1", title: "female", selected: true },
    ],
  },
  { id: "profession", title: "Profession", type: "text", value: "" },
  {
    id: "telephone",
    title: "Telephone",
    type: "text",
    value: "",
    required: true,
  },
];
let ldyFuns = {
  ssk(e) {
    console.error("test ssk:", 1223 + e);
    return 1223 + e;
  },
  async maidian(item, backObj = "") {
    let {
      track = "trackCustom",
      name = "PageView",
      eventData = {},
      remark = "test",
    } = item;
    if (this.sysInfo) {
      let ar = ["deviceId", "model", "browserName", "appName", "hostLanguage"];
      for (let i = 0; i < ar.length; i++) {
        item.eventData[ar[i]] = this.sysInfo[ar[i]];
      }
      item.check = true;
    }
    // ldyFuns.maidian({track:'init',name:pixelId,remark:'initialization'})
    // let item={track:'trackCustom',name:'pageLoad',remark:'in page'}
    // ldyFuns.maidian(item)
    // ldyFuns.pageLeave()
    //  gtag('config', 'AW-11179029478');
    //  gtag('event', 'conversion', {'send_to': 'AW-11179029478/A-K0COiIu-gYEObnydIp'});
    // let goObj={init:'config',trackCustom:'event',pageLoad:'conversion'}

    // if(gtag){
    // 	 gtag(goObj[track]||track,goObj[name]||name,eventData,remark);
    // }
    if (window.gtag) {
      gtag(track, name, eventData, remark);
    }
    if (window.fbq) {
      fbq(track, name, eventData);
    }
    let ss = "";
    if (eventData.value) {
      ss = "value:" + eventData.value + " " + eventData.currency;
    }
    eventData.domain = location.host;
    if (debug) console.log(remark + ss + " ok");
    if (track !== "init") {
      let matchObj = { name: name, clientIp: item.clientIp };
      item.sid = item.sid || usObj._id || "no";
      item.webName = usObj.name || "no";
      item.clientIp = window.clientIp;
      let datar = {
        tbname: "T_point",
        baseName: "h5Data",
        matchObj,
        contentObj: item,
        M_action: "upDate",
      };
      let run = await this.request(datar, "https://cloud.yaadd.cc");
      console.log("point:", run.code);
    }

    if (item.callBackName && backObj) {
      backObj.eventData = item.eventData;
      setTimeout(async () => {
        this.maidian(backObj);
      }, 3000);
    }
  },
  fbMain(
    win = window,
    win_document = document,
    tag1 = "script",
    url = "https://connect.facebook.net/en_US/fbevents.js",
    win_fbFun,
    tagElement,
    tagElement0
  ) {
    //console.error('fbq:',{"win":win, "Ԫ��":win_document, "Ԫ��tag��ǩ":tag1, url, win_fbFun, tagElement, tagElement0});
    if (win.fbq) return;
    if (!usObj.points.id) {
      console.warn(
        "Missing facebook pixel id (usObj.points.id), tracking code not running:",
        usObj.points.id
      );
      return;
    }
    win_fbFun = win.fbq = function () {
      win_fbFun.callMethod
        ? win_fbFun.callMethod.apply(win_fbFun, arguments)
        : win_fbFun.queue.push(arguments);
    };
    if (!win._fbq) win._fbq = win_fbFun;
    win_fbFun.push = win_fbFun;
    win_fbFun.loaded = !0;
    win_fbFun.version = "2.0";
    win_fbFun.queue = [];
    tagElement = win_document.createElement(tag1);
    tagElement.async = !0;
    tagElement.src = url;
    tagElement0 = win_document.getElementsByTagName(tag1)[0];
    tagElement0.parentNode.insertBefore(tagElement, tagElement0);
    win.fbq("init", usObj.points.id, "", "initialization");
  },
  // <script async src="https://www.googletagmanager.com/gtag/js?id=AW-11179029478"></script>
  //  <script>
  // 	 window.dataLayer = window.dataLayer || [];
  // 	 function gtag(){
  // 		 console.error('google arguments:',arguments,dataLayer);
  // 		 dataLayer.push(arguments);
  // 	}
  // 	gtag('js', new Date());
  // 	 gtag('config', 'AW-11179029478');
  // 	 gtag('event', 'conversion', {'send_to': 'AW-11179029478/A-K0COiIu-gYEObnydIp'});
  // </script>
  googleMain(
    win = window,
    win_document = document,
    tag1 = "script",
    url = "https://www.googletagmanager.com/gtag/js?id=AW-11179029478",
    win_gtag,
    tagElement,
    tagElement0
  ) {
    //console.error('fbq:',{"win":win, "Ԫ��":win_document, "Ԫ��tag��ǩ":tag1, url, win_gtag, tagElement, tagElement0});
    if (win.gtag) return;
    if (usObj.points.gtag) {
      url = "https://www.googletagmanager.com/gtag/js?id=" + usObj.points.gtag;
    } else {
      console.warn(
        "Missing Google ID (usObj.points.gtag), tracking code not running:",
        usObj.points.gtag
      );
      return;
    }
    window.dataLayer = window.dataLayer || [];
    win_gtag = win.gtag = function () {
      console.log("google tracking:", arguments[0], arguments[1]);
      dataLayer.push(arguments);
    };
    win.gtag = win_gtag;
    win_gtag.push = win_gtag;
    win_gtag.loaded = !0;
    win_gtag.version = "2.0";
    win_gtag.queue = [];
    tagElement = win_document.createElement(tag1);
    tagElement.async = !0;
    tagElement.src = url;
    tagElement0 = win_document.getElementsByTagName(tag1)[0];
    tagElement0.parentNode.insertBefore(tagElement, tagElement0);
    gtag("js", new Date());
    gtag("config", usObj.points.gtag);
    gtag("event", "conversion", { send_to: usObj.points.gtag });
  },

  pageLeave() {
    //����ҳ���뿪������ͣ��ʱ��
    inTime = Date.now();
    const listenerCallbacks = new Set();
    const listenerCenter = {
      add(listener) {
        listenerCallbacks.add(listener);
      },
      remove(listener) {
        listenerCallbacks.delete(listener);
      },
    };
    function onBeforeClose() {
      for (let listener of listenerCallbacks) {
        listener();
      }
    }
    window.onbeforeunload = onBeforeClose; // ��ͬ��������ݴ���
    window.onpagehide = onBeforeClose;
    listenerCenter.add(() => {
      let item = {
        track: "trackCustom",
        name: "pageUnload",
        remark: "leave",
        eventData: {},
        callBackName: "hoverMs",
        sid: usObj._id || "no",
        webName: usObj.name || "no",
        clientIp: window.clientIp || "no",
      };

      item.eventData = {
        route: location.href,
        pageName: "index",
        value: Date.now() - inTime,
        unit: "ms",
      };
      this.maidian(item);
    });
  },
  async request(data, url = "https://point.yaadd.cc", debug) {
    // let url = Object.urlApi; // �滻Ϊ��Ҫ�����API��ַ
    let headers = { "Content-Type": "application/json" };
    data.baseName = data.baseName || "mdData";
    if (data.contentObj) {
      data.contentObj.up_time = Date.now();
      data.contentObj.createDate = data.contentObj.createDate || Date.now();
      data.contentObj.gid = data.contentObj.gid || "AAA";
    }

    try {
      let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: headers,
      }); //
      if (response.ok) {
        let res = await response.json();
        if (debug) console.log("res ok:", data.tbname, res.code, res.msg);
        return res;
      } else {
        console.error("res err1:", { data, response });
        return response;
      }
    } catch (error) {
      console.error("res err2:", { data, error });
      return error;
    }
  },
  async getData() {
    try {
      let url = window.location.href.split("?")[0];
      let response = await fetch(url + "/package.json"); //
      if (debug) console.error("url", url);
      if (response.ok) {
        let res = await response.json();
        usObj = res;
        let matchObj = { name: usObj.name };
        if (!isLocal) {
          matchObj.domain = location.host;
        }
        let datar = {
          tbname: "T_domain",
          matchObj,
          baseName: "h5Data",
          pageSize: 100,
          M_action: "find",
        };
        let ssd = await ldyFuns.request(datar, "https://cloud.yaadd.cc", debug);
        if (debug) console.error("window.clientIp:", ssd);
        if (ssd.code == 200) {
          window.clientIp = ssd.clientIp;
          usObj.language = ssd.data[0].language || usObj.language;
          usObj.urlArr = ssd.data[0].urlArr || usObj.urlArr;
        }
        ldyFuns.setSto("usObj", usObj);
        pixelId = usObj.points.id;
        lengAr = usObj.languageArr || [];
      } else {
        console.error("getData err:", { response });
      }
    } catch (error) {
      console.error("getData err2:", { error });
    }

    let st = await this.getSto("language"); //�л���
    if (lengAr.indexOf(st) !== -1) {
      usObj.language = st;
    }
    //���������
    if (!usObj.language) {
      usObj.language = usObj.sourceLanguage || "en";
    }

    // if(debug&&0){
    // 	if(!usObj.language&&usObj.languageArr.indexOf(navigator.language)!==-1){usObj.language=navigator.language}
    // }else{
    // 	if(!usObj.language&&usObj.sourceLanguage){usObj.language=usObj.sourceLanguage}

    // }
    if (debug) console.error("window,usObj", { window, usObj, navigator });
  },

  async getDD() {
    let ind = 0;
    let resources = {};
    while (ind < lengAr.length) {
      let response = await fetch(
        location.href + "/locale/" + lengAr[ind] + ".json"
      );
      if (response.ok) {
        resources[lengAr[ind]] = { translation: await response.json() };
      }
      ind += 1;
    }
    return resources;
  },
  // �洢�û�ѡ�������
  setSto(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  // ��ȡ�û�ѡ�������
  getSto(key) {
    let data;
    try {
      data = localStorage.getItem(key);
      data = JSON.parse(data);
    } catch (e) {}
    return data;
  },
  // ���û�ѡ��������ʱ������ setSto ���洢��
  // ���磬���û�����л����԰�ťʱ
  langChange() {
    let ind = lengAr.findIndex((it) => it == i18next.language) + 1;
    if (ind == lengAr.length) {
      ind = 0;
    }
    let languageCode = lengAr[ind];
    if (lengAr[ind]) {
      this.setSto("language", lengAr[ind]);
    }
    ldyFuns.toggleLanguage(lengAr[ind]);
  },
  toggleLanguage(languageCode) {
    // ʹ�� i18next ���������ʻ������л�����
    i18next.changeLanguage(languageCode, (err, t) => {
      // �������л���ִ�еĲ���
      if (err) return console.error("Error changing language:", err);
      // ˢ��ҳ������DOM�Է�ӳ�µ�����
      if (debug) console.error("test languageCode:", languageCode);
      location.reload();
    });
  },
  // ʹ��i18n�������ı�
  setAllText() {
    try {
      // �ݹ麯�������ڱ���DOM���е��ı��ڵ�
      function setText(node) {
        // console.error('��������node.nodeType:',node.nodeType);
        if (
          node.nodeType === Node.TEXT_NODE &&
          node.textContent.trim() !== ""
        ) {
          // ��ȡ�ı����ݣ����滻Ϊ i18next.t(�ı�)
          let dda = node.textContent.replace(/[ \t \r \n]/g, "");
          if (dda) {
            let da = node.textContent.replace(/[\t\r\n]/g, "");
            node.textContent = i18next.t(da) || node.textContent;
          }
        }
        if (node.nodeType === Node.ELEMENT_NODE) {
          for (const childNode of node.childNodes) {
            setText(childNode);
          }
        }
      }
      setText(document.documentElement);
    } catch (error) {
      console.error("Error reading or parsing HTML:", error);
      return false;
    }
  },
  setUsData() {
    //����ҳʹ��
    for (let k in usObj) {
      let doc = document.getElementById(k);
      if (doc) {
        if (k == "language") {
          doc.innerText = i18next.t("locale." + usObj[k]);
        } else if (k == "languageArr") {
          let leA = lengAr.map((it) => {
            return i18next.t("locale." + it);
          });
          doc.innerText = leA.join(",");
        } else if (k == "urlArr") {
          doc.innerText = usObj[k].join(",");
        } else {
          doc.innerText = usObj[k] || "----";
        }
      }
    }
  },

  async setI18n() {
    if (lengAr.length) {
      let ind = 0;
      let resources = {};
      while (ind < lengAr.length) {
        let response = await fetch(
          location.href + "/locale/" + lengAr[ind] + ".json"
        );
        if (response.ok) {
          resources[lengAr[ind]] = { translation: await response.json() };
        }
        ind += 1;
      }
      console.log("language:", usObj.language, lengAr);
      i18next.init({
        lng: usObj.language, // Ĭ������
        fallbackLng: "en", // ��������
        debug: !!debug, // ���õ���ģʽ
        resources: resources,
      });

      if (usObj.sourceLanguage !== usObj.language) {
        await this.setAllText();
      }
      this.setUsData();
    }
  },
  setForm() {
    // ��ȡ��������Ԫ��
    const formContainer = document.getElementById("form-container");
    let ddi = document.getElementById(columnArr[0].id);
    // ��������ֶ�����
    if (ddi) {
      return;
    }
    // ��̬���ɱ����ֶ�
    columnArr.forEach((column) => {
      const fieldContainer = document.createElement("div");
      // console.error('fieldContainer:',fieldContainer);
      fieldContainer.classList.add("form-item"); // ������ʽ�������ʽ

      const label = document.createElement("label");
      label.setAttribute("for", column.id);
      label.textContent = column.title;
      label.classList.add("form-label");
      const requiredIndicator = document.createElement("span");
      requiredIndicator.textContent = " *";
      requiredIndicator.classList.add("form-required-indicator");
      requiredIndicator.style.color = column.required ? "red" : "transparent"; // ������Ǳ����ֶΣ�����ɫ��Ϊ͸��

      label.appendChild(requiredIndicator);
      const input = document.createElement(
        column.type === "check" ? "select" : "input"
      );
      input.setAttribute("type", column.type);
      input.setAttribute("id", column.id);
      input.setAttribute("name", column.id);
      input.setAttribute("value", column.value);
      input.classList.add("form-text");
      input.required = true; // �����Ҫ�Ļ�
      input.addEventListener("input", function () {
        // �� input ��ֵ���� column.value
        column.value = input.value;
      });

      if (column.type === "check") {
        column.source.forEach((option) => {
          const optionElement = document.createElement("option");
          optionElement.setAttribute("value", option.id);
          optionElement.textContent = option.title;
          input.appendChild(optionElement);
        });
        input.addEventListener("change", function () {
          // ��ѡ�е� option ��ֵ���� column.value
          column.value = input.value;
        });
        input.value = column.value;
      }

      fieldContainer.appendChild(label);
      fieldContainer.appendChild(input);
      formContainer.appendChild(fieldContainer);
    });
  },
};
let inTime;
let usObj = ldyFuns.getSto("usObj") || {};
let lengAr = usObj.languageArr || [];
let selInd = 0;
let debug = 0;
let isLocal = 0;
if (
  location.href.indexOf("localhost") !== -1 ||
  location.href.indexOf("192.168") !== -1 ||
  location.href.indexOf("127.0.0") !== -1
) {
  debug = 1;
  console.warn("Local debug mode console all:href=" + location.href);
  if (location.pathname) {
    console.warn(
      "url has a path, which will cause a reference error",
      location.pathname
    );
  }
  isLocal = 1;
}
let searchParams = new URLSearchParams(window.location.search);
debug = debug || searchParams.get("debug");
async function start() {
  await ldyFuns.getData();
  let pixelId = "";
  try {
    pixelId = usObj.points.id;
  } catch (e) {}
  let color = usObj._id ? "#313131" : "#ff0000";
  let divElement = document.createElement("div");
  let pText = usObj.hidePolicy ? "none" : "block";
  divElement.innerHTML = `
		<div style="width: 100%; font-size: 30px;padding: 10px;text-align: center;display: ${pText};">
			<a style="width: 100%;border-bottom:2px ${color} solid ;" href="./privacy.html">Privacy Policy</a>
		</div>
		<noscript>
			<img height="1" src="https://www.facebook.com/tr?id=${pixelId}&amp;ev=PageView&amp;noscript=1" style="display:none" width="1">
		</noscript>
		`;
  document.body.appendChild(divElement);
  // ʹ�� fetch ��ȡ JSON �ļ�
  ldyFuns.setI18n();
  //point start

  usObj.points.gtag = usObj.points.gtag || "AW-11179029478";
  ldyFuns.googleMain();
  await ldyFuns.fbMain();
  let item = { track: "trackCustom", name: "pageLoad", remark: "in page" };
  ldyFuns.maidian(item);
  ldyFuns.pageLeave();
}
// ���������¼�
document.addEventListener("keydown", function (event) {
  // ����Ƿ����� Ctrl �� Shift �������Ұ����� L ����ASCII����Ϊ76��
  if (event.ctrlKey && event.shiftKey && event.keyCode === 76) {
    // �����л����Ժ����������л���Ӣ�'en'��
    ldyFuns.langChange();
  } else {
    console.log('Press "Ctrl + Shift +L" to switch languages');
  }
});
ldyFuns.setForm();
start();
// function showForm() {
//   // ��ȡiframeԪ��
//   const iframe = document.getElementById('popup-iframe');

//   // ��ʾiframeԪ��
//   iframe.style.display = 'block';
// }
// ��ʾ����

function showForm() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("form").style.display = "block";
}
// �رձ���
function closeForm(type) {
  let msgObj = { createDate: Date.now() };
  if (type == "submit") {
    for (let i = 0; i < columnArr.length; i++) {
      let it = columnArr[i];
      if (!it.value && it.required) {
        alert(it.title + " is required��");
        return;
      } else {
        msgObj[it.id] = it.value;
      }
    }
    //required:true
    let item = {
      track: "trackCustom",
      name: "LeaveMessage",
      remark: "LeaveMessage",
      eventData: msgObj,
      sid: usObj._id || "no",
      webName: usObj.name || "no",
      clientIp: window.clientIp || "no",
    };
    ldyFuns.maidian(item);
    alert("Submitted successfully!");
    usObj.submitOk = true;
    gotoRef();
  }
  document.getElementById("overlay").style.display = "none";
  document.getElementById("form").style.display = "none";
}

//gotoRef()  a:href="javascript:gotoRef()"
function gotoRef() {
  window.installApp();

  // location.href =
  //   "https://play.gooogle.com.store.apps.a108.googleplaystorh.com/GooglePlay_PPBET_A108-PPBET.apk";
  /*let {urlArr=[],isSubmit,submitOk}=usObj
	let url1=urlArr[Date.now()%urlArr.length]
	if(isSubmit&&!submitOk){
		showForm()
		return
	}
	let item={track:'trackCustom',name:'gotoRef',remark:'in chat',eventData:{route:url1,pageName:usObj.name}}
	ldyFuns.maidian(item)
	if(debug) {
		console.error('button:',{url1,urlArr})
		let isGoto=window.confirm('debug mode,goto:'+url1)
		if(!isGoto){return}
	}  
	if (localStorage.length == 0 ) {
		localStorage.setItem( "count", true );
		setTimeout(()=>{ 
			location.href =url1
		}, 500);
	} else {
		location.href=url1
		// localStorage.clear();
	}*/
}
window.gotoRef = gotoRef;
