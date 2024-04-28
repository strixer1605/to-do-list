<?php
$conexion = mysqli_connect("localhost", "root", "", "listatareas");

$query = "SELECT * FROM tareas ORDER BY fechaHora DESC";
$resultado = mysqli_query($conexion, $query);

$tareas = array();

if(mysqli_num_rows($resultado) > 0){
    while($fila = mysqli_fetch_assoc($resultado)){
        $tarea = array(
            'id' => $fila['id'],
            'nombre' => $fila['nombre'],
            'fechaHora' => $fila['fechaHora'],
            'estado' => $fila['estado']
        );
        if($fila['estado'] == 0){
            $tareas[] = $tarea;
        }
    }
}

echo json_encode($tareas);

mysqli_close($conexion);
?>
