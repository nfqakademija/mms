<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function transform(User $user)
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
      * @return User[] Returns an array of User objects
      */
    public function findByApprove($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.approve = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getResult();
    }

    /*
    public function findOneBySomeField($value): ?User
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
