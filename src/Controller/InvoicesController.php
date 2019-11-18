<?php

namespace App\Controller;

use App\Entity\Invoice;
use App\Entity\Membership;
use App\Form\InvoiceType;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use WebToPay;
use WebToPayException;

class InvoicesController extends AbstractController
{
    /**
     * @Route("/api/invoices", name="invoices", methods="GET")
     */
    public function index(Request $request, SerializerInterface $serializer)
    {
        $invoices = $this->getDoctrine()->getRepository(Invoice::class)->findAll();

        $jsonObject = $serializer->serialize($invoices, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
        return JsonResponse::fromJsonString($jsonObject, JsonResponse::HTTP_OK);
    }

    /**
     * @Route("/api/invoices", name="create_invoice", methods="POST")
     */
    public function create(Request $request, SerializerInterface $serializer)
    {
        $invoice = new Invoice();
        $form = $this->createForm(InvoiceType::class, $invoice);

        $form->submit($request->query->all());
        if (false === $form->isValid()) {
            return new JsonResponse('error');
        }

        $form->submit($request->query->all());

        if (false === $form->isValid()) {
            return new JsonResponse('error');
        }

        $entityManager = $this->getDoctrine()->getManager();
        $membership = $entityManager->getRepository(Membership::class)->find($request->get('membershipId'));
        $invoice->setAmount($request->get('amount'));
        $invoice->setStatus($request->get('status'));
        $invoice->setMembership($membership);
        $invoice->setCurrency('EUR');
        $invoice->setPaytext($request->get('payText'));
        $entityManager->persist($invoice);
        $entityManager->flush();

        $jsonObject = $serializer->serialize($invoice, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);

        return JsonResponse::fromJsonString($jsonObject, JsonResponse::HTTP_CREATED);
    }

    /**
     * @Route("/redirect/invoice/{id}", name="redirect_invoice", methods="GET")
     */
    public function redirectToPayment(Request $request, Invoice $invoice)
    {
        try {
            WebToPay::redirectToPayment(array(
                'projectid' => $this->getParameter('project_id'),
                'sign_password' => $this->getParameter('project_pass'),
                'orderid' => $invoice->getId(),
                'amount' => $invoice->getAmount(),
                'currency' => $invoice->getCurrency(),
                'country' => $this->getParameter('project_country'),
                'accepturl' => $request->getSchemeAndHttpHost() . '/invoice/accept/' . $invoice->getId(),
                'cancelurl' => $request->getSchemeAndHttpHost() . 'cancel.php',
                'callbackurl' => $request->getSchemeAndHttpHost() . 'callback.php',
                'test' => 1,
                'p_email' => 'bandymas1@gmail.com',
                'paytext' => $invoice->getPaytext()
            ));
        } catch (WebToPayException $e) {
            echo $e->getMessage();
        }
    }

    /**
     * @Route("/invoice/accept/{id}", name="edit_invoice", methods={"GET"})
     */
    public function modifyMembership(Invoice $invoice, Request $request)
    {
        try {
            $response = WebToPay::validateAndParseData($request->query->all(), $this->getParameter('project_id'), $this->getParameter('project_pass'));
        } catch (Exception $e) {
            echo 'Your payment is not yet confirmed, system error<br />';
        }

        $entityManager = $this->getDoctrine()->getManager();
        $membershipId = $invoice->getMembership()->getId();
        $membership = $entityManager->getRepository(Membership::class)->find($membershipId);
        $addedYear = $membership->getExpiredAt()->modify('+1 year');
        $now = new DateTime();
        $membership->setExpiredAt($addedYear);
        $addedTwoYears = $addedYear->modify('+1 year');
        if ($addedTwoYears > $now) {
            $membership->setStatus('active');
        }
        $invoice->setPaymentType($response['payment']);
        $invoice->setStatus($response['status']);
        $invoice->setRequestId($response['requestid']);

        $entityManager->persist($membership);
        $entityManager->persist($invoice);
        $entityManager->flush();

        return $this->redirectToRoute('memberships');
    }

    /**
     * @Route("/api/invoices/{id}", name="delete_invoice", methods="DELETE")
     */
    public function cancelInvoice(Invoice $invoice, SerializerInterface $serializer)
    {
        $invoice->setCanceledAt();
        $this->getDoctrine()->getManager()->flush();

        $jsonObject = $serializer->serialize($invoice, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);

        return JsonResponse::fromJsonString($jsonObject, JsonResponse::HTTP_OK);
    }

    public function createNewInvoice()
    {
        $membershipIds = $this->getDoctrine()
            ->getRepository(Membership::class)
            ->findAllMembershipsMonthBeforeExpirationIds();

        foreach ($membershipIds as $membershipId) {
            $invoice = $this->getDoctrine()
                ->getRepository(Invoice::class)
                ->getInvoiceWithStatus(0);
            if (!$invoice) {
                $this->createInvoice($membershipId['id']);
            }
        }
    }

    public function createInvoice($membershipId)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $membership = new Membership();
        $membership = $entityManager->getRepository(Membership::class)->find($membershipId);
        $invoice = new Invoice();
        $invoice->setAmount(10000000);
        $invoice->setStatus(0);
        $invoice->setMembership($membership);
        $invoice->setCurrency('EUR');
        $invoice->setPaytext('ir vel tu');

        $entityManager->persist($invoice);
        $entityManager->flush();

        return $this->redirectToRoute('invoices');
    }
}
