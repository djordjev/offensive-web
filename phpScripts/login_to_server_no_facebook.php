<?php
require 'constants.php';

$username = $_POST ["username"];
$password = $_POST ["password"];

$error_no = NULL;
$error_str = NULL;

$socket = fsockopen ( HOSTNAME, PORT, $error_no, $error_str, SOCKET_TIMEOUT_SECONDS );
if (! $socket) {
	echo json_encode ( array (
			'error_number' => $error_no,
			'error_string' => $error_str 
	) );
} else {
	// write to socket
	$message = array (
			'username' => $username,
			'passwordHash' => $password 
	);
	$encoded_message = json_encode ( $message );
	$message_length = strlen ( $encoded_message );
	$header = pack ( "NNNCC", LOGIN_HANDLER, DUMMY_TICKET_ID, $message_length, DUMMY_STATUS, JSON_PROTOCOL );
	fwrite ( $socket, $header . $encoded_message );
	
	// wait for response
	stream_set_blocking ( $socket, 1 );
	$header = fread ( $socket, HEADER_SIZE_IN_BYTES );
	$unpacked_header = unpack ( "N1/N1/N1data_len/C1/C1/", $header );
	
	$received_data_length = $unpacked_header ['data_len'];
	
	$encoded_message = fread ( $socket, $received_data_length );
	// close socket
	fclose ( $socket );
	echo $encoded_message;
}
?>