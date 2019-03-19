/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// <![CDATA[
//function ChangeInput()
//{


function encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
 
        for (var n = 0; n < string.length; n++) {
 
            var c = string.charCodeAt(n);
 
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
 
        }
 
        return utftext;
    }
 function decode(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
 
        while ( i < utftext.length ) {
 
            c = utftext.charCodeAt(i);
 
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
 
        }
 
        return string;
    }

function open_modal(name_id_Modal) { //Скелет модального окна
    //console.log(cfg_data); 
    var modal = document.getElementById(name_id_Modal);
    
    // удаление всех дочерних узлов с формы
    var container = document.getElementById(name_id_Modal);
    while (container.firstChild) {
    container.removeChild(container.firstChild);
    }
//<-- Modal content -->
    var modal_content = document.createElement('div');   
    modal_content.id = 'modal-content';
    modal_content.className = 'modal-content';
    document.getElementById(name_id_Modal).appendChild(modal_content);
//----------------------------------------------------------------------------   
//<-- Modal content -> Modal header -->
    var modal_header = document.createElement('div');
    modal_header.id = 'modal-header';
    modal_header.className = 'modal-header';
    //modal_header.innerHTML = '<h2>Modal Header</h2>';
    document.getElementById('modal-content').appendChild(modal_header);

//<-- Modal content -> Modal body -->       
    var modal_body = document.createElement('div');
    modal_body.id = 'modal-body';
    modal_body.className = 'modal-body';
    //modal_body.innerHTML = '<h4>Modal Content</h4>';
    document.getElementById('modal-content').appendChild(modal_body);  

//<-- Modal content -> Modal footer -->
    var modal_footer = document.createElement('div');
    modal_footer.id = 'modal-footer';
    modal_footer.className = 'modal-footer';
    //modal_footer.innerHTML = '<h3>Modal Footer</h3>';
    document.getElementById('modal-content').appendChild(modal_footer);
    
    modal.style.display = "block";
    
    window.onclick = function(event) {
        if (event.target == modal) {
         modal.style.display = "none";
        // удаление всех дочерних узлов с формы
        while (modal.firstChild) {
        modal.removeChild(modal.firstChild);
        }    
        }
    }
    
}


function name_file(file_extension) { //создаем уникально имя дата_время.расширение
        var Data = new Date();
        var i_Date= Data.toISOString()
        i_Date=i_Date.replace('-', '');
        i_Date=i_Date.replace('-', '');
        i_Date=i_Date.replace('T', '_');
        i_Date=i_Date.replace(':', '');
        i_Date=i_Date.replace(':', '');
        i_Date=i_Date.substring(0,i_Date.indexOf("."))
        i_Date=i_Date+file_extension;
        return i_Date
        //console.log(i_Date);
}

function read(file){  //чтение файла
    return new Promise(function(resolve, reject){
        var reader = new FileReader();//Далее создается объект FileReader для обработки файла
        reader.onload = function(event) { //чтобы получить данные, сначала нужно обработать событие onload:
        console.log("Just read", file.name);
        resolve(event.target.result); 
        };
        reader.onerror = function(err) {
        console.error("Файл не может быть прочитан! код ", file.name);
        reject(err);        
        };
        reader.readAsText(file, 'CP1251'); //Файл находится в кодировке Windows-1251
    });
}
//'ISO-8859-1'
//'CP1251'


   var cfg_info;    // Создадим массив cfg_info[i][j] для хранения информации
   cfg_info = new Array();
//  for (var i = 0; i < 10; i++) {
//       cfg_info[i] = new Array(10);
//    }

   var cfg_data;   // Создадим массив cfg_data[i][j] для хранения информации
   cfg_data = new Array(); 

   var dat_data;    // Создадим массив dat_data[i][j] для хранения информации
   dat_data = new Array(); 

//----------------------------------------------------- Раздел 1. Открываем  *.cfg

function readFile_cfg(object) {
    var file = object.files[0] 
    var info_output = [];
    info_output.push('Файл: ','<strong>', file.name, '</strong><br>',
    'Размер: ', file.size, ' байт <br>', 
    'Изменен: ', file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a'   );
    document.getElementById('list_cfg').innerHTML= '<ul>' + info_output.join('') + '</ul>';
};  
//----------------------------------------------------- Окончание раздела 1.
//
//
//----------------------------------------------------- Раздел 2. Открываем  *.dat
function readFile_dat(object_cfg, object_dat) {
            //var file = object.files[0] //первый файл из коллекции файлов, предоставленных элементом <input>
var file_cfg = object_cfg.files[0]; //первый файл из коллекции файлов, предоставленных элементом <input>
var file_dat = object_dat.files[0]; //первый файл из коллекции файлов, предоставленных элементом <input>
    
    i_file_dat= file_dat.name.split('.');
    i_file_cfg= file_cfg.name.split('.');
   
    
    if (i_file_dat[0]==i_file_cfg[0]) {
       console.log(i_file_dat[0]) 
       console.log(i_file_cfg[0]) 
        var info_output = [];
        info_output.push('Файл: ','<strong>', file_dat.name, '</strong><br>',
        'Размер: ', file_dat.size, ' байт <br>', 
        'Изменен: ', file_dat.lastModifiedDate ? file_dat.lastModifiedDate.toLocaleDateString() : 'n/a'   );
        document.getElementById('list_dat').innerHTML= '<ul>' + info_output.join('') + '</ul>'; 
        
        
        readFile(document.getElementById('file_cfg'), document.getElementById('file_dat'));
    }
    else  {
        alert( "Вы выбрали неправильный файл данных" );
    }    

}
//----------------------------------------------------- Окончание раздела 2.
//
//
//----------------------------------------------------- Раздел 3. НЕнужное 3 действие
function readFile(object_cfg, object_dat) {
//формируем доступ к dat файлу.меняем имя файла (а не данные)
//console.log(document.getElementsByTagName("input")[0].value)
//console.log(document.getElementById("file").files[0].name)
var file_cfg = object_cfg.files[0]; //первый файл из коллекции файлов, предоставленных элементом <input>
var file_dat = object_dat.files[0]; //первый файл из коллекции файлов, предоставленных элементом <input>
//console.log(file_cfg);
//console.log(file_dat);Naomi 'SexyCyborg' Wu
//https://chaturbate.eu/female-cams/  
//  callback(5);
// http://www.angel-live.com/en/main.php
// https://www.chatpia.jp/main.php
//https://xn--n8jycgu1ezdtb.biz/
//http://www.sakuralive.com/index.php


//https://vk.com/topic-5880263_33168139
//https://vk.com/club20367356
//https://vk.com/club65470695
//bongacam
//https://www.chaturbate.ch/
//.https://vk.com/public177076183
//https://vk.com/vapas

read(file_cfg)// Алгоритм обработки *.cfg файла  
.then(function(){
    
   var contents = event.target.result.split('\n');

   var kk=0; 
   for (var i = 0; i < 10; i++) {
       cfg_info[i] = new Array(10);
   }
   
   for (var i=0; i<contents.length; i++){
  
    if (i == 0) { // Информация о присоединении
        var u_informer = contents[i].split(',');
        for (j=0; j<=u_informer.length; j++){
            cfg_info[i][j]=u_informer[j];
            //console.log(cfg_info[i][j]);  
        }      
    }

    if (i == 1) { // Информация о количестве аналоговых и дискретных сигналов
        var u_informer = contents[i].split(',');
        for (j=0; j<=u_informer.length; j++){
            cfg_info[i][j]=u_informer[j];
            //console.log(cfg_info[i][j]);  
        }     
    var num_sign=Number(cfg_info[1][0]);  //количество аналоговых и дискретных сигналов 
    //console.log(Number(num_sign)+1);  
    }
    
    if ((i >= num_sign+2)&&(i < num_sign+9)) { // Информация о дате и другая инфа
        var u_informer = contents[i].split(',');
        for (j=0; j<=u_informer.length; j++){
            cfg_info[2+kk][j]=u_informer[j];
            //console.log(cfg_info);  
        }     
    kk++;
    //console.log(cfg_info); 
    }
   }
   
   var pp=0; 
   
   for (var i = 0; i < num_sign; i++) {
       cfg_data[i] = new Array();
   }
   
   for (var i=0; i<contents.length; i++){
    if ((i >= 2)&&(i < num_sign+2)) { // Информация об аналоговых и дискретных сигналах
        var u_informer = contents[i].split(',');
        for (j=0; j<=u_informer.length; j++){
            
            cfg_data[pp][j]=u_informer[j];
            
            if (j==1){
                        //cfg_data[pp][j]=encode(u_informer[j]);//Название 
            }
            
        }     
    pp++;
    }
   }

//----------------------- переводим параметры под один коэффициент 'V' и 'A'
//    0     1      2     3     4    5   6   7       8     9     10             11    12     
//%  |An|,|ch_id|,|ph|,|ccbm|,|uu|,|a|,|b|,|skew|,|min|,|max|,|primary|,|secondary|,|PS|

 for (var k=0; k<cfg_data.length;k++){
               
        if (cfg_data[k][4] == 'kV'){
            cfg_data[k][4] = 'V';
            cfg_data[k][5]=Number(cfg_data[k][5])*1000;
            cfg_data[k][6]=Number(cfg_data[k][6])*1000;
        }
                    
        if (cfg_data[k][4] == 'kA'){
            cfg_data[k][4] = 'A';
            cfg_data[k][5]=Number(cfg_data[k][5])*1000;
            cfg_data[k][6]=Number(cfg_data[k][6])*1000;
        }
}





})






read(file_dat)// Алгоритм обработки *.dat файла 
.then(function(){
     
  var contents = event.target.result.split('\n');
  var num_sign=Number(cfg_info[1][0]);  //количество аналоговых и дискретных сигналов 
  // console.log(num_sign); 


console.log(cfg_info[5][1]);

var u_date = cfg_info[5][1].split(':');
var u_seconds=u_date[2].split('.');
var i_Milliseconds=u_seconds[1];

//var newDate = new Date(0);
//newDate.setHours(Number(u_date[0]));
//newDate.setMinutes(Number(u_date[1]));
//newDate.setSeconds(Number(u_date[2]));
//newDate.setSeconds(Number(u_seconds[0]));
//newDate.setMilliseconds(0);
//милисекунды обнулить, а потом прибавлять в цикле. Проблема в том, что js не знает микросекунды.

////.slice(0, 3);

//console.log(newDate);
//console.log(newDate.getHours() + ':' +newDate.getMinutes()+':'+newDate.getSeconds()+'.'+newDate.getMilliseconds());

  for (var i=0; i<contents.length; i++){
    
    if (contents[i].trim() != ''){

    var u_informer = contents[i].split(',');
    dat_data[i] = new Array(num_sign);      
    for (var j=0; j<u_informer.length; j++){
        
    
        if (j == 0) { //% Номер измерения
            dat_data[i][j]=Number(u_informer[j]);
        }

        if (j == 1) { //% Время в секундах
            var newDate = new Date(0);
            newDate.setHours(Number(u_date[0]));
            newDate.setMinutes(Number(u_date[1]));    
            newDate.setSeconds(Number(u_seconds[0]));
            var isumm_Milliseconds= Number(i_Milliseconds)+Number(u_informer[j]);
            newDate.setMilliseconds(Math.floor(isumm_Milliseconds/1000));
            
            var i_result_Milliseconds=(isumm_Milliseconds-Math.floor(isumm_Milliseconds/1000000)*1000000)/1000000;
            var String_result_Milliseconds = String(i_result_Milliseconds).split('.');
            
            // YYYY-MM-DDThh:mm:ss.sss  //Для разделения даты и времени используется символ T
            dat_data[i][j]=newDate.getHours() + ':' +newDate.getMinutes()+':'+newDate.getSeconds()+'.'+String_result_Milliseconds[1];
            dat_data[i][j+1]=Number(u_informer[j])*1/1000*1/1000;
        }
    
        if (j >= 2) {  // j - стобец в dat_data, но j - строчка в cfg_data
             //cfg_data:  |An|,|ch_id|,|ph|,|ccbm|,|uu|,|a|,|b|,|skew|,|min|,|max|,|primary|,|secondary|,|PS|
             //Аналоговый сигнал определяется формулой: a*X+b
            dat_data[i][j+1]=Number(u_informer[j])*Number(cfg_data[j-2][5])+Number(cfg_data[j-2][6]);
            
        }
    }
  }}
})


//----------------------------------- 
//  var reader_cfg = new FileReader()//Далее создается объект FileReader для обработки файла
//  var reader_dat = new FileReader()//Далее создается объект FileReader для обработки файла


//  reader_dat.onerror = function(event) {
//    console.error("Файл не может быть прочитан! код " + event.target.error.code);
//  };
//-----------------------------------  cfg



//-----------------------------------  dat

//  reader_dat.onload = function() { //чтобы получить данные, сначала нужно обработать событие onload:
 //   var contents = event.target.result;
 //   // Разбиваем строку на элементы, разделителем служит исмвол перевода строки \n
 //   content_dat = contents.split('\n');
//    if (content_dat.length==0){
 //   console.log('Ошибка чтения. В файле отсутствует разбивка по строке')};    
 //   for (var i = 0; i < content_dat.length; i++) {
    //строчка 0 - описание    
   
//    }
   // console.log(content_dat); 
   // document.getElementById('out').innerHTML = array;
//    console.log('1');    
//   return content_dat;

//  };

//----------------------------------- 
//var content_cfg;
//var content_dat;

 
  //reader_dat.readAsText(file_dat,'UTF-8'); 
  
  //content_cfg=new_readFile(file_cfg);
  //content_dat= new_readFile(file_dat);    
          
// console.log(content_dat); 
 
}
//----------------------------------------------------- Окончание раздела 3.

console.log('Пример вывода информации'); 
console.log(cfg_info);
console.log(cfg_data);
console.log(dat_data); 
// Get the modal

// Get the button that opens the modal
//var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
//var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
//Нажимаем открыть окно.

// (Create table). Создадим таблицу, чтобы разместить в ней кнопки управления
function user_table(i_row, i_cell,i_ID){
    //  i_row - строчки
    //  i_cell - столбцы
    var tbl = document.createElement('table');
    tbl.id=i_ID;
    var tblBody = document.createElement("tbody");
    for (var i=0; i<i_row; i++){ 
        var row = document.createElement("tr");
        for (var j=0; j<i_cell; j++){ 
            var cell = document.createElement("td"); 
            row.appendChild(cell); 
        }
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
   // document.getElementById('modal-footer').appendChild(tbl);
   
   //Как перебрать в цикле все ячейки таблицы:
    //var td_cells=document.getElementById("table").cells;
    //for (var i=0; i < td_cells.length; i++)
    //alert(td_cells[i].innerHTML);
  return tbl;
}



