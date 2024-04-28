$(document).ready(function(){
    cargarTareas();
    cargarTareasTerminadas();
    $('#tarea').keypress(function(event){
        if(event.which === 13){
            event.preventDefault(); 
            $('#cargar').click(); 
        }
    });
    $('#cargar').click(function(){
        let tarea = $('#tarea').val();
        if (tarea == '') {
            alert('Por favor, ingrese una tarea válida.');
            return;
        }
        $.ajax({
            type: 'POST',
            url: 'task.php',
            data: { tarea: tarea },
            success: function(response){
                if(response == 'success'){
                    actualizarTabla();
                    actualizarTablaTerminada();
                    $('#tarea').val('');
                } else {
                    alert("Ha ocurrido un error o la tarea ya existe");
                }
            },
            error: function(){
                alert("Ha ocurrido un error o la tarea ya existe");
            }
        });
    });

    $(document).on('click', '.eliminar', function(){
        let idTarea = $(this).attr('id'); // Obtener el ID de la tarea
        // alert (idTarea);
        eliminarTarea(idTarea); // Llamar a la función eliminarTarea con el ID de la tarea
    });
    
    $(document).on('click', '.confirmar', function(){
        let idConfirmar = $(this).attr('id');
        confirmarTarea(idConfirmar);
    })


    function cargarTareas() {
        let tabla = document.getElementById('tablaTareas').getElementsByTagName('tbody')[0];
        $.ajax({
            type: 'GET',
            url: 'obtener_tareas.php',
            success: function(response){
                const respuesta = JSON.parse(response);
                respuesta.forEach((tarea) => {
                    const row = tabla.insertRow(); // Inserta una nueva fila en la tabla
                    const cellNombre = row.insertCell(0); // Inserta una celda para el nombre (primera columna)
                    const cellFecha = row.insertCell(1); // Inserta una celda para la fecha (segunda columna)
                    const cellAcciones = row.insertCell(2); // Inserta una celda para los botones (tercera columna)
                    
                    cellNombre.innerHTML = `<div class="texto-wrap">${tarea.nombre}</div>`; // Envuelve el nombre de la tarea
                    cellFecha.innerHTML = tarea.fechaHora; // Establece la fecha de la tarea en la celda correspondiente
                    cellAcciones.innerHTML = `<button class="confirmar" id="${tarea.id}">&#10004;</button>
                                              <button class="eliminar" id="${tarea.id}">🗑️</button>`; // Botones de acciones
                });
            },
            error: function(){
                alert("Ha ocurrido un error al obtener las tareas");
            }
        });
    }
    
//tengo que cambiar la base de datos para que guarde ambas fechas S
    function cargarTareasTerminadas() {
        let tabla = $('#tablaTareasTerminadas tbody');
        $.ajax({
            type: 'GET',
            url: 'obtener_tareas_confirmadas.php',
            success: function(response){
                const respuesta = JSON.parse(response);
                respuesta.forEach((tarea) => {
                    tabla.append(`<tr>
                                    <td>${tarea.nombre}</td>
                                    <td>${tarea.fechaHora}</td>
                                    <td></td>
                                    <td>
                                        <button class="eliminar" id="${tarea.id}">🗑️</button>
                                    </td>
                                </tr>`);
                });
            },
            error: function(){
                alert("Ha ocurrido un error al obtener las tareas terminadas");
            }
        });
    }
    
    

    
    
    function actualizarTabla() {
    let tabla = document.getElementById('tablaTareas').getElementsByTagName('tbody')[0];
    tabla.innerHTML = ''; // Borra el contenido anterior de la tabla
    $.ajax({
        type: 'GET',
        url: 'obtener_tareas.php',
        success: function(response){
            const respuesta = JSON.parse(response);
            respuesta.forEach((tarea) => {
                const row = tabla.insertRow(); // Inserta una nueva fila en la tabla
                const cellNombre = row.insertCell(0); // Inserta una celda para el nombre (primera columna)
                const cellFecha = row.insertCell(1); // Inserta una celda para la fecha (segunda columna)
                const cellAcciones = row.insertCell(2); // Inserta una celda para los botones (tercera columna)
                
                cellNombre.innerHTML = tarea.nombre; // Establece el nombre de la tarea en la celda correspondiente
                cellFecha.innerHTML = tarea.fechaHora; // Establece la fecha de la tarea en la celda correspondiente
                cellAcciones.innerHTML = `<button class="confirmar" id="${tarea.id}">&#10004;</button>
                                          <button class="eliminar" id="${tarea.id}">🗑️</button>`; // Botones de acciones
            });
        },
        error: function(){
            alert("Ha ocurrido un error al obtener las tareas");
            }
        });
    }


    function actualizarTablaTerminada() {
        let tabla = $('#tablaTareasTerminadas tbody');
        tabla.empty(); // Vaciar la tabla antes de agregar las nuevas tareas terminadas
        $.ajax({
            type: 'GET',
            url: 'obtener_tareas_confirmadas.php',
            success: function(response){
                const respuesta = JSON.parse(response);
                respuesta.forEach((tarea) => {
                    tabla.append(`<tr>
                                    <td>${tarea.nombre}</td>
                                    <td>${tarea.fechaHora}</td>
                                    <td>
                                        <button class="eliminar" id="${tarea.id}">🗑️</button>
                                    </td>
                                </tr>`); // Agregar una fila a la tabla con el nombre de la tarea, fecha y botones
                });
            },
            error: function(){
                alert("Ha ocurrido un error al obtener las tareas terminadas");
            }
        });
    }
    
    function confirmarTarea(idConfirmar){
        if(confirm("¿Ya terminaste la tarea?")){
            $.ajax({
                type: 'POST',
                url: 'confirmar_tarea.php',
                data: {id: idConfirmar},
                success: function(response){
                    if(response == 'success'){
                        actualizarTabla();
                        actualizarTablaTerminada();
                    } else{
                        alert("Ha ocurrido un error")
                    }
                },
                error: function(){
                    alert("Ha ocurrido un error");
                }
            });
        }
    }
        
    function eliminarTarea(idTarea){
        if(confirm("¿Estás seguro de que deseas eliminar esta tarea?")){
            $.ajax({
                type: 'POST',
                url: 'eliminar_tarea.php',
                data: { id: idTarea },
                success: function(response){
                    if(response == 'success'){
                        actualizarTabla(); // Vuelve a cargar la lista de tareas
                        actualizarTablaTerminada();
                    } else {
                        alert("Ha ocurrido un error al eliminar la tarea");
                    }
                },
                error: function(){
                    alert("Ha ocurrido un error al eliminar la tarea");
                }
            });
        }
    }
});
