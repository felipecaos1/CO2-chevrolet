<?php 

$mysqli = mysqli_connect('localhost', 'carbonocaminos_usrbd2022', '0e{LkF$F3~(b', 'carbonocaminos_registros');

if (!$mysqli) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

$E_nombre = $_POST['nombre'];
$E_telefono = $_POST['telefono'];
$E_correo = $_POST['correo'];
$E_edad = $_POST['edad'];
$E_huella = $_POST['resultado_huella'];
$E_arboles = $_POST['resultado_arboles'];

$sql = "INSERT INTO registrosCarbonoNeutro (id, fecha, nombresRegistro, telefonoRegistro, correoRegistro, edadRegistro, resultadoHuella, resultadoArboles) VALUES (NULL, CURRENT_TIMESTAMP, '".$E_nombre."', '".$E_telefono."', '".$E_correo."', '".$E_edad."', '".$E_huella."', '".$E_arboles."')";

if ($mysqli->query($sql)) {
	echo json_encode (array('mensaje' => "entro"));
}else{
	echo json_encode (array('mensaje' => "error"));
}