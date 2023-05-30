const fr= {

    momo:{
        title: "Confirmez !",
        content: "Confirmez votre transaction mobile money en tapant *126#"
    },
    eu:{
        title: "Confirmez !",
        content: "Confirmez votre transaction Express Union sur votre application mobile EU app"
    },
    bitcoin:{
        title: "Procédez à la transaction",
        content: "Vous pouvez transférer sur ce portefeuille",
        total: "Montant à transferez :"
    },
    om: {
        title: "Info!",
        content: "Recevez votre code OTP orange money en tapant #150*44#"
    }
}
const en= {

    momo:{
        title: "Confirm !",
        content: "Confirm your mobile money's transaction by typing *126#"
    },
    eu:{
        title: "Confirm !",
        content: "Confirm your Express Union transaction on your mobile app EU"
    },
    bitcoin:{
        title: "Proceed To Transaction",
        content: "Please make transfert on this wallet",
        total: "Amount to transfert :"
    },
    om: {
        title: "Info!",
        content: "Received yout OTP orange money code by typing #150*44#"
    }
}


//Tip
function tip({elem, onSuccess, onFail, successUrl, currency, description, ref}) {
        const services = ["#momo", "#eu", "#om", "#bitcoin", "#paypal", "#pm"]
        const amount = $(`${elem}_amount`).val()
        const wallet = $(`${elem}_wallet`).val()
        const service = $(`${elem}_service`).val()
        const otp = $(`${elem}_otp`).val()
        const url = `https://soleaspay.com/api/agent/bills?refQr=${ref}`
        switch (elem) {
            case '#om':
                $("#loader").show()
                $.ajax({
                    type: "POST",
                    beforeSend: function (request){
                    },
                    url: url,
                    dataType : 'JSON',
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": `${apiKey}`,
                        "operation": "2",
                        "service": `${service}`,
                        "otp": `${otp}`
                    },
                    data: JSON.stringify({ amount: amount, wallet: wallet, currency: currency, description })
                })
                .done(function (res){
                    if(res.success){
                        onSuccess(res)
                    }else{
                        onFail(res)
                    }
                })
                .fail((err)=>console.error(err))
                .always(function () {
                    $("#loader").hide()
                })
                break;
            case '#momo':
                $("#loader").show()
                //Alert user to confirm on his mobile phone
                $.confirm({
                    title: lang.momo.title,
                    content: lang.momo.content,
                    buttons: {
                        confirm: function () {
                            //$("#loader").show()
                        },
                        cancel: function () {
                            $.alert('Canceled!');
                        },
                    }
                });
                $.ajax({
                    type: "POST",
                    beforeSend: function (request){
                    },
                    url: url,
                    dataType : 'JSON',
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": `${apiKey}`,
                        "operation": "2",
                        "service": `${service}`,
                        "otp": `${otp}`
                    },
                    data: JSON.stringify({ amount: amount, wallet: wallet, currency: currency, description })
                })
                .done(function(res){
                    if(res.success){
                        onSuccess(res)
                    }else{
                        onFail(res)
                    }
                })
                .fail((err)=>console.error(err))
                .always(function () {
                    $("#loader").hide()
                })
                break;
                case '#eu':
                    $("#loader").show()
                    //Alert user to confirm on his mobile phone
                    $.confirm({
                        title: lang.eu.title,
                        content: lang.eu.content,
                        buttons: {
                            confirm: function () {
                                //$("#loader").show()
                            },
                            cancel: function () {
                                $.alert('Canceled!');
                            },
                        }
                    });
                    $.ajax({
                        type: "POST",
                        beforeSend: function (request){
                        },
                        url: url,
                        dataType : 'JSON',
                        headers: {
                            "Content-Type": "application/json",
                            "x-api-key": `${apiKey}`,
                            "operation": "2",
                            "service": `${service}`,
                            "otp": `${otp}`
                        },
                        data: JSON.stringify({ amount, wallet, currency, description })
                    })
                    .done(function (res){
                        if(res.success){
                            onSuccess(res)
                        }else{
                            onFail(res)
                        }
                    })
                    .fail((err)=>console.error(err))
                    .always(function () {
                        $("#loader").hide()
                    })
                    break;
                    case '#bitcoin':
                        $("#loader").show()
                    $.ajax({
                        type: "POST",
                        beforeSend: function (request){
                        },
                        url: url,
                        dataType : 'JSON',
                        headers: {
                            "Content-Type": "application/json",
                            "x-api-key": `${apiKey}`,
                            "operation": "2",
                            "service": `${service}`,
                        },
                        data: JSON.stringify({ amount, currency, description})
                    })
                    .done(function (res){
                        if(res.success){
                            $.alert({
                                title: lang.bitcoin.title,
                                content: `${lang.bitcoin.title}. <br>
                                        
                                        <div class="alert alert-secondary" role="alert">
                                        <div id="qrcode"></div>
                                        <input type="text" value="${res.data.wallet}" disabled id="myInput">
                                            <input type="button" value="Copy wallet" class="btn btn-default" onclick="copyToClipboard(); this.value='Copied!'">
                                        </div>
                                           <br> ${lang.bitcoin.total} : <b>${res.data.value} BTC</b>`,
                                
                            });
                            onSuccess(res)
                        }else{
                            onFail(res)
                        }                 //Alert user to confirm on his mobile phone
                       
                    })
                    .fail((err)=>console.error(err))
                    .always(function () {
                        $("#loader").hide()
                    })
                        break;
                    case '#paypal':
                        $("#loader").show()
                        $.ajax({
                            type: "POST",
                            beforeSend: function (request){
                            },
                            url: url,
                            dataType : 'JSON',
                            headers: {
                                "Content-Type": "application/json",
                                "x-api-key": `${apiKey}`,
                                "operation": "2",
                                "service": "4",
                                "otp": `${data.orderID}`
                            },
                            data: JSON.stringify({ amount, currency, description})
                        })
                        .done(function (res){
                            if(res.success){
                                $.alert({ title: 'Success!', content:'Transaction succeed '+ details.payer.name.given_name + ' amount : ' + data['amount']});
                                onSuccess(res)
                            }else{
                                onFail(res)
                            }                 //Alert user to confirm on his mobile phone
                           
                        })
                        .fail((err)=>console.error(err))
                        .always(function () {
                            $("#loader").hide()
                        })
                        
                        break;
                        case '#pm':
                            $("#loader").show()
                            $.ajax({
                                type: "POST",
                                beforeSend: function (request){
                                },
                                url: url,
                                dataType : 'JSON',
                                headers: {
                                    "Content-Type": "application/json",
                                    "x-api-key": `${apiKey}`,
                                    "operation": "2",
                                    "service": `${service}`,

                                },
                                data: JSON.stringify({ amount, currency, description})
                            })
                            .done(function (res){
                                if(res.success){
                                    window.open(`https://soleaspay.com/pm/pay.html?amount=${amount}&ref=${res.data.payId}&successUrl=${successUrl}`, 'newwindow', 'width=900, height=800');
                                    onSuccess(res)
                                }else{
                                    onFail(res)
                                }                 //Alert user to confirm on his mobile phone
                               
                            })
                            .fail((err)=>console.error(err))
                            .always(function () {
                                $("#loader").hide()
                            })
                            break;
            default:
                break;
    
        }
}
//Bill
function bill({elem, amount, onSuccess, onFail, successUrl, currency, description, ref}) {
    const services = ["#momo", "#eu", "#om", "#bitcoin", "#paypal", "#pm"]
    const wallet = $(`${elem}_wallet`).val()
    const service = $(`${elem}_service`).val()
    const otp = $(`${elem}_otp`).val()
    const url = `https://soleaspay.com/api/agent/bills?refQr=${ref}`
        switch (elem) {
            case '#om':
                $("#loader").show()
                $.ajax({
                    type: "POST",
                    beforeSend: function (request){
                    },
                    url: url,
                    dataType : 'JSON',
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": `${apiKey}`,
                        "operation": "2",
                        "service": `${service}`,
                        "otp": `${otp}`
                    },
                    data: JSON.stringify({ amount, wallet, currency, description })
                })
                .done(function (res){
                    if(res.success==true){
                        onSuccess(res)
                    }else{
                        onFail(res)
                    }
                })
                .fail((err)=>console.error(err))
                .always(function () {
                    $("#loader").hide()
                })
                break;
            case '#momo':
                $("#loader").show()
                //Alert user to confirm on his mobile phone
                $.confirm({
                    title: lang.momo.title,
                    content: lang.momo.content,
                    buttons: {
                        confirm: function () {
                            //$("#loader").show()
                        },
                        cancel: function () {
                            $.alert('Canceled!');
                        },
                    }
                });
                $.ajax({
                    type: "POST",
                    beforeSend: function (request){
                    },
                    url: url,
                    dataType : 'JSON',
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": `${apiKey}`,
                        "operation": "2",
                        "service": `${service}`,
                        "otp": `${otp}`
                    },
                    data: JSON.stringify({ amount, wallet, currency, description })
                })
                .done(function(res){
                    if(res.success){
                        onSuccess(res)
                    }else{
                        onFail(res)
                    }
                })
                .fail((err)=>console.error(err))
                .always(function (data) {
                    $("#loader").hide()
                })
                break;
                case '#eu':
                    $("#loader").show()
                    //Alert user to confirm on his mobile phone
                    $.confirm({
                        title: lang.eu.title,
                        content: lang.eu.content,
                        buttons: {
                            confirm: function () {
                                //$("#loader").show()
                            },
                            cancel: function () {
                                $.alert('Canceled!');
                            },
                        }
                    });
                    $.ajax({
                        type: "POST",
                        beforeSend: function (request){
                        },
                        url: url,
                        dataType : 'JSON',
                        headers: {
                            "Content-Type": "application/json",
                            "x-api-key": `${apiKey}`,
                            "operation": "2",
                            "service": `${service}`,
                            "otp": `${otp}`
                        },
                        data: JSON.stringify({ amount, wallet, currency, description })
                    })
                    .done(function (res){
                        if(res.success){
                            onSuccess(res)
                        }else{
                            onFail(res)
                        }
                    })
                    .fail((err)=>console.error(err))
                    .always(function () {
                        $("#loader").hide()
                    })
                    break;
                    case '#bitcoin':
                        $("#loader").show()
                    $.ajax({
                        type: "POST",
                        beforeSend: function (request){
                        },
                        url: url,
                        dataType : 'JSON',
                        headers: {
                            "Content-Type": "application/json",
                            "x-api-key": `${apiKey}`,
                            "operation": "2",
                            "service": `${service}`,
                        },
                        data: JSON.stringify({ amount, currency, description})
                    })
                    .done(function (res){
                        if(res.success){
                            $.alert({
                                title: lang.bitcoin.title,
                                content: `${lang.bitcoin.content}. <br>
                                        
                                        <div class="alert alert-secondary" role="alert">
                                        <div id="qrcode"></div>
                                        <input type="text" value="${res.data.wallet}" disabled id="myInput">
                                            <input type="button" value="Copy wallet" class="btn btn-default" onclick="copyToClipboard(); this.value='Copied!'">
                                        </div>
                                           <br> ${lang.bitcoin.total} : <b>${res.data.value} BTC</b>`,
                                
                            });
                            onSuccess(res)
                        }else{
                            onFail(res)
                        }                 //Alert user to confirm on his mobile phone
                       
                    })
                    .fail((err)=>console.error(err))
                    .always(function () {
                        $("#loader").hide()
                    })
                        break;
                    case '#paypal':
                        $("#loader").show()
                        $.ajax({
                            type: "POST",
                            beforeSend: function (request){
                            },
                            url: url,
                            dataType : 'JSON',
                            headers: {
                                "Content-Type": "application/json",
                                "x-api-key": `${apiKey}`,
                                "operation": "2",
                                "service": "4",
                                "otp": `${data.orderID}`
                            },
                            data: JSON.stringify({ amount: amount, currency: currency})
                        })
                        .done(function (res){
                            if(res.success==true){
                                $.alert({ title: 'Success!', content:'Transaction succeed '+ details.payer.name.given_name + ' amount : ' + data['amount']});
                                onSuccess(res)
                            }else{
                                onFail(res)
                            }                 //Alert user to confirm on his mobile phone
                           
                        })
                        .fail((err)=>console.error(err))
                        .always(function () {
                            $("#loader").hide()
                        })
                        
                        break;
                        case '#pm':
                            $("#loader").show()
                            $.ajax({
                                type: "POST",
                                beforeSend: function (request){
                                },
                                url: url,
                                dataType : 'JSON',
                                headers: {
                                    "Content-Type": "application/json",
                                    "x-api-key": `${apiKey}`,
                                    "operation": "2",
                                    "service": `${service}`,

                                },
                                data: JSON.stringify({ amount: amount, currency: currency})
                            })
                            .done(function (res){
                                if(res.success){
                                    window.open(`https://soleaspay.com/pm/pay.html?amount=${amount}&ref=${res.data.payId}&successUrl=${successUrl}`, 'newwindow', 'width=900, height=800');
                                    onSuccess(res)
                                }else{
                                    onFail(res)
                                }                 //Alert user to confirm on his mobile phone
                               
                            })
                            .fail((err)=>console.error(err))
                            .always(function () {
                                $("#loader").hide()
                            })
                            break;
            default:
                break;
        }
        
        
    
    
}


//Plugin
const SopayButton = {
    billing: function({amount, description, currency, onSuccess, onFail, successUrl, ref}){
        
        $( "#sopayButton" ).load(`sopaybuttonBill${language == 'fr'? 'fr':'en'}.html`, function () {
                //Orange Money
                $("#om_form").submit(function(e) {
                e.preventDefault();
                bill({ elem:"#om", amount: amount, onSuccess: onSuccess, onFail: onFail, currency: currency, description: description, ref: ref})
                });
                //Mobile money
                $("#momo_form").submit(function(e) {
                    e.preventDefault();
                    bill({elem: "#momo", amount: amount, onSuccess: onSuccess, onFail: onFail, currency: currency, description: description, ref: ref})
                   
                });
                
                
                //Express Union 
                $("#eu_form").submit(function(e) {
                    e.preventDefault();
                    bill({ elem:"#eu", amount: amount, onSuccess: onSuccess, onFail: onFail, currency: currency, description: description, ref: ref})
                });
                //Bitcoin
                
                $("#bitcoin_form").submit(function(e) {
                    e.preventDefault();
                    bill({ elem: "#bitcoin", amount: amount, onSuccess: onSuccess, onFail: onFail, currency: currency, description: description, ref: ref})
                });

                //Perfect money
                
                $("#pm_form").submit(function(e) {
                    e.preventDefault();
                    bill({elem: "#pm", amount: amount, onSuccess: onSuccess, onFail: onFail, successUrl:successUrl, currency: currency, description: description, ref: ref})
                });

                $("#detail_amount").html(`${amount} ${currency}`)
                $("#detail_description").html(`${description}`)
        } );
        
    },
    tiping: function ({onSuccess, onFail, successUrl, currency, description, ref}){
        $("#sopayButton").load(`sopaybuttonTip${language == 'fr'? 'fr':'en'}.html`,function(){
            //Orange Money
            $("#om_form").submit(function(e) {
            e.preventDefault();
            tip({ elem: "#om", onSuccess: onSuccess, onFail: onFail, currency: currency, description: description})
            });
            //Mobile money
            $("#momo_form").submit(function(e) {
                e.preventDefault();
                tip({elem: "#momo", onSuccess: onSuccess, onFail: onFail, currency: currency, description: description})
            });

            
           
            //Express Union 
            $("#eu_form").submit(function(e) {
                e.preventDefault();
                tip({elem:"#eu", onSuccess: onSuccess, onFail: onFail, currency: currency, description: description})
            });
            //Bitcoin
            $("#bitcoin_form").submit(function(e) {
                e.preventDefault();
                tip({ elem:"#bitcoin", onSuccess: onSuccess, onFail: onFail, currency: currency, description: description})
            });

            //Perfect money
            $("#pm_form").submit(function(e) {
                e.preventDefault();
                tip({elem: "#pm", amount: amount, onSuccess: onSuccess, onFail: onFail, successUrl: successUrl, currency: currency, description: description})
            });
            $("#detail_amount").html(`${currency}`)
            $("#detail_description").html(`${description}`)
        })
        
    }
}

//Utils
function copyToClipboard() {
    /* Get the text field */
    var copyText = document.getElementById("myInput");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
  
}

function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}
//main logic
const params = parseURLParams(window.location.search);
const apiKey = atob(params['k'][0]);
const mode = atob(params['m'][0]);
const description = atob(params['d'][0]);
const amount = atob(params['a'][0]);
const currency = atob(params['c'][0]);
const language = atob(params['l'][0]);
const shop = atob(params['s'][0]);
const ref = atob(params['q'][0]);
const onSuccess = (res)=>{if(res.success==true){window.location.href= `https://soleaspay.com/qr/pay/success.html`}};
const onFail = (res)=>{ alert(res.message)};
const successUrl = "https://soleaspay.com/qr/pay/success.html";
const lang = language.toLowerCase() =='fr'?fr:en
const methods  = {
    amount, // Amount to pay by the user for billing mode
    onSuccess, //callback function if done
    onFail, //callback function if fail
    successUrl, //Url where redirected after process finish. only for perfect money
    currency, // Currency use in your website 
    description, // Payment description
    ref
}

$(".merchant_name").html(shop);


if(mode=='t'){
    SopayButton.tiping(methods)
}
if(mode=='b'){
    SopayButton.billing(methods)
}
