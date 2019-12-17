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

    public function sendEmail($emailRecipient, $subject, $content)
    {
        $username = $_ENV['GMAIL_USERNAME'];
        $password = $_ENV['GMAIL_PASSWORD'];
        $transport = new GmailTransport($username, $password);
        $mailer = new Mailer($transport);

        $email = (new Email())
            ->from('lgdamailer@gmail.com')
            ->to($emailRecipient)
            ->subject($subject)
            ->text($content);

        try {
            $mailer->send($email);
        } catch (TransportExceptionInterface $e) {
            return $this->respondValidationError('Error with sending an email!');
        }

        $headers = [];
        return new JsonResponse('Email was sent!', 200, $headers);
    }
}
