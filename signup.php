<?php
session_start();
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']);
    $fullname = trim($_POST['fullname']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    
    // Basic validation (expand as needed)
    if (!$username || !$fullname || !$email || !$password) {
        echo json_encode(['status' => 'error', 'message' => 'All fields required']);
        exit;
    }
    
    // Check if username/email already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
    $stmt->execute([$username, $email]);
    if ($stmt->fetch()) {
        echo json_encode(['status' => 'error', 'message' => 'Username or email already taken']);
        exit;
    }
    
    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert user
    $stmt = $pdo->prepare("INSERT INTO users (username, fullname, email, password) VALUES (?, ?, ?, ?)");
    $stmt->execute([$username, $fullname, $email, $hashedPassword]);
    
    $_SESSION['user_id'] = $pdo->lastInsertId();
    $_SESSION['username'] = $username;
    $_SESSION['fullname'] = $fullname;
    
    echo json_encode(['status' => 'success']);
}
?>