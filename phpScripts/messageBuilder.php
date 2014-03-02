<?php
	require 'constants.php';
		
	function send_message($socket, $handlerId, $message) {
		$message_length = strlen ($message);
		$header = pack ( "NNNCC", $handlerId, DUMMY_TICKET_ID, $message_length, DUMMY_STATUS, JSON_PROTOCOL );
		fwrite ( $socket, $header . $message );
	}
	
	function receive_message($socket) {
		stream_set_blocking ( $socket, 1 );
		$header = fread ( $socket, HEADER_SIZE_IN_BYTES );
		$unpacked_header = unpack ( "N1/N1/N1data_len/C1/C1/", $header );
		
		$received_data_length = $unpacked_header ['data_len'];
		
		$encoded_message = fread ( $socket, $received_data_length );
		
		return $encoded_message;
	}

?>