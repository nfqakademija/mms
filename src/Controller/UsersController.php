<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class UsersController extends AbstractController
{
    /**
     * @Route("/users", name="users")
     */
    public function index()
    {
//        $user = new User();
//        $user->setName("test");
//        $user->setSurname("test");
//        $user->setEmail("test");
//
//        // stuff related to JSON
//        $encoders = [new XmlEncoder(), new JsonEncoder()];
//        $normalizers = [new ObjectNormalizer()];
//        $serializer = new Serializer($normalizers, $encoders);
//
//        $jsonContent = $serializer->serialize($user, 'json');
//
//        return new Response($jsonContent);
        return $this->render('users/index.html.twig', [
            'controller_name' => 'UsersController',
        ]);
    }

    /**
     * @Route("/users/getall", name="users_getall")
     */
    public function getUsers()
    {
        $entityManager = $this->getDoctrine()->getManager();

        // get all data from database
        $user = $entityManager->getRepository(User::class)->findAll();

        // objects to json format
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $jsonContent = $serializer->serialize($user, 'json');

        return new Response($jsonContent);
    }
}
