<?php

namespace App\Controller;

use App\Entity\Membership;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Invoice;


class InvoicesController extends AbstractController
{
    /**
     * @Route("/invoices", name="invoices")
     */
    public function index()
    {
        $this->createNewInvoice();
        return $this->render('invoices/index.html.twig', [
            'invoices' => $this->getDoctrine()->getRepository(Invoice::class)->findAll()
        ]);
    }

    /**
     * @Route("/invoice/create", name="create_invoice", methods={"POST", "GET"})
     */
    public function create($id = 1)
    {
            $entityManager = $this->getDoctrine()->getManager();
            $membership = new Membership();
            $membership = $entityManager->getRepository(Membership::class)->find($id);
            $invoice = new Invoice();
            $invoice->setAmount(5678);
            $invoice->setStatus(0);
            $invoice->setMembership($membership);
            $invoice->setCurrency('EUR');
            $invoice->setPaytext('Apmokejimas uz paslaugas');
            //$invoice->setCreatedAt();
            $entityManager->persist($invoice);
            $entityManager->flush();
        return $this->redirectToRoute('invoices');
    }

    /**
     * @Route("/redirect/invoice/{id}", name="redirect_invoice", methods={"POST", "GET"})
     */
    public function redirectToPayment($id)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $invoice = $entityManager->getRepository(Invoice::class)->find($id);

        $self_url = $this->get_self_url();

        try {

            $request = \WebToPay::redirectToPayment(array(
                'projectid'     => 155526,
                'sign_password' => 'a63fc8c5d915e1f1a40f40e6c7499863',
                'orderid'       => $invoice->getId(),
                'amount'        => $invoice->getAmount(),
                'currency'      => $invoice->getCurrency(),
                'country'       => 'LT',
                'accepturl'     => $self_url.'invoice/update/'.$id,
                'cancelurl'     => $self_url.'cancel.php',
                'callbackurl'   => $self_url.'callback.php',
                'test'          => 1,
                'p_email' => 'bandymas1@gmail.com',
                'paytext' => $invoice->getPaytext()
            ));
        } catch (\WebToPayException $e) {
            echo $e->getMessage();
        }

    }
    /**
     * @Route("/invoice/update/{id}", name="edit_invoice", methods={"GET"})
     */
    public function update($id, Request $request)
    {
        $get = $request->query->all();

        try {
            $response = \WebToPay::validateAndParseData($get, 155526, 'a63fc8c5d915e1f1a40f40e6c7499863');

            if ($response['status'] == 1 || $response['status'] == 2) {
                // You can start providing services when you get confirmation with accept url
                // Be sure to check if this order is not yet confirmed - user can refresh page anytime
                // status 2 means that payment has been got but it's not yet confirmed
                // @todo: get order by $response['orderid'], validate test (!), amount and currency
            }
        } catch (Exception $e) {
            echo 'Your payment is not yet confirmed, system error<br />';
        }

        $entityManager = $this->getDoctrine()->getManager();
        $invoice = $entityManager->getRepository(Invoice::class)->find($id);

        if (!$invoice) {
            throw $this->createNotFoundException('No invoice found for id ' . $id);
        }

        $membershipId = $invoice->getMembership()->getId();
        $membership = $entityManager->getRepository(Membership::class)->find($membershipId);
        $addedYear = $membership->getExpiredAt()->modify('+1 year');
        $now = new \DateTime();

        $membership->setExpiredAt($addedYear);
        $addedTwoYears = $addedYear->modify('+1 year');
        if($addedTwoYears > $now){
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
     * @Route("/invoice/delete/{id}", name="delete_invoice", methods={"POST", "GET"})
     */
    public function delete($id)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $invoice = $entityManager->getRepository(Invoice::class)->find($id);

        if (!$invoice) {
            throw $this->createNotFoundException('No invoice found for id ' . $id);
        }

        $invoice->setCanceledAt();

        $entityManager->flush();

        return $this->redirectToRoute('invoices');
    }

    private function get_self_url() {
        $s = substr(strtolower($_SERVER['SERVER_PROTOCOL']), 0,
            strpos($_SERVER['SERVER_PROTOCOL'], '/'));

        if (!empty($_SERVER["HTTPS"])) {
            $s .= ($_SERVER["HTTPS"] == "on") ? "s" : "";
        }

        $s .= '://'.$_SERVER['HTTP_HOST'];

        /*    if (!empty($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] != '80') {
                $s .= ':'.$_SERVER['SERVER_PORT'];
            }*/

        $s .= dirname($_SERVER['SCRIPT_NAME']);

        return $s;
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
            if(!$invoice){
                $this->createInvoice($membershipId['id']);
            }
        }
    }

    public function createInvoice($membershipId, $invoiceDetails = null)
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
