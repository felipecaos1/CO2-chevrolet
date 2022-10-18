<?php 
$mysqli = mysqli_connect('localhost', 'carbonocaminos_usrbd2022', '0e{LkF$F3~(b', 'carbonocaminos_registros');

if (!$mysqli) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--Import materialize.css-->
    <link type="text/css" rel="stylesheet" href="//cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css"  media="screen,projection"/>


</head>
<body>

<?php 
    $sql = "SELECT * FROM registrosCarbonoNeutro";

    $result = $mysqli->query($sql);
?>    

<main>

    <table id="example" class="cell-border compact stripe " style="width:100%">
        <thead>
            <tr>
                <th># Registro</th>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Edad</th>
                <th>Huella Generada</th>
                <th>Total Arboles</th>

            </tr>
        </thead>
        <tbody>
            <?php
            if (mysqli_num_rows($result)>0) {
                while($row = mysqli_fetch_assoc($result)) {   ?>
            <tr>
                <td><b> <?php echo $row['id']; ?> </b></td>
                <td> <?php echo $row['fecha']; ?> </td>
                <td> <?php echo $row['nombresRegistro']; ?> </td>
                <td> <?php echo $row['telefonoRegistro']; ?> </td>
                <td> <?php echo $row['correoRegistro']; ?> </td>
                <td> <?php echo $row['edadRegistro']; ?> </td>                
                <td> <?php echo $row['resultadoHuella']; ?> </td>                
                <td> <?php echo $row['resultadoArboles']; ?> </td>                
            </tr>
            <?php
                }
            }
            ?>
        </tbody>
        <tfoot>
            <tr>
                <th># Registro</th>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Edad</th>
                <th>Huella Generada</th>
                <th>Total Arboles</th>
            </tr>
        </tfoot>
        </table>
    
</main>




<script src="./../jquery.min.js"></script>

<script src="//cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>

<script>
     jQuery('#example').DataTable();
</script>
</body>