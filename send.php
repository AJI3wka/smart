<?php
session_start();
error_reporting(85);
header("Content-Type: text/html; charset=UTF-8");


$mail_to = "Tkachuk.s.u.bis@gmail.com, smart.charger.com.ua@gmail.com"; // E-mail на который будут отправляться уведомления
$mail_from = "mail@".preg_replace("/^www\./ui", "", $_SERVER['HTTP_HOST']); $mail_from_name = $_SERVER['HTTP_HOST']; // E-mail с которого будут отправляться уведомления ($_SERVER['HTTP_HOST'] - домен текущего сайта)
$mail_subject = "Заявка"; // Тема уведомлений

$api_data = array(
	"office" => 1,
	"country" => "UA",
	"key" => "35f1d591ae32544f795e15881bb6f197",
	"order_id" => number_format(round(microtime(true)*10),0,'.',''),
	"products" => urlencode(serialize(array(
		1 => array(
			"product_id" => 4,
			"price" => 1299,
			"count" => 1,
		),
	))),
	"bayer_name" => trim($_POST['name']),
	"phone" => trim($_POST['phone']),
	"email" => trim($_POST['email']),
	"comment" => trim($_POST['oc']),
	"payment" => trim($_POST['payment']),
	"delivery" => trim($_POST['delivery']),
	"delivery_adress" => trim($_POST['address']),
	"site" => $_SERVER['HTTP_HOST'],
	"ip" => $_SERVER['REMOTE_ADDR'],
	"utm_source" => $_SESSION['utm_source'],
	"utm_medium" => $_SESSION['utm_medium'],
	"utm_campaign" => $_SESSION['utm_campaign'],
	"utm_content" => $_SESSION['utm_content'],
	"utm_term" => $_SESSION['utm_term'],
);

$name1 = $_POST['name'];
$phone2 = $_POST['phone'];
$oc = $_POST['oc'];

$_POST['good'] = 'Беспроводная зарядка SMART-CHARGER';

$labels = array(
	"name" => "Имя",
	"oc" => "ОС",
	"email" => "E-mail",
	"phone" => "Телефон",
	"theme" => "Форма",
	"good" => 'Товар'
);



$mail_boundary = "boun".md5(uniqid())."dary";
$mail_headers = array("MIME-Version: 1.0", "From: =?UTF-8?B?".base64_encode($mail_from_name)."?= <".$mail_from.">", "Content-Type: multipart/mixed; boundary=\"".$mail_boundary."\"");
if(preg_match("/^[^\n]+\@[^\n]+\.[^\n]+$/u", trim($_POST['email']))){$mail_headers[] = "Reply-To: ".trim($_POST['email']);}

$mail_message = ""; foreach($_POST as $k=>$v){
if(is_array($v)&&$v){$mail_message .= (($labels[trim($k)])?$labels[trim($k)]:htmlspecialchars(trim($k))).":<br>"; foreach($v as $k2=>$v2){if($v2 = trim($v2)){$mail_message .= "&nbsp;".(is_numeric(trim($k2))?"":(($labels[trim($k2)])?$labels[trim($k2)]:htmlspecialchars(trim($k2))).": ")."<b>".nl2br(htmlspecialchars($v2))."</b><br>";}}}
else{$v = trim($v); if($v&&$v!="undefined"){$mail_message .= (($labels[trim($k)])?$labels[trim($k)]:htmlspecialchars(trim($k))).": <b>".nl2br(htmlspecialchars($v))."</b><br>";}}
}


$utm = array("utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term");
$vp = ""; foreach($utm as $v){if($_SESSION[$v]){$vp .= (($labels[$v])?$labels[$v]:$v).": <b>".htmlspecialchars($_SESSION[$v])."</b><br>";}} if($vp){$mail_message .= "<br>".$vp;}


$mail_message1 = "--".$mail_boundary."
Content-Type: text/html; charset=\"UTF-8\"
Content-Transfer-Encoding: base64

".base64_encode($mail_message)."

--".$mail_boundary;


foreach($_FILES as $v){
if($v['type']&&$v['tmp_name']){
$mail_message1 .= "
Content-Disposition: attachment; filename=\"=?UTF-8?B?".base64_encode($v['name'])."?=\"
Content-Type: ".$v['type']."; name=\"=?UTF-8?B?".base64_encode($v['name'])."?=\"
Content-Transfer-Encoding: base64

".base64_encode(file_get_contents($v['tmp_name']))."

--".$mail_boundary;
}
}


function f_curl($url, $post, $headers){
	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	if($post){curl_setopt($ch, CURLOPT_POST, true); curl_setopt($ch, CURLOPT_POSTFIELDS, $post);}
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	$rez = curl_exec($ch);
	curl_close($ch);

	return $rez;
}


if(trim($_POST['name'])&&trim($_POST['phone'])&&mail($mail_to, "=?UTF-8?B?".base64_encode($mail_subject)."?=", $mail_message1, implode("\r\n", $mail_headers))){
	$api_z = json_decode(f_curl("http://company.lp-crm.biz/api/addNewOrder.html", $api_data), true);
	if($_GET['var_dump']=="api_z"){var_dump($api_z); exit;}

	header("Location: success.php?phone=$phone2&name=$name1"); exit;
}else{echo "Error";}
?>