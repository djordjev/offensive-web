<?php
	require 'constants.php';
	require 'messageBuilder.php';
	
	$fbId = $_POST ["facebookId"];
	
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
				'facebookId' => $fbId
		);
		send_message($socket, FACEBOOK_LOGIN_HANDLER, json_encode($message));
		$response_message = receive_message($socket);
		// close socket
		fclose ( $socket );
		echo $response_message;
	}
?>