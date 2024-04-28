<?php
    if(isset($_POST['id'])){
        $id = $_POST['id']; 
        
        $conexion = mysqli_connect("localhost", "root", "", "listatareas");

        $query = "DELETE FROM tareas WHERE id = ?";
        $stmt = mysqli_prepare($conexion, $query);
        
        mysqli_stmt_bind_param($stmt, "i", $id);

        if(mysqli_stmt_execute($stmt)){
            echo 'success';
        } else {
            echo 'error';
        }

        mysqli_stmt_close($stmt);
        mysqli_close($conexion);
    }
?>
