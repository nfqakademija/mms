<?php


namespace App\Controller;

use App\Entity\Comment;
use App\Entity\User;
use App\Repository\CommentRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

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
     * @Route("/api/users/{u_id}/comments", name="comm_getall_id", methods="GET")
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

    /**
     * @Route("/api/users/{u_id}/comments", name="comm_put", methods="PUT")
     * @param Request $request
     * @param CommentRepository $commRep
     * @param int $u_id
     * @return Response
     */
    public function putComment(Request $request, CommentRepository $commRep, int $u_id, SerializerInterface $serializer)
    {
        if (! $request->get('text')) {
            return $this->respondValidationError('Please provide comment!');
        }

        $entityManager = $this->getDoctrine()->getManager();

        $user = $entityManager->getRepository(User::class)->find($u_id);

        $comment = new Comment();
        $comment->setText($request->get('text'));
        $comment->setUser($user);

        $entityManager->persist($comment);
        $entityManager->flush();

        $jsonObject = $serializer->serialize($comment, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);

        return new Response($jsonObject);
    }

    /**
     * @Route("/api/users/{u_id}/comments/{c_id}", name="comm_del", methods="DELETE")
     * @param int $u_id
     * @param int $c_id
     * @param CommentRepository $commRepo
     * @return Response
     */
    public function removeComment(int $u_id, int $c_id, CommentRepository $commRepo)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $comment = $entityManager->getRepository(Comment::class)->find($c_id);

        if (! $comment) {
            return $this->respondValidationError('Comment with that ID does not exist!');
        }

        $entityManager->remove($comment);
        $entityManager->flush();

        return new Response($this->get('serializer')->serialize($comment, 'json'));
    }

    /**
     * @Route("/api/users/{u_id}/comments/{c_id}", name="comm_upda", methods="PATCH")
     * @param Request $request
     * @param int $u_id
     * @param int $c_id
     * @param CommentRepository $commRepo
     * @return JsonResponse|Response
     */
    public function updateComment(Request $request, int $u_id, int $c_id, CommentRepository $commRepo)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $comment = $entityManager->getRepository(Comment::class)->find($c_id);

        if (! $request->get('text')) {
            return $this->respondValidationError('Please provide comment!');
        }

        if (! $comment) {
            return $this->respondValidationError('Comment with that ID does not exist!');
        }

        $comment->setText($request->get('text'));

        $entityManager->persist($comment);
        $entityManager->flush();

        return new Response($this->get('serializer')->serialize($comment, 'json'));
    }
}
