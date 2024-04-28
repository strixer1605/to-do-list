<?php
    date_default_timezone_set('America/Argentina/Buenos_Aires');
if(isset($_POST['tarea'])){
    $tarea = $_POST['tarea'];
    $fechaHora = date('Y-m-d H:i:s');
    $estado = 1;
    
    $conexion = mysqli_connect("localhost", "root", "", "listatareas");
    
    // Verificar si la tarea ya existe
    $queryVerificar = "SELECT nombre, estado FROM tareas WHERE nombre = ?";
    $stmtVerificar = mysqli_prepare($conexion, $queryVerificar);
    mysqli_stmt_bind_param($stmtVerificar, "s", $tarea);
    mysqli_stmt_execute($stmtVerificar);
    mysqli_stmt_store_result($stmtVerificar);
    
    if(mysqli_stmt_num_rows($stmtVerificar) > 0){
        mysqli_stmt_bind_result($stmtVerificar, $nombre, $estado_bd);
        while (mysqli_stmt_fetch($stmtVerificar)) {
            if ($estado_bd == $estado) {
                echo 'duplicate';
                exit; // Terminar la ejecución después de encontrar una duplicada con el mismo estado
            }
        }
    }
    
    // Insertar la nueva tarea
    $query = "INSERT INTO tareas (nombre, fechaHora, estado) VALUES (?, ?, ?)";
    $stmt = mysqli_prepare($conexion, $query);
    mysqli_stmt_bind_param($stmt, "ssi", $tarea, $fechaHora, $estado);
    
    if(mysqli_stmt_execute($stmt)){
        echo 'success';
    } else {
        echo 'error';
    }
    
    mysqli_stmt_close($stmt);
    
    mysqli_stmt_close($stmtVerificar);
    mysqli_close($conexion);
}
?>
