/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//Делаем выделение строчки----------------------------------------------------
function checkbox_onclick(elem, new_table,color){
        
    if (elem.checked == true) {
                //Если выделенная переменная в checkbox
                //console.log('true' + elem.name);
                new_table.rows[elem.name].style.backgroundColor = color;
    }
    else{
            
                //console.log('faulse' + elem.name);
                new_table.rows[elem.name].style.backgroundColor = "";
    }
}
    
var print_info = new Array();


function num_select_option(number){
    var i_select = document.createElement('select');
    for (var i=1; i<=number; i++){ //cfg_data.length - кол-во сигналов
        // создаем новый элемент option
        var i_option = document.createElement('option');    
        i_option.setAttribute('value', i); i_option.setAttribute('text', i);
        i_option.appendChild(document.createTextNode(i));
        //i_select.appendChild(i_option);
        i_select.options.add(i_option);
    }
    return i_select;
}

//----------------------------------------------------- Раздел 4. Выбираем сигналы для отображения
function print_data() {
    open_modal('myPrint');
    var modal_header = document.getElementById('modal-header');
    modal_header.innerHTML = '<h2>Список сигналов для отображения на графике</h2>';
    var modal_body = document.getElementById('modal-body');
    //modal_body.innerHTML = '<h4>Список сигналов</h4>';
    
    
// (Create table). Создадим таблицу, чтобы разместить в ней кнопки управления
    var tbl = document.createElement('table');
    var tblBody = document.createElement("tbody");
    var row = document.createElement("tr");
    var cell1 = document.createElement("td"); row.appendChild(cell1); 
    var cell2 = document.createElement("td"); row.appendChild(cell2);
    var cell2 = document.createElement("td"); row.appendChild(cell2);    
    tblBody.appendChild(row);
    tbl.appendChild(tblBody);
    document.getElementById('modal-footer').appendChild(tbl);
    

    var close = document.createElement('label');
    close.id = 'close';
    close.className = 'chous';
    close.innerHTML = 'Закрыть'; 
cell1.appendChild(close);

    var print_open = document.createElement('label');
    print_open.id = 'print';
    print_open.className = 'chous';
    print_open.innerHTML = 'Построить'; 
cell2.appendChild(print_open);


//Делаем обрпаботчик события для закрытия модального окна
    close.onclick = function() {
        //производим какие-то действия
        document.getElementById('myPrint').style.display = "none";
        //предотвращаем переход по ссылке href

        // удаление всех дочерних узлов с формы
        var container = document.getElementById('myPrint');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }        
        return false;       
    }
 //---------------------------------------------------------------------------------------------------------------
//Создаем контент, который можно сролить.
//1. Создаем div (id = 'modal-guts') элемент определенной ширины с параметром overflow: auto;

//var new_table=user_table(1, 3, "new_table");
//document.getElementById('modal-body').appendChild(new_table);

// rows[r].cells[c].
//var td_cells=new_table.cells;
//new_table.rows[0].cells[0].innerHTML="Проба";
//new_table.rows[0].cells[1].innerHTML="Проба1";

//console.log(new_table.rows[0].cells);
//console.log(new_table.cells[0]);

//i_tr=new_table.getElementsByTagName("tr")[0];
//i_tr.getElementsByTagName('td')[2].innerHTML=new_table.getElementsByTagName("tr").length;
//console.log(i_tr);  
//console.log(i_tr.getElementsByTagName('td')[2]);  

//Создаем контент, который можно сролить.
//1. Создаем div (id = 'modal-guts') элемент определенной ширины с параметром overflow: auto;



var modal_guts = document.createElement('div');
modal_guts.id = 'modal-guts';
modal_guts.className = 'modal-guts';
document.getElementById('modal-body').appendChild(modal_guts);

var new_table=user_table(cfg_data.length+1, 5, "new_table");
document.getElementById('modal-guts').appendChild(new_table);

new_table.rows[0].cells[0].innerHTML="Поле выбора";
new_table.rows[0].cells[1].innerHTML="Название сигнала";
new_table.rows[0].cells[2].innerHTML="Толщина линии";
new_table.rows[0].cells[3].innerHTML="Цвет";
new_table.rows[0].cells[4].innerHTML="Ось отображения";
//Добавление списка сигналов
   for (var i=0; i<cfg_data.length; i++){ //cfg_data.length - кол-во сигналов

    //поле для выбора сигнала
    var sign = document.createElement('input');
    sign.type = 'checkbox';
    sign.id = 'checkbox'+i;
    sign.name = i+1; //Хранит номер строчки в таблице    
    sign.setAttribute('onclick','checkbox_onclick(this, new_table, "cyan")');    
    new_table.rows[i+1].cells[0].appendChild(sign);
    
    //Название сигнала
    var name = document.createElement('label');
    name.textContent = cfg_data[i][1];
    new_table.rows[i+1].cells[1].appendChild(name);
    
    //Толщина линии
    var i_line_width = num_select_option(5);
    i_line_width.id = 'select_width'+i; 
    new_table.rows[i+1].cells[2].appendChild(i_line_width);  
          
    //Цвет  
    var color = document.createElement('input');//"Color Picker" 
    color.id = 'color'+i; 
    color.type = 'color';// x.setAttribute("type", "color");
    new_table.rows[i+1].cells[3].appendChild(color); 
    
    //Ось отображения
    var i_axis = num_select_option(9);
    i_axis.id = 'select_axis'+i; 
    new_table.rows[i+1].cells[4].appendChild(i_axis);  
    
    
   }
   
   // В случае если мы уже что-то выделили
    for (var i=0; i<print_info.length; i++){ //cfg_data.length - кол-во сигналов    
    document.getElementById('checkbox' + print_info[i][0]).checked = true;
    document.getElementById('new_table').rows[print_info[i][0]+1].style.backgroundColor = "cyan";
    document.getElementById('select_width' + print_info[i][0]).options.selectedIndex = print_info[i][1];
    document.getElementById('color' + print_info[i][0]).value=print_info[i][2];
    document.getElementById('select_axis' + print_info[i][0]).options.selectedIndex = print_info[i][3];
    }


//Делаем обработчик события экспорта данных
    print_open.onclick = function() {

      //Формируем массив данных csvRows для записи в CSV файл
        var key = false;
        var k = 0;
        print_info = new Array();
        
        //1.Названия создать массив export
        for (var i=0; i<cfg_data.length; i++){ //cfg_data.length - кол-во сигналов
            if (document.getElementById('checkbox' + i).checked == true) {
            print_info[k] = new Array();
            console.log(document.getElementById('checkbox' + i));
            key=true;          
            print_info[k][0]=document.getElementById('checkbox' + i).name-1;   
            print_info[k][1]=document.getElementById('select_width' + i).options.selectedIndex;   
            print_info[k][2]=document.getElementById('color' + i).value
            print_info[k][3]=document.getElementById('select_axis' + i).options.selectedIndex; 
            k++;            
            }
        }
        
        console.log(print_info);
                //csvRows=csvRows+ "\r\n";
        
        //2.Данные.
        //Цикл по выбранным переменным dat_data[i][j+1]
        
        if (key==false){ 
            console.log('Вы не выбрали переменных')
        }
        else  {
               //Строим график
               plot (print_info, dat_data);
        }
        
    }
    
    
    
    
    
    
}


//document.getElementById('checkbox').onclick = function(){
//document.querySelectorAll('input[type=checkbox]').onclick = function(){  
//document.getElementsByName('checkbox').onclick = function(){  
//alert( 'чекбокс включён' );
//}

console.log(print_info);
