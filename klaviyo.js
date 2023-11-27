(() => {
    let isValidEmail = false;

    let getIdentifyData;
    const klaviyo = {
        init_lib: () => {
            window._learnq = window._learnq || [];
            var script = document.createElement('script');
            script.src = '//static.klaviyo.com/onsite/js/klaviyo.js?company_id={INSERT_PUBLIC_API_KEY}';
            script.async = true;
            document.head.appendChild(script); //or something of the likes            
        }
    };

    /////////////execute
    function execute(clientCode) {
        klaviyo.init_lib();
        try {
            const getQueryParameter = function (param) {
                let href = '';
                if (location.href.indexOf('?')) {
                    href = location.href.substr(location.href.indexOf('?'));
                }

                const value = href.match(new RegExp('[\?\&]' + param + '=([^\&]*)(\&?)', 'i'));
                return value ? value[1] : null;
            };
    
            let prefix = '';
            let isClient = false;
            if (clientCode) {
                isClient = true;
                prefix = clientCode.toUpperCase() + '-';
            }

            const urlPath = window.location.pathname;
            const getCurrentDate = function () {
                const date = new Date();
                return date.toISOString();
            };
            const getDeviceType = function () {
                const ua = navigator.userAgent;
                if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
                    return 'tablet';
                }
                if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
                    return 'mobile';
                }
                return 'desktop';
            };
            
			

            let phone_valid = false, phone_linetype = '', phone_carrier = '', international_format = '';
            let isInvalidEmail = true;
            let campaignName = JSON.parse(window.__CTR_FP_TRACKING_SETTINGS.FP_TRACKING_CUSTOM_DATA).campaignName;
            let campaignInfo;
            let orderFired = false;
            let countryCode = '';
            let referenceId = getQueryParameter('guid');
            let ext_scripts = getQueryParameter('ext_scripts');
            if (ext_scripts === 'false') {
                return;
            }

            const getProductsInCart = function () {
                const currentItem = window.ctrwowCheckout.checkoutData.getProduct();
                const quantity = window.localStorage.getItem('doubleQuantity') ? currentItem.quantity / 2 : currentItem.quantity;
                const products = [
                    {
                        productId: prefix + currentItem.productId,
                        sku: currentItem.sku,
                        total_usd: (currentItem.productPrices.DiscountedPrice.Value + currentItem.shippings[window.shippingIndex || 0].price).toFixed(2),
                        quantity: quantity
                    }
                ];
                return {
                    products: products,
                    sku: currentItem.sku
                };
            };

            const getUpsellProductsInCart = function () {
                let upsellItem;
                if (typeof window.upsells === 'object' && window.upsells.length > 0) {
                    upsellItem = window.upsells[window.upsell_productindex || 0];
                } else {
                    upsellItem = window.ctrwowUpsell.productListData.getProductList().prices[window.upsell_productindex || 0];
                }
                const quantity = window.localStorage.getItem('doubleQuantity') ? upsellItem.quantity / 2 : upsellItem.quantity;
                const products = [
                    {
                        productId: prefix + upsellItem.productId,
                        sku: upsellItem.sku,
                        total_usd: (upsellItem.productPrices.DiscountedPrice.Value + upsellItem.shippings[window.shippingIndex || 0].price).toFixed(2),
                        quantity: quantity
                    }
                ];
                return {
                    products: products,
                    sku: upsellItem.sku
                };
            };

            const isBlackListDomain = function() {
                let domain_blacklist = false;

                return domain_blacklist;
            };

            getIdentifyData = function () {
                try {
                    let data = {
                        first_name: document.querySelector('[name="firstName"]').value || '',
                        last_name: document.querySelector('[name="lastName"]').value || '',
                        ship_city: document.querySelector('[name="city"]').value,
                        ship_address: document.querySelector('[name="address1"]').value,
                        ship_state: document.querySelector('[name="state"]').value,
                        ship_zip: document.querySelector('[name="zipCode"]').value,
                        ship_country: document.querySelector('[name="countryCode"]').value,
                        customer_language: document.querySelector('html').getAttribute('lang') || '',
                        joined_at: getCurrentDate(),
                        fingerprint_id: window._EA_ID,
                        landing_base_url: window.location.href,
                        referrer: document.referrer
                    };

                    if (isClient) {
                        data.client = true;
                    } else {
                        data.client = false;
                        data.internal_lead = true;
                    }

                    if (window.CC_Code) {
                        data.coupon = window.CC_Code;
                    }
                    if (phone_valid) {
                        data = {
                            ...data,
                            phone_number: international_format || document.querySelector('[name="phoneNumber"]').value,
                            phone_valid: phone_valid,
                            phone_linetype: phone_linetype,
                            phone_carrier: phone_carrier
                        };
                    }
                    if (!isInvalidEmail) {
                        data = {
                            ...data,
                            email: document.querySelector('[name="email"]').value,
                            event_domain_blacklist :  isBlackListDomain()
                        };
                    }

                    
                    return data;
                } catch (e) {
                    console.log(e);
                    return {};
                }
            };

            const getItemDataForCart = function (checkedItem) {
                try {
                    const quantity = window.localStorage.getItem('realDoubleQuantity') ? checkedItem.quantity / 2 : checkedItem.quantity;
                    const landingurl = window.location.href;
                    const landingBaseUrl = landingurl.split('?')[0];
                    const dataForCart = {
                        email: document.querySelector('[name="email"]').value || '',
                        first_name: document.querySelector('[name="firstName"]').value || '',
                        last_name: document.querySelector('[name="lastName"]').value || '',
                        product_ids: [prefix + checkedItem.productId],
                        total_usd: [(checkedItem.productPrices.DiscountedPrice.Value + checkedItem.shippings[window.shippingIndex || 0].price).toFixed(2)],
                        quantity: [quantity],
                        items: [
                            {
                                productId: prefix + checkedItem.productId,
                                sku: checkedItem.sku,
                                total_usd: (checkedItem.productPrices.DiscountedPrice.Value + checkedItem.shippings[window.shippingIndex || 0].price).toFixed(2),
                                quantity: quantity
                            }
                        ],
                        sku: checkedItem.sku,
                        currency: window.localStorage.getItem('currencyCode'),
                        landingurl: landingurl,
                        landing_base_url: landingBaseUrl,
                        referringurl: document.referrer,
                        customer_language: document.querySelector('html').getAttribute('lang') || ''
                    };

                    if (isClient) {
                        dataForCart.client = true;
                    } else {
                        dataForCart.client = false;
                        dataForCart.internal_lead = true;
                    }

                    if (phone_valid) {
                        dataForCart.phone_number =  international_format || document.querySelector('[name="phoneNumber"]').value;
                    }

                    dataForCart['event_domain_blacklist'] = isBlackListDomain();

                    return dataForCart;
                } catch (e) {
                    console.log(e);
                    return {};
                }
            };
            const checkValidEmail = function (email) {
                if (!email) {
                    return;
                }
                const isEmailValid = email.value && !email.classList.contains('error');
				var EMAIL_REGEXP = new RegExp('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$', 'i');
                if (isEmailValid) {
					const checkEmail = EMAIL_REGEXP.test(email.value);
					
					if(checkEmail){
						window.ctrwowUtils.events.emit('onValidEmail'); // Emit event to trigger leadgen API - Not yet
						window.localStorage.removeItem('isInvalidEmail');
						isInvalidEmail = false;
						isValidEmail = true;

						const identifyData = getIdentifyData();
						window._learnq.push(['identify', { '$email': identifyData.email }]);


						setTimeout(function () {
							window._learnq.push(['track', 'identify', identifyData]);

							const checkedItemData = window.ctrwowCheckout.checkoutData.getProduct();
							const getCheckedDataForCart = getItemDataForCart(checkedItemData);
							window._learnq.push(['track', 'add_to_cart', getCheckedDataForCart]);
						}, 2500);
					} else {
						window.localStorage.setItem('isInvalidEmail', true);
						isInvalidEmail = true;
						isValidEmail = false;
					}
                }
            };

            const getCheckOutData = function(identifyData, isCheckoutAfterSubmit = false, isUpsellSubmit = false){
                const landingurl = window.location.href;
                const landingBaseUrl = landingurl.split('?')[0];
                const checkout_url = localStorage.getItem('ctr_checkout_url') || '';
                const checkout_base_url = checkout_url.split('?')[0];

                let productsInCart = null;
                const product_ids = [];
                if (!isUpsellSubmit){
                    productsInCart = getProductsInCart();
                } else {
                    productsInCart = getUpsellProductsInCart();
                }
                const items = productsInCart.products;
                for (let i = 0, n = items.length; i < n; i++) {
                    product_ids.push(items[i].productId);
                }

                const checkoutData = {
                    fingerprintId: window._EA_ID,
                    referrer: document.referrer,
                    countryCode: identifyData.ship_country,
                    regionCode: identifyData.ship_state,
                    ip: campaignInfo ? campaignInfo.location.ip : (window.localStorage.getItem('location') ? JSON.parse(window.localStorage.getItem('location')).ip : ''),
                    product_ids: product_ids,
                    items: items,
                    sku: productsInCart.sku,
                    currency: window.localStorage.getItem('currencyCode'),
                    event_domain_blacklist :  isBlackListDomain(),
                    email: document.querySelector('[name="email"]') ? document.querySelector('[name="email"]').value : '',
                    first_name: document.querySelector('[name="firstName"]') ? document.querySelector('[name="firstName"]').value : '',
                    order_create_date: getCurrentDate(),
                    ip_address: window.localStorage.getItem('location') || '',
                    customer_language: document.querySelector('html').getAttribute('lang') || '',
                    device_type: getDeviceType(),
                    device_vendor: window.navigator.vendor,
                    campaignname: campaignName,
                    internal_campaignname: campaignName,
                    landingurl: landingurl,
                    landing_base_url: landingBaseUrl,
                    checkout_url:checkout_url,
                    checkout_base_url:checkout_base_url,
                    referringurl: document.referrer,
                    parentcampaign: window.localStorage.getItem('mainCampaignName'),
                    revenue: items.length > 0 ? items[0].total_usd : ''
                };
                
                if (isClient) {
                    checkoutData.client = true;
                } else {
                    checkoutData.client = false;
                    checkoutData.internal_lead = true;
                }
				
                const orderInfo = localStorage.getItem('orderInfo') ? JSON.parse(localStorage.getItem('orderInfo')) : null;
                let cusEmail = '';
                if (orderInfo) {
                    cusEmail = orderInfo.cusEmail || orderInfo.cusEmailPP || '';
                }
                if (isCheckoutAfterSubmit){
                    const revenue = Number(orderInfo.orderTotalFull);
                    checkoutData.one_click_purchase_reference = referenceId;
                    checkoutData.order_id = orderInfo ? prefix + orderInfo.orderNumber : '';
                    checkoutData.order_number = orderInfo ? orderInfo.orderNumber : '';
                    checkoutData.first_name = orderInfo && orderInfo.cusFirstName ? orderInfo.cusFirstName : '';
                    checkoutData.email = cusEmail;
                    checkoutData.revenue = revenue.toFixed(2);
                }

                if (isUpsellSubmit){
                    checkoutData.one_click_purchase_reference = referenceId;
                    checkoutData.main_order_id = orderInfo ? prefix + orderInfo.orderNumber : '';
                    checkoutData.main_order_number = orderInfo ? orderInfo.orderNumber : '';
                    checkoutData.first_name = orderInfo && orderInfo.cusFirstName ? orderInfo.cusFirstName : '';
                    checkoutData.email = cusEmail;
                    checkoutData.revenue = items.length > 0 ? items[0].total_usd : '';
                }

                return checkoutData;
            };

            const onAfterSubmitOrder = function () {
                const identifyData = getIdentifyData();
                identifyData.guid = referenceId;
                if (!isInvalidEmail) {
                    window._learnq.push(['track', 'identify', identifyData]);

                    const checkedItemData = window.ctrwowCheckout.checkoutData.getProduct();
                    const getCheckedDataForCart = getItemDataForCart(checkedItemData);
                    getCheckedDataForCart.one_click_purchase_reference = referenceId;
                    window._learnq.push(['track', 'add_to_cart', getCheckedDataForCart]);
                }


                // Klaviyo checkout event
                const checkoutData = getCheckOutData(identifyData, true);
                window._learnq.push(['track', 'checkout', checkoutData]);
            };

            const getDeclineInfo = function () {
                let prevItem = JSON.parse(window.localStorage.getItem('prevItem'));
                var orderInfo = window.localStorage.getItem('orderInfo');
                var paymentType = window.localStorage.getItem('userPaymentType');
                var _location = window.localStorage.getItem('location');
                if (prevItem) {
                    const quantity = window.localStorage.getItem('doubleQuantity') ? prevItem.quantity / 2 : prevItem.quantity;
                    const failProducts = [
                        {
                            productId: prefix + prevItem.productId,
                            sku: prevItem.sku,
                            total_usd: (prevItem.productPrices.DiscountedPrice.Value + prevItem.shippings[window.shippingIndex || 0].price).toFixed(2),
                            quantity: quantity
                        }
                    ],
                        sku = prevItem.sku;
                    const product_ids = [];
                    for (let i = 0, n = failProducts.length; i < n; i++) {
                        product_ids.push(failProducts[i].productId);
                    }
                    const landingurl = window.location.href;
                    const landingBaseUrl = landingurl.split('?')[0];
                    let declineData = {
                        order_create_date: getCurrentDate(),
                        ip_address: _location.ip || '',
                        internal_campaignname: prevItem.campaignName,
                        device_type: getDeviceType(),
                        device_vendor: window.navigator.vendor,
                        campaignname: prevItem.campaignName,
                        landingurl: landingurl,
                        landing_base_url: landingBaseUrl,
                        referringurl: document.referrer,
                        parentcampaign: window.localStorage.getItem('mainCampaignName'),
                        product_ids: product_ids,
                        items: failProducts,
                        sku: sku,
                        referring_base_url: localStorage.getItem('ctr_checkout_url') && localStorage.getItem('ctr_checkout_url').split('?')[0]
                    };
                    if (paymentType === 'creditcard' && referenceId) {
                        declineData.one_click_purchase_reference = referenceId;
                    }
                    if (isClient) {
                        declineData.client = isClient;
                    } else {
                        declineData.client = false;
                        declineData.internal_lead = true;
                    }
                    if (window.localStorage.getItem('isInvalidEmail') === 'true') {
                        return false;
                    }

                    if (orderInfo) {
                        orderInfo = JSON.parse(orderInfo);
                        const email = orderInfo.cusEmailPP || orderInfo.cusEmail || window.localStorage.getItem('customer_email');
                        if (!email) {
                            return false;
                        }
                        declineData = {
                            ...declineData,
                            email: email,
                            order_id: prefix + orderInfo.orderNumber,
                            customer_language: document.querySelector('html').getAttribute('lang') || ''
                        };
                    } else if (window.localStorage.getItem('customer_email')) {
                        declineData = {
                            ...declineData,
                            email: window.localStorage.getItem('customer_email')
                        };
                    } else {
                        return false;
                    }

                    return declineData;
                }
                return false;
            };

            const orderPageEvents = function () {
                try {
                    window.localStorage.removeItem('isFiredMainOrderBlueshift');
                    campaignInfo = window.__productListData.data.productList;

                    let checkedItemData = window.__checkoutData.data.product;

                    if (!campaignInfo || !window._EA_ID || orderFired || !checkedItemData) { return; }
                    console.log('Klaviyo', campaignInfo, window._EA_ID);
                    window.localStorage.setItem('_vid', window._EA_ID);

                    orderFired = true;

                    var inputs = Array.prototype.slice.call(document.querySelectorAll('[name="email"], [name="firstName"], [name="lastName"], [name="phoneNumber"]'));
                    let identifyData = getIdentifyData();

                    const phoneNumberElm = $('input[name="phoneNumber"]');
                    const countryDdl = document.querySelector('[name="shippingAddress"] [name="countryCode"]');
                    let isTriggerCountryDDl = false;

                    let isRecall = false;

                    const callAPICheckPhone = function (isFromCountryDdl) {
                        // Use google phone lib
                        // Refer: https://gitlab.com/catamphetamine/libphonenumber-js/#cdn
                        // https://github.com/google/libphonenumber/tree/master
                        // https://htmlpreview.github.io/?https://github.com/google/libphonenumber/blob/master/javascript/i18n/phonenumbers/demo-compiled.html
                        try {
                            if (window.localStorage.getItem('ctr__countryCode')) {
                                countryCode = window.localStorage.getItem('ctr__countryCode');
                            }

                            if (countryDdl && countryDdl.value) {
                                countryCode = countryDdl.value;
                            }

                            if (getQueryParameter('validPhone') === '1') {
                                phoneNumberElm.rules('remove', 'cphone');
                            }

                            const formatPhone = window.libphonenumber.parsePhoneNumber(phoneNumberElm.val(), countryCode);

                            if (formatPhone.country.toLowerCase() === countryCode.toLowerCase()) {
                                phone_valid = formatPhone.isValid();
                                phone_linetype = formatPhone.getType() || '';
                                phone_carrier = formatPhone.carrier || '';
                                if (formatPhone.isValid()) {
                                    phoneNumberElm.addClass('correct-phone');
                                    international_format = formatPhone.number;
                                    identifyData = getIdentifyData();
                                    if (!isInvalidEmail) {
                                        window._learnq.push(['track', 'identify', identifyData]);
                                    }
                                } else if (getQueryParameter('validPhone') === '1') {
                                    phoneNumberElm.removeClass('correct-phone');
                                }
                            }

                            if (getQueryParameter('validPhone') === '1') {
                                if (
                                    formatPhone.country &&
                                    countryDdl.value.toLowerCase() !== formatPhone.country.toLowerCase() &&
                                    countryDdl.querySelector(`option[value="${formatPhone.country}"]`) &&
                                    !isFromCountryDdl
                                ) {
                                    isTriggerCountryDDl = true;
                                    countryDdl.value = formatPhone.country;
                                    countryDdl.dispatchEvent(new Event('change'));

                                    const shippingAddressFrm = $('form[name="shippingAddress"]').validate();
                                    shippingAddressFrm.element(countryDdl);
                                }

                                phoneNumberElm.rules('add', { cphone: true });
                                const validator = $('form[name="customer"]').validate();
                                validator.element(phoneNumberElm);

                                isTriggerCountryDDl = false;
                            }
                            
                        } catch (error) {
                            console.log(error);
                        }
                        // End use google phone lib

                        
                    };
					
                    countryDdl && countryDdl.addEventListener('change', () => {
                        if (!isTriggerCountryDDl) {
                            callAPICheckPhone(true);
                        }
                    });

                    if (referenceId) {
                        callAPICheckPhone();
                        checkValidEmail(window._q('input[name="email"]'));
                    }

                    inputs.forEach(function (input) {
                        input.addEventListener('blur', function (e) {
                            try {
                                identifyData = getIdentifyData();

                                if (e.currentTarget.getAttribute('name') === 'email' && e.currentTarget.classList.contains('valid') && window.currentEmail !== e.currentTarget.value) {
                                    console.log('Klaviyo - Fire identify');
                                    window.currentEmail = e.currentTarget.value;
                                    window.isDeplayCallSubmitted = false; // reset delay submit
                                    checkValidEmail(e.currentTarget);
                                }

                                if (e.currentTarget.getAttribute('name') === 'phoneNumber' && window.currentPhone !== e.currentTarget.value) {
                                    window.currentPhone = e.currentTarget.value;
                                    isRecall = false;
                                    window.isDeplayCallSubmitted = false; // reset delay submit

                                    callAPICheckPhone();
                                }
                            } catch (x) {
                                console.log(x);
                            }
                        });
                    });

                    window.pauseCheckoutProcessing = {
                        isPause: true,
                        delay: 500
                    };
                    document.querySelector('body').insertAdjacentHTML('beforeend', '<span class="custom-loading" style="display: none;"></span>');

                    window.ctrwowUtils.events.on('afterSubmitOrder', function (data) {
                        if (data && data.referenceId && data.useCreditCard) {
                            referenceId = data.referenceId;
                            onAfterSubmitOrder();
                        }
                    });
                    window.ctrwowUtils.events.on('declinePayment', function () {
                        if (referenceId) {
                            const declineData = getDeclineInfo();
                            if (declineData) {
                                window._learnq.push(['track', 'decline', declineData]);
                            }
                        }
                    });

                    window.ctrwowUtils.events.on('onAfterActivePopup', function () {
                        try {
                            window.CC_Code = window.ctrwowCheckout.checkoutData.getCouponCode();
                            identifyData = getIdentifyData();
                            if (!isInvalidEmail) {
                                window._learnq.push(['track', 'identify', identifyData]);
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    });

                    window.ctrwowUtils.events.on('beforeSubmitOrder', function () {
                        try {
                            identifyData = getIdentifyData();
                            if (!isInvalidEmail) {
                                window._learnq.push(['track', 'identify', identifyData]);
                            }
                            window.localStorage.setItem('identifyData', JSON.stringify(identifyData));

                            const curItem = window.ctrwowCheckout.checkoutData.getProduct();
                            curItem.campaignName = campaignName;
                            window.localStorage.setItem('prevItem', JSON.stringify(curItem));

                            const checkoutData = getCheckOutData(identifyData);

                            window._learnq.push(['track', 'checkout', checkoutData]);
                        } catch (e) {
                            console.log(e);
                        }
                    });

                    window.localStorage.setItem('location', JSON.stringify(campaignInfo.location)); // Save for Upsell

                    window.ctrwowCheckout.checkoutData.onProductChange(function () {
                        try {
                            var currentItem = window.ctrwowCheckout.checkoutData.getProduct();

                            if (currentItem.productId === checkedItemData.productId) { return; }

                            const getCheckedDataForCart = getItemDataForCart(checkedItemData);
                            const getCurrentDataForCart = getItemDataForCart(currentItem);
                            if (
                                document.querySelector('[name="email"]') &&
                                document.querySelector('[name="email"]').classList.contains('valid')
                            ) {
                                if (!isInvalidEmail) {
                                    window._learnq.push(['track', 'remove_from_cart', getCheckedDataForCart]);
                                    window._learnq.push(['track', 'add_to_cart', getCurrentDataForCart]);
                                }
                            }

                            checkedItemData = window.ctrwowCheckout.checkoutData.getProduct();
                        } catch (e) {
                            console.log(e);
                        }
                    });
                } catch (e) {
                    console.log('Warning: orderPageEvents');
                }
            };

            const init = function () {
                try {
                    if (urlPath.indexOf('/order') > -1 || (window.__CTRWOW_CONFIG && window.__CTRWOW_CONFIG.PAGE_TYPE === 2)) {
                        orderPageEvents();
                        let count = 0;
                        const orderPage = setInterval(() => {
                            count++;
                            if (window.__productListData && window.__productListData.data && window.__productListData.data.productList && window._EA_ID) {
                                orderPageEvents();
                                clearInterval(orderPage);
                            }
                            if (count === 50) { clearInterval(orderPage); }
                        }, 300);
                        return;
                    }

                    var orderInfo = window.localStorage.getItem('orderInfo');
                    var _location = window.localStorage.getItem('location');
                    var _isInvalidEmail = window.localStorage.getItem('isInvalidEmail');
                    var isFiredMainOrderBlueshift = window.localStorage.getItem('isFiredMainOrderBlueshift');
                    var __EA_ID = window._EA_ID || window.localStorage.getItem('_vid');
                    if (!window.localStorage.getItem('referrerUrl')) {
                        window.localStorage.setItem('referrerUrl', document.referrer);
                    }

                    //get purchase data
                    const getPurchasedData = function (orderInfo, upsellInfo) {
                        try {
                            let orderNumber = orderInfo.orderNumber,
                                quantity = window.localStorage.getItem('doubleQuantity') ? Math.ceil(orderInfo.quantity / 2) : orderInfo.quantity,
                                revenue = Number(orderInfo.orderTotalFull),
                                items = [
                                    {
                                        productId: prefix + orderInfo.orderedProducts[0].pid,
                                        sku: orderInfo.orderedProducts[0].sku,
                                        total_usd: orderInfo.orderTotalFull,
                                        quantity: quantity
                                    }
                                ],
                                sku = orderInfo.orderedProducts[0].sku;

                            if (orderInfo.upsellUrls && orderInfo.upsellUrls.length > 0) {
                                for (let i = 0, n = orderInfo.upsellUrls.length; i < n; i++) {
                                    if (orderInfo.upsellUrls[i].isFired === 'fired') {
                                        revenue += orderInfo.upsellUrls[i].price;
                                    }
                                }
                            }

                            if (upsellInfo) {
                                orderNumber = orderInfo.orderNumber;
                                campaignName = upsellInfo.campaignName;
                                items = [
                                    {
                                        productId: prefix + upsellInfo.orderedProducts[0].pid,
                                        sku: upsellInfo.orderedProducts[0].sku,
                                        total_usd: upsellInfo.price,
                                        quantity: upsellInfo.orderedProducts[0].quantity
                                    }
                                ];
                                sku = upsellInfo.orderedProducts[0].sku;
                            }
                            const product_ids = [];
                            for (let i = 0, n = items.length; i < n; i++) {
                                product_ids.push(items[i].productId);
                            }
                            const landingurl = window.location.href;
                            const landingBaseUrl = landingurl.split('?')[0];

                            const checkout_url = localStorage.getItem('ctr_checkout_url') || '';
                            const checkout_base_url = checkout_url.split('?')[0];

                            const data = {
                                order_id: prefix + orderNumber,
                                order_number: orderNumber,
                                first_name: orderInfo.cusFirstName,
                                email: orderInfo.cusEmail || orderInfo.cusEmailPP || '',
                                order_create_date: getCurrentDate(),
                                ip_address: _location.ip || '',
                                customer_language: document.querySelector('html').getAttribute('lang') || '',
                                device_type: getDeviceType(),
                                device_vendor: window.navigator.vendor,
                                campaignname: campaignName,
                                internal_campaignname: campaignName,
                                landingurl: landingurl,
                                landing_base_url: landingBaseUrl,
                                referringurl: document.referrer,
                                parentcampaign: window.localStorage.getItem('mainCampaignName'),
                                product_ids: product_ids,
                                items: items,
                                sku: sku,
                                revenue: revenue.toFixed(2),
                                currency: window.localStorage.getItem('currencyCode'),
                                checkout_url:checkout_url,
                                checkout_base_url:checkout_base_url
                            };

                            if (isClient) {
                                data.client = true;
                            } else {
                                data.client = false;
                                data.internal_lead = true;
                            }

                            
                            return data;
                        } catch (e) {
                            console.log(e);
                            return {};
                        }
                    };

                    if (orderInfo && __EA_ID) {
                        orderInfo = JSON.parse(orderInfo);
                        _location = JSON.parse(_location || '{}');

                        let identifyData = window.localStorage.getItem('identifyData');
                        if (identifyData) {
                            identifyData = JSON.parse(identifyData);
                            window.localStorage.setItem('identifyData', JSON.stringify(identifyData));
                            if (_isInvalidEmail !== 'true') {
                                window._learnq.push(['track', 'identify', identifyData]);
                            }
                        }

                        if (!isFiredMainOrderBlueshift) {
                            console.log('Klaviyo - Fire Purchase');
                            if (orderInfo.upsellUrls && orderInfo.upsellUrls.length > 0) {
                                localStorage.setItem('subOrderNumber', orderInfo.upsellUrls[0].orderNumber);
                            }
                            if (_isInvalidEmail !== 'true') {
                                const purchasedData = getPurchasedData(orderInfo);
                                window._learnq.push(['track', 'purchase', purchasedData]);
                            }
                            window.localStorage.setItem('isFiredMainOrderBlueshift', true);
                        } else if (orderInfo.upsellUrls && orderInfo.upsellUrls.length > 0) {
                            const latestUpsellIndex = orderInfo.upsellUrls.length - 1;
                            const upsellInfo = orderInfo.upsellUrls[latestUpsellIndex];
                            const subOrderNumber = localStorage.getItem('subOrderNumber');
                            if (!orderInfo.upsellUrls[latestUpsellIndex].isFired && orderInfo.upsellUrls[latestUpsellIndex].orderNumber !== subOrderNumber) {
                                orderInfo.upsellUrls[latestUpsellIndex].isFired = 'fired';
                                if (_isInvalidEmail !== 'true') {
                                    window._learnq.push(['track', 'purchase', getPurchasedData(orderInfo, upsellInfo)]);
                                }
                            }
                        }
                        window.localStorage.setItem('orderInfo', JSON.stringify(orderInfo));
                    }

                    window.ctrwowUtils.events.on('onBeforePlaceUpsellOrder', function () {
                        let upsellItem;
                        if (typeof window.upsells === 'object' && window.upsells.length > 0) {
                            upsellItem = window.upsells[window.upsell_productindex || 0];
                        } else {
                            upsellItem = window.ctrwowUpsell.productListData.getProductList().prices[window.upsell_productindex || 0];
                        }
                        upsellItem.campaignName = campaignName;
                        window.localStorage.setItem('prevItem', JSON.stringify(upsellItem));

                        let identifyData = window.localStorage.getItem('identifyData');
                        if (identifyData) {
                            identifyData = JSON.parse(identifyData);
                            const checkoutData = getCheckOutData(identifyData, false, true);
                            window._learnq.push(['track', 'checkout', checkoutData]);
                        }
                    });

                    // Decline page
                    if (urlPath.indexOf('decline') > -1) {
                        const declineData = getDeclineInfo();
                        if (declineData) {
                            window._learnq.push(['track', 'decline', declineData]);
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            };

            const extendValidation = function () {
                try {
                    const invalidPhoneNumberMsg = {
                        en: 'Please enter a international phone number or update your country.',
                        de: 'Bitte geben Sie eine gültige Telefonnummer ein.',
                        fr: 'Veuillez saisir un numéro de téléphone valide.',
                        jp: '有効な電話番号を入力してください。',
                        cn: '请输入有效电话号码。',
                        br: 'Por favor insira um telefone válido.',
                        es: 'Por favor introduzca un número de teléfono válido.',
                        pt: 'Por favor insira um número de telefone válido.'
                    };
                    window.phoneMsg = invalidPhoneNumberMsg.en;
                    if (urlPath.indexOf('/de/') > -1) { window.phoneMsg = invalidPhoneNumberMsg.de; }
                    if (urlPath.indexOf('/fr/') > -1) { window.phoneMsg = invalidPhoneNumberMsg.fr; }
                    if (urlPath.indexOf('/jp/') > -1) { window.phoneMsg = invalidPhoneNumberMsg.jp; }
                    if (urlPath.indexOf('/cn/') > -1) { window.phoneMsg = invalidPhoneNumberMsg.cn; }
                    if (urlPath.indexOf('/br/') > -1) { window.phoneMsg = invalidPhoneNumberMsg.br; }
                    if (urlPath.indexOf('/es/') > -1) { window.phoneMsg = invalidPhoneNumberMsg.es; }
                    if (urlPath.indexOf('/pt/') > -1) { window.phoneMsg = invalidPhoneNumberMsg.pt; }

                    $.validator.addMethod('cphone', function (value, element) {
                        return $(element).hasClass('correct-phone');
                    }, window.phoneMsg);
                } catch (e) {
                    console.log(e);
                }
            };

            init();
            if (getQueryParameter('validPhone') === '1') {
                extendValidation();
            }
        } catch (e) {
            console.log(e);
        }
    }

    /// init google phone lib
    function initGooglePhoneLib(){
        try {
            const script = document.createElement('script');
            script.src = 'INSERT_LIB_PHONE_NUMBER_URL';
            script.defer = true;
            document.body.appendChild(script);
        } catch (error) {
            console.log('init google lib error');
        }
    }

    
    function getClientCode() {
        window.addEventListener('load', function () {
            if (window.__CTRWOW_CONFIG) {
                if (window.__ctrPageConfiguration && window.__ctrPageConfiguration.sourceConfig && window.__ctrPageConfiguration.sourceConfig.source) {
                    execute(window.__ctrPageConfiguration.sourceConfig.source);
                }
            }
        });
    }
    
    getClientCode();
    if (window.__CTRWOW_CONFIG.PAGE_TYPE !== 1){
        initGooglePhoneLib();
    }
})();
