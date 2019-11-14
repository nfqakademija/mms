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
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\Validator\Validator\ValidatorInterface;


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

    public function transformToJSON(User $user)
    {
        return [
            'id'    => (int) $user->getId(),
            'name' => (string) $user->getName(),
            'surname' => (string) $user->getSurname(),
            'url' => (string) $user->getUrl(),
            'file_name' => (string) $user->getFileName(),
            'approve' => (int) $user->getApprove()
        ];
    }

    /**
     * @Route("/api/users", name="users_getall", methods="GET")
     */
    public function getUsers()
    {
        $entityManager = $this->getDoctrine()->getManager();

        // get all data from database
        $user = $entityManager->getRepository(User::class)->findAll();

        $jsonContent = $this->get('serializer')->serialize($user, 'json');
        return new Response($jsonContent);
    }


    /**
     * @Route("/api/users/{id}", defaults={"_format"="json"}, name="users_get", methods="GET")
     */
    public function getOneUser(User $user)
    {
        return new Response($this->get('serializer')->serialize($user, 'json'));
    }

    /**
     * @Route("/api/users", defaults={"_format"="json"}, name="users_create", methods="PUT")
     */
    public function createUser(Request $request, UserRepository $userRepository, ValidatorInterface $validator)
    {
        $entityManager = $this->getDoctrine()->getManager();

        $user = new User();
        $user->setName($request->get('name'));
        $user->setSurname($request->get('surname'));
        $user->setEmail($request->get('email'));
        $user->setApprove($request->get('approve'));
        $user->setUrl($request->get('url'));
        $user->setFileName($request->get('file_name'));

        $errors = $validator->validate($user);
        if(count($errors) > 0) {
            $errorsString = (string)$errors;
            return new Response($errorsString);
        }

        $entityManager->persist($user);
        $entityManager->flush();

        return new Response($this->get('serializer')->serialize($user, 'json'));
    }

    /**
     * @Route("/api/users/{id}", defaults={"_format"="json"}, name="users_remove", methods="DELETE")
     */
    public function removeUser(User $user)
    {
        $entityManager = $this->getDoctrine()->getManager();

        $entityManager->remove($user);

        $entityManager->flush();

        return new Response($this->get('serializer')->serialize($user, 'json'));
    }

    /**
     * @Route("/api/users", defaults={"_format"="json"}, name="users_update", methods="PATCH")
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

        return new Response($this->get('serializer')->serialize($user, 'json'));
    }
}
