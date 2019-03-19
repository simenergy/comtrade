/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//----------------------------------------------------- Раздел 4. Выбираем сигналы для экспорта
function export_data() {
    open_modal('myModal');    
    
    var modal_header = document.getElementById('modal-header');
    modal_header.innerHTML = '<h2>Список сигналов для экспортирования данных</h2>';
    var modal_body = document.getElementById('modal-body');
    //modal_body.innerHTML = '<h4>Список сигналов</h4>';
    var modal_footer = document.getElementById('modal-footer');
    //modal_footer.innerHTML = '<h3>Modal Footer</h3>'; 
 
// (Create table). Создадим таблицу, чтобы разместить в ней кнопки управления
    var tbl = document.createElement('table');
    var tblBody = document.createElement("tbody");
    var row = document.createElement("tr");
    var cell1 = document.createElement("td"); row.appendChild(cell1); 
    var cell2 = document.createElement("td"); row.appendChild(cell2);
    var cell3 = document.createElement("td"); row.appendChild(cell3);    
    tblBody.appendChild(row);
    tbl.appendChild(tblBody);
    document.getElementById('modal-footer').appendChild(tbl);


    var close = document.createElement('label');
    close.id = 'close';
    close.className = 'chous';
    close.innerHTML = 'Закрыть'; 
    document.getElementById('modal-footer').appendChild(close);
cell1.appendChild(close);

    var save_csv = document.createElement('label');
    save_csv.id = 'export';
    save_csv.className = 'chous';
    save_csv.innerHTML = 'Сохранить в CSV'; 
    document.getElementById('modal-footer').appendChild(save_csv);
cell2.appendChild(save_csv);

    var save_excel = document.createElement('label');
    save_excel.id = 'export';
    save_excel.className = 'chous';
    save_excel.innerHTML = 'Сохранить в Excel'; 
    document.getElementById('modal-footer').appendChild(save_excel);
cell3.appendChild(save_excel);

//Делаем обрпаботчик события для закрытия модального окна
    close.onclick = function() {
        //производим какие-то действия
        document.getElementById('myModal').style.display = "none";
        //предотвращаем переход по ссылке href
    
    // удаление всех дочерних узлов с формы
    var container = document.getElementById('myModal');
    while (container.firstChild) {
    container.removeChild(container.firstChild);
    }
        
        return false;
        
        
    }

    
//Создаем контент, который можно сролить.
//1. Создаем div (id = 'modal-guts') элемент определенной ширины с параметром overflow: auto;

var modal_guts = document.createElement('div');
modal_guts.id = 'modal-guts';
modal_guts.className = 'modal-guts';
document.getElementById('modal-body').appendChild(modal_guts);


var new_table=user_table(cfg_data.length+1, 2, "new_table");
document.getElementById('modal-guts').appendChild(new_table);

new_table.rows[0].cells[0].innerHTML="Поле выбора";
new_table.rows[0].cells[1].innerHTML="Название сигнала";
//Добавление списка сигналов

//Добавление списка сигналов
   for (var i=0; i<cfg_data.length; i++){ //cfg_data.length - кол-во сигналов

    var sign = document.createElement('input');
    sign.type = 'checkbox';
    sign.id = 'checkbox' + i;
    sign.name = i+1; //Хранит номер строчки в таблице
    sign.setAttribute('onclick','checkbox_onclick(this, new_table, "cyan")'); 
    new_table.rows[i+1].cells[0].appendChild(sign);
    
    
    var name = document.createElement('label');
    name.textContent = cfg_data[i][1];  
    new_table.rows[i+1].cells[1].appendChild(name);
   }
   
   
   
//Делаем обработчик события экспорта данных
    save_csv.onclick = function() {
        //Формируем массив данных csvRows для записи в CSV файл
        var key = false;
        var csvRows = "";
        
        //1.Названия создать массив export
        csvRows="Номер измерения"+",";   // unquoted CSV row
        csvRows=csvRows+"Время"+",";   // unquoted CSV row
        csvRows=csvRows+"Время записи, сек."+",";   // unquoted CSV row
        for (var i=0; i<cfg_data.length; i++){ //cfg_data.length - кол-во сигналов
            if (document.getElementById('checkbox' + i).checked == true) {
            console.log(document.getElementById('checkbox' + i));
            key=true;          
            csvRows=csvRows+ cfg_data[i][1]+",";   // unquoted CSV row
            }
        }
                //csvRows=csvRows+ "\r\n";
        
        //2.Данные.
        //Цикл по выбранным переменным dat_data[i][j+1]
        
        for (var i=0; i<dat_data.length; i++){ //cfg_data.length - кол-во сигналов
            csvRows=csvRows+ "\r\n";
            csvRows = csvRows + dat_data[i][0]+",";
            csvRows = csvRows + dat_data[i][1]+",";
            csvRows = csvRows + dat_data[i][2]+",";
            for (var j=0; j<cfg_data.length; j++){ //cfg_data.length - кол-во сигналов
                if (document.getElementById('checkbox' + j).checked == true) {
                //Если выделенная переменная в checkbox
                csvRows = csvRows + dat_data[i][j+3]+","; 
                }
            }
        }
        
        
        if (key==false){ 
            console.log('Вы не выбрали переменных')
        }
        else
        {
        var i_Date=name_file('.csv'); //Формируем название файла по дате и времени. 
        
        var download = function(content, fileName, mimeType) {
          var a = document.createElement('a');
          mimeType = mimeType || 'application/octet-stream';

          if (navigator.msSaveBlob) { // IE10
            navigator.msSaveBlob(new Blob([content], {
              type: mimeType
            }), fileName);
          } else if (URL && 'download' in a) { //html5 A[download]
            a.href = URL.createObjectURL(new Blob([content], {
            type: mimeType
            }));
            a.setAttribute('download', fileName);
            //document.body.appendChild(a);
            a.click();
            //document.body.removeChild(a);
          } else {
            location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
          }
        }
        download(csvRows, i_Date, 'text/csv;charset=windows-1252');  //'text/csv;encoding:utf-8'     
        }

        //предотвращаем переход по ссылке href
        return false;
    }

    
    
    //Делаем обработчик события для сохранения в Excel
    save_excel.onclick = function() {
        //Формируем массив данных csvRows для записи в CSV файл
        var key = false;
        var csvRows = "";
        
        //1.Названия создать массив export
        csvRows="Номер измерения"+",";   // unquoted CSV row
        csvRows=csvRows+"Время"+",";   // unquoted CSV row
        csvRows=csvRows+"Время записи, сек."+",";   // unquoted CSV row
        for (var i=0; i<cfg_data.length; i++){ //cfg_data.length - кол-во сигналов
            if (document.getElementById('checkbox' + i).checked == true) {
            console.log(document.getElementById('checkbox' + i));
            key=true;          
            csvRows=csvRows+ cfg_data[i][1]+",";   // unquoted CSV row
            }
        }
                //csvRows=csvRows+ "\r\n";
        
        //2.Данные.
        //Цикл по выбранным переменным dat_data[i][j+1]
        
        for (var i=0; i<dat_data.length; i++){ //cfg_data.length - кол-во сигналов
            csvRows=csvRows+ "\r\n";
            csvRows = csvRows + dat_data[i][0]+",";
            csvRows = csvRows + dat_data[i][1]+",";
            csvRows = csvRows + dat_data[i][2]+",";
            for (var j=0; j<cfg_data.length; j++){ //cfg_data.length - кол-во сигналов
                if (document.getElementById('checkbox' + j).checked == true) {
                //Если выделенная переменная в checkbox
                csvRows = csvRows + dat_data[i][j+3]+","; 
                }
            }
        }
        
        
        if (key==false){ 
            console.log('Вы не выбрали переменных')
        }
        else
        {
        var i_Date=name_file('.csv'); //Формируем название файла по дате и времени. 
        
        var download = function(content, fileName, mimeType) {
          var a = document.createElement('a');
          mimeType = mimeType || 'application/octet-stream';

          if (navigator.msSaveBlob) { // IE10
            navigator.msSaveBlob(new Blob([content], {
              type: mimeType
            }), fileName);
          } else if (URL && 'download' in a) { //html5 A[download]
            a.href = URL.createObjectURL(new Blob([content], {
            type: mimeType
            }));
            a.setAttribute('download', fileName);
            //document.body.appendChild(a);
            a.click();
            //document.body.removeChild(a);
          } else {
            location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
          }
        }
        download(csvRows, i_Date, 'text/csv;charset=windows-1252');  //'text/csv;encoding:utf-8'     
        }

        //предотвращаем переход по ссылке href
        return false;
    }
    
    
    
    



}
//----------------------------------------------------- Окончание раздела 4. 

