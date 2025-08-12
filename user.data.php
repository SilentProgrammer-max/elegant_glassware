<?php
session_start();
if (isset($_SESSION['user_id'])) {
    echo json_encode([
        'loggedIn' => true,
        'username' => $_SESSION['username'],
        'fullname' => $_SESSION['fullname']
    ]);
} else {
    echo json_encode(['loggedIn' => false]);
}
?>
