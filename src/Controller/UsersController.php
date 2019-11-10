<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Repository\UsersRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class UsersController extends AbstractController
{

    protected $statusCode = 200;

    /**
     * @Route("/users", name="users")
     */
    public function index()
    {
        return $this->render('users/index.html.twig', [
            'controller_name' => 'UsersController',
        ]);
    }

    /**
     * Gets the value of statusCode
     *
     * @return int
     */
    public function getStatusCode()
    {
        return $this->statusCode;
    }

    public function respondNotFound($message = 'Not found!')
    {
        return $this->setStatusCode(404)->respondWithErrors($message);
    }

    public function respondCreated($data = [])
    {
        return $this->setStatusCode(201)->respond($data);
    }

    public function setStatusCode($statusCode)
    {
        $this->statusCode = $statusCode;

        return $this;
    }

    public function respond($data, $headers = [])
    {
        return new JsonResponse($data, $this->getStatusCode(), $headers);
    }

    public function respondValidationError($message = 'Validation errors')
    {
        return $this->setStatusCode(422)->respondWithErrors($message);
    }

    public function respondWithErrors($errors, $headers = [])
    {
        $data = [
            'errors' => $errors,
        ];

        return new JsonResponse($data, $this->getStatusCode(), $headers);
    }

    public function respondUnauthorized($message = 'Not authorized!')
    {
        return $this->setStatusCode(401)->respondWithErrors($message);
    }

    /**
     * @Route("/users/getall", name="users_getall", methods="GET")
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



    /**
     * @Route("/users/create", name="users_create", methods="POST")
     */
    public function createUser(Request $request, UserRepository $userRepository)
    {
        $entityManager = $this->getDoctrine()->getManager();
        if (! $request) {
            return $this->respondValidationError('Please provide a valid request!');
        }

        if (! $request->get('name')) {
            return $this->respondValidationError('Please provide a name!');
        }

        if (! $request->get('surname')) {
            return $this->respondValidationError('Please provide a surname!');
        }
        if (! $request->get('email')) {
            return $this->respondValidationError('Please provide a email!');
        }

        $user = new User();
        $user->setName($request->get('name'));
        $user->setSurname($request->get('surname'));
        $user->setEmail($request->get('email'));
        $user->setApprove($request->get('approve'));

        if ($request->query->has('url')) {
            $user->setUrl($request->get('url'));
        }

        if ($request->query->has('file_name')) {
            $user->setFileName($request->get('file_name'));
        }


        $entityManager->persist($user);
        $entityManager->flush();

        return $this->respondCreated($userRepository->transform($user));
    }

    /**
     * @Route("/users/remove", name="users_remove", methods="POST")
     */
    public function removeUser(Request $request, UserRepository $userRepository)
    {
        $entityManager = $this->getDoctrine()->getManager();
        if (! $request) {
            return $this->respondValidationError('Please provide a valid request!');
        }

        if (! $request->get('id')) {
            return $this->respondValidationError('Please provide id!');
        }

        $user = $userRepository->find($request->get('id'));

        if (! $user) {
            return $this->respondNotFound();
        }

        $entityManager->remove($user);

        $entityManager->flush();

        return $this->respondCreated($userRepository->transform($user));
    }

    /**
     * @Route("/users/update", name="users_update", methods="POST")
     */
    public function updateUser(Request $request, UserRepository $userRepository)
    {
        $entityManager = $this->getDoctrine()->getManager();
        if (! $request) {
            return $this->respondValidationError('Please provide a valid request!');
        }

        if (! $request->get('id')) {
            return $this->respondValidationError('Please provide id!');
        }

        $user = $userRepository->find($request->get('id'));

        if (! $user) {
            return $this->respondNotFound();
        }

        if ($request->get('name')) {
            $user->setName($request->get('name'));
        }
        if ($request->get('surname')) {
            $user->setSurname($request->get('surname'));
        }
        if ($request->get('email')) {
            $user->setEmail($request->get('email'));
        }
        if ($request->get('url')) {
            $user->setUrl($request->get('url'));
        }
        if ($request->get('file_name')) {
            $user->setFileName($request->get('file_name'));
        }
        if ($request->get('approve')) {
            $user->setApprove($request->get('approve'));
        }

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->respondCreated($userRepository->transform($user));
    }
}
