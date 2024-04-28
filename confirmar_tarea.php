<?php
date_default_timezone_set('America/Argentina/Buenos_Aires'); // Configurar la zona horaria

$conexion = mysqli_connect("localhost", "root", "", "listatareas");

if(isset($_POST['id'])){
    $id = $_POST['id'];
    $estado = 0;

    // Obtener la hora actual del servidor
    $fechaHoraActual = date('Y-m-d H:i:s');

    $query = "UPDATE `tareas` SET `estado`= $estado, `fechaHora`= '$fechaHoraActual' WHERE id = $id";

    $respuesta = mysqli_query($conexion, $query);
    if($respuesta){
        echo 'success';
    } else {
        echo 'error';
    }
} else {
    echo 'No se proporcionó un ID de tarea.';
}

mysqli_close($conexion);
?>
