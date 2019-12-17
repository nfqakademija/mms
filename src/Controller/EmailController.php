<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\Bridge\Google\Smtp\GmailTransport;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;

class EmailController extends AbstractController
{
    const RECEIVED_SUBJECT = "LGDA - Prašymas gautas";
    const APPROVED_SUBJECT = "LGDA - Narystė patvirtinta";
    const NOT_APPROVED_SUBJECT = "Narystė nepatvirtinta";
    const SUCCESFUL_PAYMENT_SUBJECT = "Mokėjimas priimtas";
    const NOT_SUCCESFUL_PAYMENT_SUBJECT = "Mokėjimas nepriimtas";
    const MEMBERSHIP_SUSPENDED_SUBJECT = "Jūsų narystė suspenduota";
    const MEMBERSHIP_SOON_SUSPENDED_SUBJECT = "Jūsų narystė greitu metu bus suspenduota";
    const MEMBERSHIP_CANCELLED_SUBJECT = "Narystė sustabdyta";
    const MEMBERSHIP_EXTENDED_SUBJECT = "Narystė pratesta";
    const MEMBERSHIP_TYPE_CHANGE_SUBJECT = "Narystės tipas pakeistas";
    const NOTIFICATION_FOR_ADMIN = "Gauta nauja paraiška";


    const RECEIVED_CONTENT = "<h1>Prašymas gautas</h1>
                Sveiki, gavome jūsų prašymą, ją peržvelgsime per artimiausias 24 valandas";
    const APPROVED_CONTENT = "<h1>Narystė patvirtinta</h1>
                Sveiki, jūsų narystė patvirtinta";
    const NOT_APPROVED_CONTENT = "<h1>Narystė nepatvirtinta</h1>";
    const SUCCESFUL_PAYMENT_CONTENT = "<h1>Mokėjimas priimtas</h1>";
    const NOT_SUCCESFUL_PAYMENT_CONTENT = "<h1>Mokėjimas nepriimtas</h1>";
    const MEMBERSHIP_SUSPENDED_CONTENT = "<h1>Jūsų narystė suspenduota</h1>";
    const MEMBERSHIP_SOON_SUSPENDED_CONTENT = "<h1>Jūsų narystė greitu metu bus suspenduota</h1>";
    const MEMBERSHIP_CANCELLED_CONTENT = "<h1>Narystė sustabdyta</h1>";
    const MEMBERSHIP_EXTENDED_CONTENT = "<h1>Narystė pratesta</h1>";
    const MEMBERSHIP_TYPE_CHANGE_CONTENT = "<h1>Narystės tipas pakeistas</h1>";
    const NOTIFICATION_FOR_CONTENT = "<h1>Gauta nauja paraiška</h1>";



    protected $statusCode = 200;

    public function respondValidationError($message = 'Validation errors')
    {
        return $this->setStatusCode(422)->respondWithErrors($message);
    }

    public function setStatusCode($statusCode)
    {
        $this->statusCode = $statusCode;

        return $this;
    }

    public function respondWithErrors($errors, $headers = [])
    {
        $data = [
            'errors' => $errors,
        ];

        return new JsonResponse($data, $this->getStatusCode(), $headers);
    }

    public function getStatusCode()
    {
        return $this->statusCode;
    }

    public function index()
    {
        return $this->render('email/index.html.twig', [
            'controller_name' => 'EmailController',
        ]);
    }

    public function sendEmail($emailRecipient, $subject, $htmlContent)
    {
        $username = $_ENV['GMAIL_USERNAME'];
        $password = $_ENV['GMAIL_PASSWORD'];
        $transport = new GmailTransport($username, $password);
        $mailer = new Mailer($transport);

        $email = (new Email())
            ->from('lgdamailer@gmail.com')
            ->to($emailRecipient)
            ->subject($subject)
            ->html($htmlContent);

        try {
            $mailer->send($email);
        } catch (TransportExceptionInterface $e) {
            return $this->respondValidationError('Error with sending an email!');
        }

        $headers = [];
        return new JsonResponse('Email was sent!', 200, $headers);
    }
}
