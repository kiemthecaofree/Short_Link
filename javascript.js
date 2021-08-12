var arrUrl;
const colors = [
    "#00aefd","#ffa400","#07a787", "black", "pink","yellow","#2979ff",
  ];
var loader = document.querySelector("#loader");
var submit = document.querySelector("#btn-submit");
var container = document.querySelector("#container");
var link = document.querySelector("#link");
var phone = document.querySelector("#input_phone");
const proxy = 'https://cors-anywhere.herokuapp.com/';
const key = '4fdf6c320a3413600b4af3a86c0f496a';
var url = "https://go.isclix.com/deep_link/4665406253457732723/5325601808419035241?utm_source";
var apiUrl;
async function RutGonLink(){
    try {
        const response  = await fetch(proxy + apiUrl);
        arrUrl = await response.json();
        hiddenLoad();
        var p_tag = document.createElement('p');
        p_tag.innerHTML =  `Bạn vui lòng tải ứng dụng Cake : <a href=${arrUrl.url.shortLink} target = '_blank'><u>Tại Đây</u></a>
        <br> <b style = 'margin-top: 30px; display : inline-block; color: ${colors[Math.floor(Math.random()*colors.length)]}'>Số điện thoại nhận thưởng: <u>${phone.value}</u></b>`;
        link.appendChild(p_tag);

    } catch (error) {
        console.log("Lỗi....."+error);
    }
}

var hiddenLoad = () =>{
    loader.setAttribute('style', 'opacity:0; display: none');
    container.setAttribute('style','opacity : 1')
}
var showLoad = () =>{
    loader.setAttribute('style', 'opacity: 1');
    container.setAttribute('style','opacity : 0')
}

var checkPhone = () =>
{
    var vnf_regex =/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
    return vnf_regex.test(phone.value);
}

var Loading = () =>{
    link.innerHTML = "";
    showLoad();
    if(phone.value.length < 10 || phone.value.length > 11 || !Number(phone.value) || !checkPhone())
    {
        var p_tag = document.createElement('p');
        p_tag.innerHTML =  `Số điện thoại không đúng định dạng, vui lòng nhập lại`;
        p_tag.setAttribute('style', `color:${colors[Math.floor(Math.random()*colors.length)]}`)
        link.appendChild(p_tag);
        hiddenLoad();
        return;
    }
    else
    {
        apiUrl = `https://cutt.ly/api/api.php?key=${key}&short=${url}=${phone.value}%26url=https%3A%2F%2Fcom.mbmobile`
        RutGonLink();
    }
}
hiddenLoad();
submit.addEventListener('click', () => Loading());
