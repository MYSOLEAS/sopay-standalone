$("#makePayment").click(function(e){
    e.preventDefault()
    const host = 'https://soleaspay.com/qr/pay/sb.html';
    const shop = btoa($("#s").val())
    const lang = btoa($("#l").val());
    const amount = btoa($('#a').val());
    const description = btoa($('#d').val());
    const mode = btoa($('#m').val());
    const currency = btoa($('#c').val());
    const apiKey = btoa($('#k').val());
    const qrCount = parseInt($('#qrCount').val());
    if (qrCount > 147) alert("Vous ne pouvez generer que 147 QR Code.")
    if(lang && amount && mode && currency && apiKey && qrCount < 148){
        let qrData = []
        let refs =[]
        $('#qrcode').html('');
        if(qrCount < 2){
            refs[0] = makeid(8);
            const link = 'https://soleaspay.com/'+refs[0];
            const url = `${host}?l=${lang}&a=${amount}&d=${description}&m=${mode}&c=${currency}&k=${apiKey}&s=${shop}&q=${btoa(refs[0])}`;
            qrData.push({'ref': refs[0], 'link': url});
            new QRCode(document.getElementById('qrcode'),link);
            $.ajax({
                type: "POST",
                beforeSend: function(request){
                },
                url: `https://soleaspay.com/api/agent/qr/add`,
                dataType : 'JSON',
                headers: {
                  "Content-Type": "application/json",
                  "x-api-key": `${$('#k').val()}`,
            },
            data: JSON.stringify({ data: qrData })
            })
            .done(function (res){
                console.log(res)
            })
            .fail(function(err){
              console.log(err)
            })   
        
        }else{
          for(let index = 0; index < qrCount; index++) {
            refs[index] = makeid(8)
            const link = 'https://soleaspay.com/'+refs[index];
            const url = `${host}?l=${lang}&a=${amount}&d=${description}&m=${mode}&c=${currency}&k=${apiKey}&s=${shop}&q=${btoa(refs[index])}`;
            qrData.push({'ref': refs[index], 'link': url});
            $('#qrcode').append(
            $('<div>').prop({
                id: refs[index],
                style: "padding: 5px;",
                className: 'qrContainer'
            })
          );
            new QRCode(document.getElementById(`${refs[index]}`), link);
        }
        // Send ref to backend
        $.ajax({
          type: "POST",
          beforeSend: function (request){
          },
          url: `https://soleaspay.com/api/agent/qr/add`,
          dataType : 'JSON',
          headers: {
              "Content-Type": "application/json",
              "x-api-key": `${$('#k').val()}`,
          },
          data: JSON.stringify({ data: qrData })
      })
      .done(function (res){
         alert("Done")
         console.log(res)
         generatePDF()
      })
      .fail((err)=>{
        console.error(err)
        alert("Fail")
      })
        
      }
      
    }else{
      alert("SVP Remplissez tous les champs marqués du symbole (*)")
    }  
  })

  $("#editOrder").click(function(){
    const img = document.querySelector('#qrcode > img');
    // Must use FileSaver.js 2.0.2 because 2.0.3 has issues.

        let imagePath = img.getAttribute('src');
        let fileName = getFileName(imagePath);
        saveAs(imagePath, fileName);
    
    function getFileName(str) {
        return str.substring(str.lastIndexOf('/') + 1)
    }
  })
  $("#m").on('change', function(){
    if($("#m").val() == 't'){
      $("label[for=a]").hide(500)
      $("label[for=qrCount]").hide(500)
      $("#a").val(0)
      $("#a").removeAttr("required")
      $("#a").hide(500)
      $("#qrCount").val(1)
      $("#qrCount").hide(500)
    }else{
      $("label[for=a]").show(500)
      $("label[for=qrCount]").show(500)
      $("#a").val('')
      $("#a").attr("required","required")
      $("#a").show(500)
      $("#qrCount").show(500)
    }
  })

function makeid(length) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i+=1 ) {
      result += characters.charAt(Math.floor(Math.random() * 
  charactersLength));
   }
   return result;
  }

  function generatePDF() {
    // Choose the element that our invoice is rendered in.
    const element = document.getElementById('qrcode');
    // Choose the element and save the PDF for our user.
    var opt = {
      margin:       0,
      filename:     `${$("#s").val()}_qrcode.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
      pagebreak: { mode: 'avoid-all',}
    };
    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();
  }