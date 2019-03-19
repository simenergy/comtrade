/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//------------------------------------------------------------------------------------------------------------------- Функция поиска максимального числа
//функция определяет максимальноу число из массива [array] и возвращает значение
function findmax(max, array) {
      var a = array.length;
      var counter;
      var max=0;
  for (counter=0;counter<a;counter++) {
      if (Math.abs(array[counter]) > max) {
          max = array[counter];
      }
  }
  return max;
}

//------------------------------------------------------------------------------------------------------------------- Функция выбора столбца в массиве
//Функция возвращает необходимый столбец из массива
    function getCol(matrix, col){
     
       var column = new Array();
       for(var i=0; i<matrix.length; i++){
          column[i]=matrix[i][col];
       }
       return column;
    }





//-----------------------------------------------------------------------------------------------------------------------4. Координатная ось. ПодФункция для определения позиций при делении координатной оси
function user_array_coordinate(lengthcoord, number) {
//lengthcoord[] - 0- центр коодинат, 1- длина отрезка назад (влево, наверх), 2 - длина отрезка вперед (вправо, вниз)
//number[] - 0-левое значение, 1-правое значение, 2-число знаков после запятой, 3-количетсво точек на оси

    var x_arr = new Array();
    var x_points_delta = ((lengthcoord[0] + lengthcoord[2]) - (lengthcoord[0] - lengthcoord[1])) / number[3];
    var x_number_delta = (number[1] - number[0]) / number[3];
    //x_number_delta = parseFloat(x_number_delta.toFixed(1));

    for (var i = 0; i <= number[3]; i++) {
        x_arr[2 * i] = lengthcoord[0] - lengthcoord[1] + x_points_delta * i;
        ans = number[0] + x_number_delta * i;
        x_arr[2 * i + 1] = parseFloat(ans.toFixed(number[2])); //окуругление до необходимой точности
    }
    return x_arr;
}
//-------------------------------------------------------------------------------------------------------------------------5. Координатная ось. Основная функция
function axes_box (object, xlengthcoord,ylengthcoord, x_number, y_number, Name_x,Name_y ) {
//number[] - 0-левое значение, 1-правое значение, 2-число знаков после запятой, 3-количетсво точек на оси (без учета 0 точки)
//lengthcoord[] - Центр, длина осей в лево, длина осей в право

    var xlengthcoord_left = xlengthcoord[1];
    var xlengthcoord_Right = xlengthcoord[2];

    var ylengthcoord_left = ylengthcoord[1];
    var ylengthcoord_Right = ylengthcoord [2];

var user_color_axes='#6b7681';

    var x_arr = new Array();
    x_arr = user_array_coordinate(xlengthcoord, x_number);
    var y_arr = new Array();
    y_arr = user_array_coordinate(ylengthcoord, y_number);

    //console.log(x_arr);
    //console.log(y_arr);

    var axis_x = object.line(xlengthcoord[0] - xlengthcoord_left, ylengthcoord[0], xlengthcoord[0] + xlengthcoord_Right, ylengthcoord[0]).stroke({width: 2});
    axis_x.stroke({color: user_color_axes, width: 1, linecap: 'round'})

    x_rect = 2;
    y_rect = 10;
    for (var i = 0; i <= x_number[3]; i++) {
        object.rect(x_rect, y_rect).fill(user_color_axes).move(x_arr[2 * i]-1, ylengthcoord[0]-y_rect/2).stroke({width: 0.2});
        //object.text(x_arr[2*i+1])
        var textX = object.text(String(x_arr[2 * i + 1]));
        textX.addClass('text_axes');
        textX.move(x_arr[2 * i] ,ylengthcoord[0]+ 1.5*y_rect );
        textX.font({
            anchor:   'middle',
            size: 10,
           // family: 'Comic Sans MS'
       })
        textX.fill(user_color_axes)
    }

    var  U_Name_x= object.text(Name_x);
    U_Name_x.move((xlengthcoord[0] + 0.9*xlengthcoord_Right), (ylengthcoord[0]-3*y_rect )).fill(user_color_axes);


    var  U_Name_y= object.text(Name_y);
    U_Name_y.move(xlengthcoord[0]+y_rect, ylengthcoord[0]-ylengthcoord_left  ).fill(user_color_axes);

    var axis_y = object.line(xlengthcoord[0], ylengthcoord[0] - ylengthcoord_left, xlengthcoord[0], ylengthcoord[0] + ylengthcoord_left).stroke({width: 2});
    axis_y.stroke({color: user_color_axes, width: 1, linecap: 'round'})

    for (var i = 0; i <= y_number[3]; i++) {
       // if (object.text(String(y_arr[2 * i + 1]))!='0') {
            object.rect(y_rect, x_rect).fill(user_color_axes).move(xlengthcoord[0]-y_rect/2, y_arr[2 * i]-1).stroke({width: 0.2});
            //object.text(y_arr[2*i+1].move(xcentercoord,y_arr[2*i])
            var textY = object.text(String(y_arr[2 * i + 1]));
            textY.addClass('text_axes');
        textY.font({
            // anchor:   'middle',
            size: 10,
            // family: 'Comic Sans MS'
        })
        textY.fill(user_color_axes)
            textY.center(xlengthcoord[0]+ 2*y_rect , y_arr[2 * i] )


        //console.log(textY.attr())
      //  }
    }
    textY.style({
    '-moz-user-select': '-moz-none',
    '-o-user-select': 'none',
    '-khtml-user-select': 'none',
    '-webkit-user-select': 'none',
    'user-select': 'none',
    '-ms-user-select': 'none'
    })
    
        textX.style({
    '-moz-user-select': '-moz-none',
    '-o-user-select': 'none',
    '-khtml-user-select': 'none',
    '-webkit-user-select': 'none',
    'user-select': 'none',
    '-ms-user-select': 'none'
    })

}





//http://svgjs.com/

//var polyline = new Array();
//polyline[1] = object.polyline();
//polyline[1]=plot('0,0 100,50 50,100').fill('none').stroke({ width: 1 })
//var polyline[2] = object.polyline();
//polyline[2]=plot('110,110 100,50 100,150').fill('none').stroke({ width: 1 })
//var polyline[3] = object.polyline();
//polyline[3] =plot('220,220 200,150 150,200').fill('none').stroke({ width: 1 })


//
//
//
//
//
//---------------------------------------------------------------------------------Создаем декартовую систему координат от времени
//Декартовая ось (симметричная относительна начала координат)
//var xlengthcoord2 = new Array();
//xlengthcoord2=[220,150,300];//Центр, длина осей в лево, длина осей в право
//var ylengthcoord2 = new Array();
//ylengthcoord2=[220,200,200];//Центр, длина осей в лево, длина осей в право

//var x_number2 = new Array();
//x_number2 = [-0.01,0.02,4,6]; //левая гранича, правая гранича, число после запятой для округления,ко-во точек деления
//var y_number2 = new Array();
//y_number2 = [1,-1,2,10];//верхня гранича, нижняя граница, число после запятой для округления,ко-во точек деления

//axes_box (object, xlengthcoord2,ylengthcoord2, x_number2, y_number2,'Time','[o.e.]');


//var points=[0,10,100,50,600,800];
//var u_polyline = new Array();
//u_polyline.plot(points)
//        .fill('none')
//        .stroke({ color: '#f06', width: 2, linecap: 'round', linejoin: 'round' })

//Значения
//массив точек от 0 до ... кол-ва элементов в массиве
// dat_data [0-номер отсчета] [1-время] [2-время записи] [3..-данные за данную точку....]
//

//var points = new Array();
//var u_polyline = new Array();
//    for (var i=0; i<info.length; i++){ //cfg_data.length - кол-во сигналов
//        u_polyline[i] = object.polyline();
//    }



//var circle = object.circle(1)
//var group = object.group()

//group.add(circle)



function plot (info, data){

//Удалем все что входит в Id="drawing"
var elem = document.getElementById("drawing");
while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
}
var elem = document.getElementById("drawing_coordinate");
while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
}
var elem = document.getElementById("drawing_time");
while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
}

//Добавляем новый draw в Id="drawing"
var draw_width = 800; //ширина окна
var draw_height = 400; //высота окна
var draw_object = SVG('drawing').size(draw_width, draw_height); //.size('100%', 400)
draw_object.viewbox(0, 0, draw_width, draw_height)
//draw.viewbox({ x: 0, y: 0, width: 297, height: 210 })

//draw.viewbox({ x: 0, y: 0, width: 297, height: 210 })

//----------------------------------------------------------------------------Линия абсолютного нуля
X=[0,draw_height/2, draw_width/2, draw_height/2, draw_width, draw_height/2]
var line = draw_object.polyline(X.join())
line.fill('none')//.move(0, 0)
line.stroke({ color: '#f06', width: 4, linecap: 'round', linejoin: 'round' })
//----------------------------------------------------------------------------



//----------------------------------------------------------------------------полоса прокрутки
var draw_time = SVG('drawing_time').size(draw_width, 40); //.size('100%', 400)

X=[0,20, draw_width, 20]
var line = draw_time.polyline(X.join())
line.fill('none')//.move(0, 0)
line.stroke({ color: '#f06', width: 4, linecap: 'round', linejoin: 'round' })

var slider_r=20;
var slider = draw_time.circle(slider_r);
slider.move(0, 20-slider_r/2);
//----------------------------------------------------------------------------


var points = new Array();
//var u_polyline = new Array();
//group.remove();
//var group = object.group()
// var mySvg = document.getElementById("drawing");
// var svgDom=mySvg.getSVGDocument();
// alert( svgDom );
// var all = svg.getElementsByTagName("flash");
    
    
//    for (var i=0; i<info.length; i++){ //cfg_data.length - кол-во сигналов
//        u_polyline[i] = object.polyline();
 //   }

    
//----------------------------------------------------------------------------
//Определяем коэффициенты трансформации.
//Максимально есть возможность создать 5 осей.
    var max_axes= new Array();
    for (var i=1; i<=5; i++){ // кол-во осей
        max_axes[i]=0;
        for (var j=0; j<info.length; j++){ //cfg_data.length - кол-во сигналов
            if ((info[j][3]+1)==i){ 
                var i_Array=getCol(data, info[j][0]+3);             
                max_axes[i]=findmax(max_axes[i],i_Array)
                //console.log(info[j][0]+3);               
            }
        }
    }
    
    for (var i=1; i<=5; i++){ //кол-во осей
       var num=max_axes[i];
       var j=0;
        while (num > 10) {
        num=max_axes[i]/Math.pow(10,j);
        j++;
       }
       //Округляем максимальное число в большую сторону
       if (j>=1){
        max_axes[i]=Math.ceil(num)*Math.pow(10,j-1);
       }
    }
    
    //var draw_object_coordinate= new Array();
    for (var i=1; i<=5; i++){ //кол-во осей
        if (max_axes[i]>0){ 
            //Добавляем новый draw в Id="drawing"
            var draw_object_coordinate = SVG('drawing_coordinate').size(50, draw_height); //.size('100%', 400)

            //Линия ордината
            Y1=[20,0, 20, draw_height]
            var line = draw_object_coordinate.polyline(Y1.join())
            line.fill('none')//.move(0, 0)
            line.stroke({ color: '#f06', width: 4, linecap: 'round', linejoin: 'round' })
            
            for (var k=0; k<=4; k++){ //кол-во осей
                var textX = draw_object_coordinate.text(String(max_axes[i]*(1-k/2)));
                textX.addClass('text_axes');
                textX.move(40 ,draw_height/4*k );
                textX.font({
                anchor:   'middle',
                size: 10,
                // family: 'Comic Sans MS'
                })
                
                //Линия абцисса
                X1=[10,draw_height/4*k, 30, draw_height/4*k]
                var line = draw_object_coordinate.polyline(X1.join())
                line.fill('none')//.move(0, 0)
                line.stroke({ color: '#f06', width: 4, linecap: 'round', linejoin: 'round' })
            }
        }  
        
        
  
       // max_axes[i];
      
    }
    
    //console.log('Коэффициенты по осям 1-5');
    //console.log(max_axes);
    
    
//----------------------------------------------------------------------------
    
    //Цикл по выбранным переменным info        
        for (var i=0; i<info.length; i++){ //cfg_data.length - кол-во сигналов
            points[i]= new Array();
            for (var j=0; j<data.length; j++){ //cfg_data.length - кол-во сигналов
                points[i][2*j]=j;                
                points[i][2*j+1]=draw_height/2-(data[j][info[i][0]+3]/(max_axes[info[i][3]+1])*draw_height/2);
            }
            var u_polyline = draw_object.polyline(points[i].join())          
            .fill('none')
            .stroke({ width: info[i][1]+1, color: info[i][2], linecap: 'round', linejoin: 'round' });
        }


//u_polyline[0].move(0,200);
//console.log(u_polyline);
//u_polyline[1].move(0,200);



isDown_I =false;

draw_object.click(function(eventObject){
    isDown_I = false;
});




//отслеживаем координаты мыши и клик для увеличения

var isMouseDown = false;
var isMouseMove = false;

var polygon = draw_object.polygon()  
.fill('none').stroke({ width: 1 })
      
draw_object.mousedown(function(eventObject){
    isMouseDown = true;
    clientX_click=event.offsetX;
    clientY_click=event.offsetY;
});

draw_object.click(function(event){
        isMouseDown = false;          
});

draw_object.mouseup(function(){
        isMouseDown = false;
});  
  
  

  
draw_object.mousemove(function(event){
    clientX_mousedown=event.offsetX;
    clientY_mousedown=event.offsetY;
    //console.log(clientX , " - ",  clientY);
    
    if ((isMouseDown==true)&&(isMouseMove == false)&&(isslider==false)) {
        X=[clientX_click,clientY_click,clientX_mousedown,clientY_click,clientX_mousedown,clientY_mousedown,clientX_click,clientY_mousedown]
        polygon.plot(X) 
    }
    
    
    draw_object.click(function(event){
        dx=clientX_mousedown-clientX_click;
        dy=clientY_mousedown-clientY_click;
        
        if((isMouseMove == false)&&(Math.abs(dx)>5)&&(Math.abs(dy)>5)&&(isslider==false)){          
            draw_object.viewbox(clientX_click,clientY_click, Math.abs(dx),Math.abs(dy))
            polygon.plot(0,0,0,0)
            console.log(clientX_click)
            console.log(clientY_click)
            console.log(Math.abs(dx))
            console.log(Math.abs(dy))
            console.log(draw_object.viewbox().x)
            console.log(draw_object.viewbox().y)
            console.log(draw_object.viewbox().width)
            console.log(draw_object.viewbox().height)
            isMouseMove = true;
            //draw.viewbox({ x: 0, y: 0, width: 297, height: 210 })
        }
        
        if((isMouseMove == false)){          
            polygon.plot(0,0,0,0) 
            //draw.viewbox({ x: 0, y: 0, width: 297, height: 210 })
        }
        
        
    });
    
    draw_object.click(function(event){
        viewbox_x=draw_object.viewbox().x;
        viewbox_y=draw_object.viewbox().y;
        viewbox_width=draw_object.viewbox().width;        
        viewbox_height=draw_object.viewbox().height;      
        dx=50//clientX_mousedown-clientX_click;
        dy=50//clientY_mousedown-clientY_click;
        
        //if (isMouseMove==true) { 
        //    console.log(dx,dy);

       //draw_object.viewbox(viewbox_x-dx, viewbox_y-dy, viewbox_width-dx,viewbox_height-dy);       
                
            
         //   draw_object.viewbox(clientX_click,clientY_click, (clientX_mousedown-clientX_click),(clientY_mousedown-clientY_click))
        //}
    });    
})


//------------------------------------------------------------Перемещение добавить
var isslider=false;
slider.mousedown(function(eventObject){
    isslider = true;
});
draw_time.mouseup(function(eventObject){
        isslider = false;
});
draw_time.click(function(eventObject){
    isslider = false;
});  
draw_time.mousemove(function(event){
    clientX_mousedown=event.offsetX;
    clientY_mousedown=event.offsetY;
    if (isslider==true) {
            slider.move(clientX_mousedown-slider_r/2, 20-slider_r/2);
            //slider.move(0, 20-slider_r/2);
            viewbox_x=draw_object.viewbox().x;
            viewbox_y=draw_object.viewbox().y;
            viewbox_width=draw_object.viewbox().width;
            viewbox_height=draw_object.viewbox().height;            
            draw_object.viewbox(clientX_mousedown,viewbox_y, viewbox_width,viewbox_height)
            
        //функция перестроения графика с новыми координатами
    }
})




 draw_object.dblclick(function(event){      
        draw_object.viewbox(0, 0, draw_width, draw_height);
        isMouseMove = false;
        //draw.viewbox({ x: 0, y: 0, width: 297, height: 210 })
        //
        console.log(draw_object.viewbox().zoom)
        //http://svgjs.com/geometry/#svg-viewbox
    });







//--------------------------------------------------------------------- Отображение координаты мышки
var posx = 0,  posy= 0;
var text = draw_object.text('X:' + posx + '\n'+ 'Y:'+  posy);
text.move(draw_width-20, 20);
text.font({
    family:   'Verdana',
    size:     9,
    anchor:   'middle',
    leading:  '1em'
})

//document.onmousemove=function(e) {
//     //var offset = fabric.util.getElementOffset(canvas.lowerCanvasEl);
//    text.clear()
//    posx=event.offsetX;//- offset.left;
//    posy=event.offsetY//- offset.top;
//    text.text("X:" + posx + "\n"+ "Y:"+  posy);
//};

//document.querySelector('object').onmousemove = function(e) {// Отслеживаем перемещение мыши
//    text.clear()
//    event = event || window.event;
    //window.event пересоздается каждый раз при новом событии, и новый объект уже располагается по другому адресу.
//    text.text("X:" + event.offsetX+ "\n"+ "Y:"+  event.offsetY);
    //Если необходимо вывести в консоль: console.log(переменная);
//};


}