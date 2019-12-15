<?php

namespace App\Controller;

use App\Entity\Customer;
use App\Repository\CustomerRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class RegistrationController extends AbstractController
{
    /**
     * @var CustomerRepository
     */
    private $customerRepository;

    /**
     * @var UserPasswordEncoderInterface
     */
    private $passwordEncoder;

    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    public function __construct(
        CustomerRepository $customerRepository,
        UserPasswordEncoderInterface $passwordEncoder,
        EntityManagerInterface $entityManager
    )
    {
        $this->customerRepository = $customerRepository;
        $this->passwordEncoder = $passwordEncoder;
        $this->entityManager = $entityManager;
    }
    /**
     * @Route("/api/registration", name="registration")
     */
    public function index(Request $request)
    {
        $email = $request->get('email');
        $password = $request->get('password');

        $customer = $this->customerRepository->findOneBy([
            'email' => $email,
        ]);
        if (!is_null($customer)) {
            return JsonResponse::fromJsonString([
                'message' => 'Customer already exists'
            ], Response::HTTP_CONFLICT);
        }
        $customer = new Customer();
        $customer->setEmail($email);
        $customer->setPassword(
            $this->passwordEncoder->encodePassword($customer, $password)
        );
        $this->entityManager->persist($customer);
        $this->entityManager->flush();

        return JsonResponse::fromJsonString($customer, JsonResponse::HTTP_CREATED)
            ->setContext((new Context())->setGroups(['public']));
    }
}
