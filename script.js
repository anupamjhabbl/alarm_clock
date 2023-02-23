let main = document.getElementById('main');
let html = main.innerHTML;

let getIn2Digit = k => {
    if (k<10){
        return `0${k}`;
    }
    else{
        return `${k}`;
    }
}


const show = () => {

    const append = (main_box) => {
        let storage = sessionStorage;
        for (let ele in storage){
            let value = sessionStorage.getItem(ele);
            if (value==null){
                break;
            }
            let div = document.createElement('div');
            div.className = 'alarm_element';
            let hours = getIn2Digit(Math.floor(parseInt(value)/100));
            let minutes = getIn2Digit(parseInt(value)%100);
            div.innerHTML = `<p>Alarm set on ${hours}:${minutes}.</p>`;
            main_box.appendChild(div);
        }
        let button = document.createElement('button');
        button.id = 'show_set_alarm';
        button.innerHTML = 'Go back to main';
        main_box.appendChild(button);
    }

    const show_alarms = (e) => {
        main_box = document.getElementById('main');
        main_box.innerHTML = '';
        append(main_box);
    }

    show_alarms();

    let show_set_alarm = document.getElementById('show_set_alarm');
    show_set_alarm.onclick = start;
}




let start =  () => {
    let main = document.getElementById('main');
    main.innerHTML = html;

    let date;
    let audio = document.getElementById('audio');
    audio.style.display = 'none';

    console.clear();

    let setTime = () => {
        date = new Date;
        let time_box = document.getElementById('main_time').firstElementChild;
        let hours = getIn2Digit(date.getHours());
        let minute = getIn2Digit(date.getMinutes());
        let seconds = getIn2Digit(date.getSeconds());
        time_box.innerHTML = `${hours}:${minute}:${seconds}`;
    }

    setInterval(() => {
        setTime();
    }, 1000);

    let set_alarm = (e) => {
        e.target.style.boxShadow= '-2px -2px 1px black';
        setTimeout(()=>{
            e.target.style.boxShadow = '0px 0px 0px black';
        },500);

        let time_in_minute = document.getElementById('time_minutes').value;
        let time_in_time = document.getElementById('time_time').value;
        if (time_in_minute=="" && time_in_time==""){
            alert("Give either the no of minute or give the proper time");
            return ;
        }
        if(time_in_minute!=""){
            let min = date.getMinutes() + parseInt(time_in_minute);
            let hours = date.getHours() + Math.floor(min/60);
            let minutes = getIn2Digit(min%60);
            sessionStorage.setItem(`${hours}${hours+parseInt(minutes)}${minutes}`,`${hours}${minutes}`);
            document.getElementById('time_minutes').value = "";
        }
        if(time_in_time!=""){
            let hours =  time_in_time.substr(0,2);
            let minutes =  time_in_time.substr(3,2);
            sessionStorage.setItem(`${hours}${parseInt(hours)+parseInt(minutes)}${minutes}`,`${hours}${minutes}`);
            document.getElementById('time_time').value = "";
        }
    }

    let alarm_weep = (element) => {
        let time_minutes = date.getMinutes();
        let time_hours = getIn2Digit(date.getHours());
        audio.play();
        setTimeout(()=>{
            let t = confirm("Cancel the alarm");
            while (!t){
                t = confirm("cancel the alarm");
            }
            audio.pause();
            let m = confirm("Do you want to keep this alarm");
            if (m==true){
                setTimeout(()=>{
                    sessionStorage.setItem(element,`${time_hours}${time_minutes}`);
                },60000);
            }
        },3000);
    }

    setInterval(() => {
        let time_now = `${date.getHours()}${getIn2Digit(date.getMinutes())}`;
        let k = sessionStorage;
        for (let element in k){
            let value = sessionStorage.getItem(element);
            if (value==null){
                break;
            }
            if (time_now==value){
                alarm_weep(element);
                sessionStorage.removeItem(element);
            }
        }

    }, 10000);

    let set_alarm_button = document.getElementById('set_alarm_button');
    set_alarm_button.onclick = set_alarm;
    let show_alarm_btn = document.getElementById('show_alarm_button');
    show_alarm_btn.onclick = show;

}
start();


