<?php

namespace App\Controller;

use App\Entity\Membership;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;

class MembershipsController extends AbstractController
{
    /**
     * @Route("/memberships", name="memberships", methods="GET")
     */
    public function showAllMemberships(SerializerInterface $serializer)
    {
        $memberships = $this->getDoctrine()->getRepository(Membership::class)->findAll();

        $jsonObject = $serializer->serialize($memberships, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
        return JsonResponse::fromJsonString($jsonObject, JsonResponse::HTTP_OK);

    }

    /**
     * @Route("/membership/{id}", name="show_membership", methods="GET")
     */
    public function showMembership(SerializerInterface $serializer, Membership $membership)
    {
        $jsonObject = $serializer->serialize($membership, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);

        return JsonResponse::fromJsonString($jsonObject, JsonResponse::HTTP_OK);
    }

    /**
     * @Route("/membership", name="create_membership", methods="POST")
     */
    public function createMembership(Request $request, SerializerInterface $serializer)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $membership = new Membership();
        $user = $entityManager->getRepository(User::class)->find($request->get('userId'));
        $membership->setUser($user);
        $membership->setStatus($request->get('status'));
        $membership->setExpiredAt(new \DateTime($request->get('expiredAt')));

        $entityManager->persist($membership);
        $entityManager->flush();
        $jsonObject = $serializer->serialize($membership, 'json');

        return JsonResponse::fromJsonString($jsonObject, JsonResponse::HTTP_CREATED);

        return $this->redirectToRoute('memberships');
    }

    /**
     * @Route("/membership/{id}", name="edit_membership", methods="PUT")
     */
    public function updateMembership(Membership $membership, Request $request, SerializerInterface $serializer)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $membership->setStatus($request->get('status'));
        $membership->setExpiredAt(new \DateTime($request->get('expiredAt')));

        $entityManager->flush();

        $jsonObject = $serializer->serialize($membership, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);

        return JsonResponse::fromJsonString($jsonObject, JsonResponse::HTTP_CREATED);

        return $this->redirectToRoute('invoices');
    }

    /**
     * @Route("/membership/{id}", name="delete_membership", methods="DELETE")
     */
    public function deleteMembership(Membership $membership, Request $request, SerializerInterface $serializer)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($membership);
        $entityManager->flush();

        $jsonObject = $serializer->serialize($membership, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);

        return JsonResponse::fromJsonString($jsonObject, JsonResponse::HTTP_OK);

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
        } elseif (date_diff($expiredDate,$now)->y >= 2 && date_diff($expiredDate,$now)->m >= 9) {
            echo 'send email about cancelation';
        } elseif (date_diff($expiredDate,$now)->y >= 2) {
            $membership->setStatus('suspended');
        }
    }
}
