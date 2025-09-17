<?php 
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    use PHPMailer\PHPMailer\SMTP;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    function process_response() {
        require '../../../../vendor/PHPMailer/src/Exception.php';
        require '../../../../vendor/PHPMailer/src/PHPMailer.php';
        require '../../../../vendor/PHPMailer/src/SMTP.php';

        $error_msg = [];

        if (!isset($_POST['enquiry_first_name']) || trim($_POST['enquiry_first_name']) == "") {
            $error_msg[] = 'First name is Required';    
        }

        if (!isset($_POST['enquiry_last_name']) || trim($_POST['enquiry_last_name']) == "") {
            $error_msg[] = 'Last name is Required';    
        }

        $validEmailRegEx = "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i";

        if (!isset($_POST['enquiry_email']) || !preg_match($validEmailRegEx, $_POST["enquiry_email"])) {
            $error_msg[] = 'Email uses incorrect format';
        }

        if (!isset($_POST['enquiry_subject']) || trim($_POST['enquiry_subject']) == "") {
            $error_msg[] = 'Subject is required';
        }

        if (!isset($_POST['enquiry_content']) || trim($_POST['enquiry_content']) == "") {
            $error_msg[] = 'Message Content is required';
        }

        if (count($error_msg) > 0) {
            http_response_code(422);
            return $data = [
                'status' => 'error',
                'message' => $error_msg
            ];
        }

        $config = parse_ini_file('../../../../.env');

        $servername = $config["DBADDRESS"];
        $dbname = $config["DBNAME"];
        $username = $config["DBUSER"];
        $password = $config["DBPASS"];

        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        } catch(PDOException $e) {
            echo "Connection has failed: " . $e->getMessage();
        }

        $inputs =   [
                    'enquiry_first_name' => $_POST["enquiry_first_name"],
                    'enquiry_last_name' => $_POST["enquiry_last_name"],
                    'enquiry_email' => $_POST["enquiry_email"],
                    'enquiry_subject' => $_POST["enquiry_subject"],
                    'enquiry_content' => $_POST["enquiry_content"]
                    ];

        $query =   "INSERT INTO `enquiries`
                    (`enquiry_first_name`, `enquiry_last_name`, `enquiry_email`, `enquiry_subject`, `enquiry_content`)
                    VALUES
                    (:enquiry_first_name,:enquiry_last_name,:enquiry_email,:enquiry_subject,:enquiry_content )
                    ";

        $stmt = $conn->prepare($query);

        $stmt->execute($inputs);

        $mail = new PHPMailer();

        $mail->isSMTP();

        $mail->SMTPAuth  = true;
                              
        $mail->Host = $config['SMTP_HOST'];
        $mail->Port = $config['SMTP_PORT'];
        $mail->Username   = $config['SMTP_USER'];   
        $mail->Password   = $config['SMTP_PASS'];   
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;

        $mail->setFrom('me@davidstratton.co.uk', 'Contact Form Notification');
        $mail->addAddress('me@davidstratton.co.uk');

        $mail->addReplyTo($_POST["enquiry_email"],$_POST["enquiry_first_name"] . ' ' . $_POST["enquiry_last_name"] );

        $mail->isHTML(false);
        $mail->Subject = 'Contact Form: ' . $_POST["enquiry_subject"];
        $mail->Body = <<<EOT
                        Email: {$_POST['enquiry_email']}
                        First Name: {$_POST["enquiry_first_name"]}
                        Last Name: {$_POST["enquiry_last_name"]}
                        Subject: {$_POST["enquiry_subject"]}
                        Message: {$_POST['enquiry_content']}
                        EOT;

        $mail->send();

        http_response_code(201);

        return $data = [
            'status' => 'success',
            'message' => 'Enquiry Sent successfully '
        ];
    }
 
    // Pevent caching
    header('Cache-Control: no-cache, must-revalidate');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');

    //Set the content type
    header('Content-Type: application/json; charset=utf-8');
    
    $data = process_response();
    //Encode and output the data
    echo json_encode($data);
}
?>