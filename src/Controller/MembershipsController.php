<?php

namespace App\Controller;

use App\Entity\Membership;
use App\Entity\User;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class MembershipsController extends AbstractController
{
    const STATUS_ACTIVE = 'active';
    /**
     * @Route("/api/memberships", name="memberships", methods="GET")
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
     * @Route("/api/memberships/{id}", name="show_membership", methods="GET")
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
     * @Route("/api/memberships", name="create_membership", methods="POST")
     */
    public function createMembership(Request $request, SerializerInterface $serializer)
    {
        $entityManager = $this->getDoctrine()->getManager();

        if ($request->get('userId')) {
            $user = $entityManager->getRepository(User::class)->find($request->get('userId'));
            if (!$user) {
                throw $this->createNotFoundException(
                    'No user found for id '.$request->get('userId')
                );
            }
        } else {
            $user = new User();
            $user->setName($request->get('name'));
            $user->setSurname($request->get('surname'));
            $user->setEmail($request->get('email'));
            $user->setMobilePhone($request->get('mobilePhone'));
          
            $entityManager->persist($user);
        }

        $membership = new Membership();
        $user->setApprove(1);
        $membership->setUser($user);
        if ($request->get('status')) {
            $membership->setStatus($request->get('status'));
        } else {
            $membership->setStatus(self::STATUS_ACTIVE);
        }
        $membership->setExpiredAt(new DateTime($request->get('expiredAt')));
      
        $entityManager->persist($membership);
        $entityManager->flush();

        $jsonObject = $serializer->serialize($membership, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);

        return JsonResponse::fromJsonString($jsonObject, JsonResponse::HTTP_CREATED);
    }

    /**
     * @Route("/api/memberships/{id}", name="edit_membership", methods="PUT")
     */
    public function updateMembership(Membership $membership, Request $request, SerializerInterface $serializer)
    {
        $entityManager = $this->getDoctrine()->getManager();

        $membership->setStatus($request->get('status'));
        $membership->setExpiredAt(new DateTime($request->get('expiredAt')));
        $membership->getUser()->setName($request->get('name'));
        $membership->getUser()->setSurname($request->get('surname'));
        $membership->getUser()->setEmail($request->get('email'));
        $membership->getUser()->setMobilePhone($request->get('MobilePhone'));
      
        $entityManager->flush();

        $jsonObject = $serializer->serialize($membership, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);

        return JsonResponse::fromJsonString($jsonObject, JsonResponse::HTTP_CREATED);
    }

    /**
     * @Route("/api/memberships/{id}", name="delete_membership", methods="DELETE")
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
        $now = new DateTime();
        if (date_diff($expiredDate, $now)->y >= 3) {
            $membership->setStatus('canceled');
        } elseif (date_diff($expiredDate, $now)->y >= 2 && date_diff($expiredDate, $now)->m >= 9) {
            echo 'send email about cancelation';
        } elseif (date_diff($expiredDate, $now)->y >= 2) {
            $membership->setStatus('suspended');
        }
    }
}
