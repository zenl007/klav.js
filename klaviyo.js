(()=>{function e(e){i.init_lib();try{const t=function(e){let t="";location.href.indexOf("?")&&(t=location.href.substr(location.href.indexOf("?")));const o=t.match(new RegExp("[?&]"+e+"=([^&]*)(&?)","i"));return o?o[1]:null};let o="",i=!1;e&&(i=!0,o=e.toUpperCase()+"-");const a=window.location.pathname,c=function(){const e=new Date;return e.toISOString()},l=function(){const e=navigator.userAgent;return/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(e)?"tablet":/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(e)?"mobile":"desktop"};let d,u=!1,s="",w="",m="",p=!0,g=JSON.parse(window.__CTR_FP_TRACKING_SETTINGS.FP_TRACKING_CUSTOM_DATA).campaignName,_=!1,f="",h=t("guid"),y=t("ext_scripts");if("false"===y)return;const v=function(){const e=window.ctrwowCheckout.checkoutData.getProduct(),t=window.localStorage.getItem("doubleQuantity")?e.quantity/2:e.quantity,n=[{productId:o+e.productId,sku:e.sku,total_usd:(e.productPrices.DiscountedPrice.Value+e.shippings[window.shippingIndex||0].price).toFixed(2),quantity:t}];return{products:n,sku:e.sku}},I=function(){let e;e="object"==typeof window.upsells&&window.upsells.length>0?window.upsells[window.upsell_productindex||0]:window.ctrwowUpsell.productListData.getProductList().prices[window.upsell_productindex||0];const t=window.localStorage.getItem("doubleQuantity")?e.quantity/2:e.quantity,n=[{productId:o+e.productId,sku:e.sku,total_usd:(e.productPrices.DiscountedPrice.Value+e.shippings[window.shippingIndex||0].price).toFixed(2),quantity:t}];return{products:n,sku:e.sku}},S=function(){let e=!1;return e};n=function(){try{let e={first_name:document.querySelector('[name="firstName"]').value||"",last_name:document.querySelector('[name="lastName"]').value||"",ship_city:document.querySelector('[name="city"]').value,ship_address:document.querySelector('[name="address1"]').value,ship_state:document.querySelector('[name="state"]').value,ship_zip:document.querySelector('[name="zipCode"]').value,ship_country:document.querySelector('[name="countryCode"]').value,customer_language:document.querySelector("html").getAttribute("lang")||"",joined_at:c(),fingerprint_id:window._EA_ID,landing_base_url:window.location.href,referrer:document.referrer};return i?e.client=!0:(e.client=!1,e.internal_lead=!0),window.CC_Code&&(e.coupon=window.CC_Code),u&&(e={...e,phone_number:m||document.querySelector('[name="phoneNumber"]').value,phone_valid:u,phone_linetype:s,phone_carrier:w}),p||(e={...e,email:document.querySelector('[name="email"]').value,event_domain_blacklist:S()}),e}catch(e){return console.log(e),{}}};const k=function(e){try{const t=window.localStorage.getItem("realDoubleQuantity")?e.quantity/2:e.quantity,n=window.location.href,r=n.split("?")[0],a={email:document.querySelector('[name="email"]').value||"",first_name:document.querySelector('[name="firstName"]').value||"",last_name:document.querySelector('[name="lastName"]').value||"",product_ids:[o+e.productId],total_usd:[(e.productPrices.DiscountedPrice.Value+e.shippings[window.shippingIndex||0].price).toFixed(2)],quantity:[t],items:[{productId:o+e.productId,sku:e.sku,total_usd:(e.productPrices.DiscountedPrice.Value+e.shippings[window.shippingIndex||0].price).toFixed(2),quantity:t}],sku:e.sku,currency:window.localStorage.getItem("currencyCode"),landingurl:n,landing_base_url:r,referringurl:document.referrer,customer_language:document.querySelector("html").getAttribute("lang")||""};return i?a.client=!0:(a.client=!1,a.internal_lead=!0),u&&(a.phone_number=m||document.querySelector('[name="phoneNumber"]').value),a.event_domain_blacklist=S(),a}catch(e){return console.log(e),{}}},b=function(e){if(!e)return;const t=e.value&&!e.classList.contains("error");var o=new RegExp("^[a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$","i");if(t){const t=o.test(e.value);if(t){window.ctrwowUtils.events.emit("onValidEmail"),window.localStorage.removeItem("isInvalidEmail"),p=!1,r=!0;const e=n();window._learnq.push(["identify",{$email:e.email}]),setTimeout(function(){window._learnq.push(["track","identify",e]);const t=window.ctrwowCheckout.checkoutData.getProduct(),o=k(t);window._learnq.push(["track","add_to_cart",o])},2500)}else window.localStorage.setItem("isInvalidEmail",!0),p=!0,r=!1}},q=function(e,t=!1,n=!1){const r=window.location.href,a=r.split("?")[0],u=localStorage.getItem("ctr_checkout_url")||"",s=u.split("?")[0];let w=null;const m=[];w=n?I():v();const p=w.products;for(let e=0,t=p.length;e<t;e++)m.push(p[e].productId);const _={fingerprintId:window._EA_ID,referrer:document.referrer,countryCode:e.ship_country,regionCode:e.ship_state,ip:d?d.location.ip:window.localStorage.getItem("location")?JSON.parse(window.localStorage.getItem("location")).ip:"",product_ids:m,items:p,sku:w.sku,currency:window.localStorage.getItem("currencyCode"),event_domain_blacklist:S(),email:document.querySelector('[name="email"]')?document.querySelector('[name="email"]').value:"",first_name:document.querySelector('[name="firstName"]')?document.querySelector('[name="firstName"]').value:"",order_create_date:c(),ip_address:window.localStorage.getItem("location")||"",customer_language:document.querySelector("html").getAttribute("lang")||"",device_type:l(),device_vendor:window.navigator.vendor,campaignname:g,internal_campaignname:g,landingurl:r,landing_base_url:a,checkout_url:u,checkout_base_url:s,referringurl:document.referrer,parentcampaign:window.localStorage.getItem("mainCampaignName"),revenue:p.length>0?p[0].total_usd:""};i?_.client=!0:(_.client=!1,_.internal_lead=!0);const f=localStorage.getItem("orderInfo")?JSON.parse(localStorage.getItem("orderInfo")):null;let y="";if(f&&(y=f.cusEmail||f.cusEmailPP||""),t){const e=Number(f.orderTotalFull);_.one_click_purchase_reference=h,_.order_id=f?o+f.orderNumber:"",_.order_number=f?f.orderNumber:"",_.first_name=f&&f.cusFirstName?f.cusFirstName:"",_.email=y,_.revenue=e.toFixed(2)}return n&&(_.one_click_purchase_reference=h,_.main_order_id=f?o+f.orderNumber:"",_.main_order_number=f?f.orderNumber:"",_.first_name=f&&f.cusFirstName?f.cusFirstName:"",_.email=y,_.revenue=p.length>0?p[0].total_usd:""),_},C=function(){const e=n();if(e.guid=h,!p){window._learnq.push(["track","identify",e]);const t=window.ctrwowCheckout.checkoutData.getProduct(),o=k(t);o.one_click_purchase_reference=h,window._learnq.push(["track","add_to_cart",o])}const t=q(e,!0);window._learnq.push(["track","checkout",t])},N=function(){let e=JSON.parse(window.localStorage.getItem("prevItem"));var t=window.localStorage.getItem("orderInfo"),n=window.localStorage.getItem("userPaymentType"),r=window.localStorage.getItem("location");if(e){const a=window.localStorage.getItem("doubleQuantity")?e.quantity/2:e.quantity,d=[{productId:o+e.productId,sku:e.sku,total_usd:(e.productPrices.DiscountedPrice.Value+e.shippings[window.shippingIndex||0].price).toFixed(2),quantity:a}],u=e.sku,s=[];for(let e=0,t=d.length;e<t;e++)s.push(d[e].productId);const w=window.location.href,m=w.split("?")[0];let p={order_create_date:c(),ip_address:r.ip||"",internal_campaignname:e.campaignName,device_type:l(),device_vendor:window.navigator.vendor,campaignname:e.campaignName,landingurl:w,landing_base_url:m,referringurl:document.referrer,parentcampaign:window.localStorage.getItem("mainCampaignName"),product_ids:s,items:d,sku:u,referring_base_url:localStorage.getItem("ctr_checkout_url")&&localStorage.getItem("ctr_checkout_url").split("?")[0]};if("creditcard"===n&&h&&(p.one_click_purchase_reference=h),i?p.client=i:(p.client=!1,p.internal_lead=!0),"true"===window.localStorage.getItem("isInvalidEmail"))return!1;if(t){t=JSON.parse(t);const e=t.cusEmailPP||t.cusEmail||window.localStorage.getItem("customer_email");if(!e)return!1;p={...p,email:e,order_id:o+t.orderNumber,customer_language:document.querySelector("html").getAttribute("lang")||""}}else{if(!window.localStorage.getItem("customer_email"))return!1;p={...p,email:window.localStorage.getItem("customer_email")}}return p}return!1},P=function(){try{window.localStorage.removeItem("isFiredMainOrderBlueshift"),d=window.__productListData.data.productList;let o=window.__checkoutData.data.product;if(!d||!window._EA_ID||_||!o)return;console.log("Klaviyo",d,window._EA_ID),window.localStorage.setItem("_vid",window._EA_ID),_=!0;var e=Array.prototype.slice.call(document.querySelectorAll('[name="email"], [name="firstName"], [name="lastName"], [name="phoneNumber"]'));let r=n();const i=$('input[name="phoneNumber"]'),a=document.querySelector('[name="shippingAddress"] [name="countryCode"]');let c=!1,l=!1;const y=function(e){try{window.localStorage.getItem("ctr__countryCode")&&(f=window.localStorage.getItem("ctr__countryCode")),a&&a.value&&(f=a.value),"1"===t("validPhone")&&i.rules("remove","cphone");const o=window.libphonenumber.parsePhoneNumber(i.val(),f);if(o.country.toLowerCase()===f.toLowerCase()&&(u=o.isValid(),s=o.getType()||"",w=o.carrier||"",o.isValid()?(i.addClass("correct-phone"),m=o.number,r=n(),p||window._learnq.push(["track","identify",r])):"1"===t("validPhone")&&i.removeClass("correct-phone")),"1"===t("validPhone")){if(o.country&&a.value.toLowerCase()!==o.country.toLowerCase()&&a.querySelector(`option[value="${o.country}"]`)&&!e){c=!0,a.value=o.country,a.dispatchEvent(new Event("change"));const e=$('form[name="shippingAddress"]').validate();e.element(a)}i.rules("add",{cphone:!0});const t=$('form[name="customer"]').validate();t.element(i),c=!1}}catch(e){console.log(e)}};a&&a.addEventListener("change",()=>{c||y(!0)}),h&&(y(),b(window._q('input[name="email"]'))),e.forEach(function(e){e.addEventListener("blur",function(e){try{r=n(),"email"===e.currentTarget.getAttribute("name")&&e.currentTarget.classList.contains("valid")&&window.currentEmail!==e.currentTarget.value&&(console.log("Klaviyo - Fire identify"),window.currentEmail=e.currentTarget.value,window.isDeplayCallSubmitted=!1,b(e.currentTarget)),"phoneNumber"===e.currentTarget.getAttribute("name")&&window.currentPhone!==e.currentTarget.value&&(window.currentPhone=e.currentTarget.value,l=!1,window.isDeplayCallSubmitted=!1,y())}catch(e){console.log(e)}})}),window.pauseCheckoutProcessing={isPause:!0,delay:500},document.querySelector("body").insertAdjacentHTML("beforeend",'<span class="custom-loading" style="display: none;"></span>'),window.ctrwowUtils.events.on("afterSubmitOrder",function(e){e&&e.referenceId&&e.useCreditCard&&(h=e.referenceId,C())}),window.ctrwowUtils.events.on("declinePayment",function(){if(h){const e=N();e&&window._learnq.push(["track","decline",e])}}),window.ctrwowUtils.events.on("onAfterActivePopup",function(){try{window.CC_Code=window.ctrwowCheckout.checkoutData.getCouponCode(),r=n(),p||window._learnq.push(["track","identify",r])}catch(e){console.log(e)}}),window.ctrwowUtils.events.on("beforeSubmitOrder",function(){try{r=n(),p||window._learnq.push(["track","identify",r]),window.localStorage.setItem("identifyData",JSON.stringify(r));const e=window.ctrwowCheckout.checkoutData.getProduct();e.campaignName=g,window.localStorage.setItem("prevItem",JSON.stringify(e));const t=q(r);window._learnq.push(["track","checkout",t])}catch(e){console.log(e)}}),window.localStorage.setItem("location",JSON.stringify(d.location)),window.ctrwowCheckout.checkoutData.onProductChange(function(){try{var e=window.ctrwowCheckout.checkoutData.getProduct();if(e.productId===o.productId)return;const t=k(o),n=k(e);document.querySelector('[name="email"]')&&document.querySelector('[name="email"]').classList.contains("valid")&&(p||(window._learnq.push(["track","remove_from_cart",t]),window._learnq.push(["track","add_to_cart",n]))),o=window.ctrwowCheckout.checkoutData.getProduct()}catch(e){console.log(e)}})}catch(e){console.log("Warning: orderPageEvents")}},O=function(){try{if(a.indexOf("/order")>-1||window.__CTRWOW_CONFIG&&2===window.__CTRWOW_CONFIG.PAGE_TYPE){P();let e=0;const t=setInterval(()=>{e++,window.__productListData&&window.__productListData.data&&window.__productListData.data.productList&&window._EA_ID&&(P(),clearInterval(t)),50===e&&clearInterval(t)},300);return}var e=window.localStorage.getItem("orderInfo"),t=window.localStorage.getItem("location"),n=window.localStorage.getItem("isInvalidEmail"),r=window.localStorage.getItem("isFiredMainOrderBlueshift"),d=window._EA_ID||window.localStorage.getItem("_vid");window.localStorage.getItem("referrerUrl")||window.localStorage.setItem("referrerUrl",document.referrer);const u=function(e,n){try{let r=e.orderNumber,a=window.localStorage.getItem("doubleQuantity")?Math.ceil(e.quantity/2):e.quantity,d=Number(e.orderTotalFull),u=[{productId:o+e.orderedProducts[0].pid,sku:e.orderedProducts[0].sku,total_usd:e.orderTotalFull,quantity:a}],s=e.orderedProducts[0].sku;if(e.upsellUrls&&e.upsellUrls.length>0)for(let t=0,o=e.upsellUrls.length;t<o;t++)"fired"===e.upsellUrls[t].isFired&&(d+=e.upsellUrls[t].price);n&&(r=e.orderNumber,g=n.campaignName,u=[{productId:o+n.orderedProducts[0].pid,sku:n.orderedProducts[0].sku,total_usd:n.price,quantity:n.orderedProducts[0].quantity}],s=n.orderedProducts[0].sku);const w=[];for(let e=0,t=u.length;e<t;e++)w.push(u[e].productId);const m=window.location.href,p=m.split("?")[0],_=localStorage.getItem("ctr_checkout_url")||"",f=_.split("?")[0],h={order_id:o+r,order_number:r,first_name:e.cusFirstName,email:e.cusEmail||e.cusEmailPP||"",order_create_date:c(),ip_address:t.ip||"",customer_language:document.querySelector("html").getAttribute("lang")||"",device_type:l(),device_vendor:window.navigator.vendor,campaignname:g,internal_campaignname:g,landingurl:m,landing_base_url:p,referringurl:document.referrer,parentcampaign:window.localStorage.getItem("mainCampaignName"),product_ids:w,items:u,sku:s,revenue:d.toFixed(2),currency:window.localStorage.getItem("currencyCode"),checkout_url:_,checkout_base_url:f};return i?h.client=!0:(h.client=!1,h.internal_lead=!0),h}catch(e){return console.log(e),{}}};if(e&&d){e=JSON.parse(e),t=JSON.parse(t||"{}");let o=window.localStorage.getItem("identifyData");if(o&&(o=JSON.parse(o),window.localStorage.setItem("identifyData",JSON.stringify(o)),"true"!==n&&window._learnq.push(["track","identify",o])),r){if(e.upsellUrls&&e.upsellUrls.length>0){const t=e.upsellUrls.length-1,o=e.upsellUrls[t],r=localStorage.getItem("subOrderNumber");e.upsellUrls[t].isFired||e.upsellUrls[t].orderNumber===r||(e.upsellUrls[t].isFired="fired","true"!==n&&window._learnq.push(["track","purchase",u(e,o)]))}}else{if(console.log("Klaviyo - Fire Purchase"),e.upsellUrls&&e.upsellUrls.length>0&&localStorage.setItem("subOrderNumber",e.upsellUrls[0].orderNumber),"true"!==n){const t=u(e);window._learnq.push(["track","purchase",t])}window.localStorage.setItem("isFiredMainOrderBlueshift",!0)}window.localStorage.setItem("orderInfo",JSON.stringify(e))}if(window.ctrwowUtils.events.on("onBeforePlaceUpsellOrder",function(){let e;e="object"==typeof window.upsells&&window.upsells.length>0?window.upsells[window.upsell_productindex||0]:window.ctrwowUpsell.productListData.getProductList().prices[window.upsell_productindex||0],e.campaignName=g,window.localStorage.setItem("prevItem",JSON.stringify(e));let t=window.localStorage.getItem("identifyData");if(t){t=JSON.parse(t);const e=q(t,!1,!0);window._learnq.push(["track","checkout",e])}}),a.indexOf("decline")>-1){const e=N();e&&window._learnq.push(["track","decline",e])}}catch(e){console.log(e)}},E=function(){try{const e={en:"Please enter a international phone number or update your country.",de:"Bitte geben Sie eine gültige Telefonnummer ein.",fr:"Veuillez saisir un numéro de téléphone valide.",jp:"有効な電話番号を入力してください。",cn:"请输入有效电话号码。",br:"Por favor insira um telefone válido.",es:"Por favor introduzca un número de teléfono válido.",pt:"Por favor insira um número de telefone válido."};window.phoneMsg=e.en,a.indexOf("/de/")>-1&&(window.phoneMsg=e.de),a.indexOf("/fr/")>-1&&(window.phoneMsg=e.fr),a.indexOf("/jp/")>-1&&(window.phoneMsg=e.jp),a.indexOf("/cn/")>-1&&(window.phoneMsg=e.cn),a.indexOf("/br/")>-1&&(window.phoneMsg=e.br),a.indexOf("/es/")>-1&&(window.phoneMsg=e.es),a.indexOf("/pt/")>-1&&(window.phoneMsg=e.pt),$.validator.addMethod("cphone",function(e,t){return $(t).hasClass("correct-phone")},window.phoneMsg)}catch(e){console.log(e)}};O(),"1"===t("validPhone")&&E()}catch(e){console.log(e)}}function t(){try{const e=document.createElement("script");e.src="https://raw.githubusercontent.com/zenl007/klav.js/main/libphonenumber-min_1_7_6.js",e.defer=!0,document.body.appendChild(e)}catch(e){console.log("init google lib error")}}function o(){window.addEventListener("load",function(){window.__CTRWOW_CONFIG&&window.__ctrPageConfiguration&&window.__ctrPageConfiguration.sourceConfig&&window.__ctrPageConfiguration.sourceConfig.source&&e(window.__ctrPageConfiguration.sourceConfig.source)})}let n,r=!1;const i={init_lib:()=>{window._learnq=window._learnq||[];var e=document.createElement("script");e.src="//static.klaviyo.com/onsite/js/klaviyo.js?company_id={ThZTLX}",e.async=!0,document.head.appendChild(e)}};o(),1!==window.__CTRWOW_CONFIG.PAGE_TYPE&&t()})();
