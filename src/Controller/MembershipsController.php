<?php

namespace App\Controller;

use App\Entity\Membership;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class MembershipsController extends AbstractController
{
    /**
     * @Route("/memberships", name="memberships")
     */
    public function index()

    {
        $this->checkExpiredMembershipsStatus();
        return $this->render('memberships/index.html.twig', [
            'memberships' => $this->getDoctrine()->getRepository(Membership::class)->findAll()
        ]);
    }

    /**
     * @Route("/membership/create", name="create_membership", methods={"POST", "GET"})
     */
    public function create()
    {
        $entityManager = $this->getDoctrine()->getManager();
        $membership = new Membership();
        $membership->setUserId(4);
        $membership->setStatus('active');
        $date = new \DateTime();
        $date->modify('+365 day');
        $membership->setExpiredAt($date);

        $entityManager->persist($membership);
        $entityManager->flush();

        return $this->redirectToRoute('memberships');
    }

    /**
     * @Route("/membership/update/{id}", name="edit_membership", methods={"POST", "GET"})
     */
    public function update($id, Request $request)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $membership = $entityManager->getRepository(Membership::class)->find($id);

        if (!$membership) {
            throw $this->createNotFoundException('No membership found for id ' . $id);
        }

        $membership->setStatus('active');

        $entityManager->flush();

        return $this->redirectToRoute('invoices');
    }

    public function checkExpiredMembershipsStatus()
    {
        $membershipIds = $this->getDoctrine()
            ->getRepository(Membership::class)
            ->findAllExpiredMembershipsIds();

        foreach ($membershipIds as $membershipId) {
            $this->checkExpiredMembershipStatus($membershipId);
        }
    }

    public function checkExpiredMembershipStatus($membershipId)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $membership = new Membership();
        $membership = $entityManager->getRepository(Membership::class)->find($membershipId);
        $expiredDate = $membership->getExpiredAt();
        $now = new \DateTime();
        if (date_diff($expiredDate,$now)->y >= 3) {
            $membership->setStatus('canceled');
        } else if (date_diff($expiredDate,$now)->y >= 2 && date_diff($expiredDate,$now)->m >= 9) {
            echo 'send email about cancelation';
        } else if (date_diff($expiredDate,$now)->y >= 2) {
            $membership->setStatus('suspended');
        }
    }
}
