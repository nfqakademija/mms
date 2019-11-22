<?php


namespace App\Controller;


use App\Entity\Comment;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CommentsController extends AbstractController
{
    protected $statusCode = 200;

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

    public function transformToJSON(Comment $comment)
    {
        return [
            'id'    => (int) $comment->getId(),
            'text' => (string) $comment->getText(),
            'user_id' => (int) $comment->getUserId()
        ];
    }

    /**
     * @Route("/api/users/comments", name="comm_getall", methods="GET")
     */
    public function getComments()
    {
        $entityManager = $this->getDoctrine()->getManager();
        $comments = $entityManager->getRepository(Comment::class)->findAll();

        $jsonContent = $this->get('serializer')->serialize($comments, 'json');
        return new Response($jsonContent);
    }

    /**
     * @Route("/api/users/{u_id}/comments", name="comm_getall", methods="GET")
     * @param int $u_id
     * @return Response
     */
    public function getComment(int $u_id)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $comments = $entityManager->getRepository(Comment::class)
            ->findBy(
                ['user_id' => [
                    'id' => $u_id
                ]]
            );

        $jsonContent = $this->get('serializer')->serialize($comments, 'json');
        return new Response($jsonContent);
    }
}