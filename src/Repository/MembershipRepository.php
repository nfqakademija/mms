<?php

namespace App\Repository;

use App\Entity\Membership;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Membership|null find($id, $lockMode = null, $lockVersion = null)
 * @method Membership|null findOneBy(array $criteria, array $orderBy = null)
 * @method Membership[]    findAll()
 * @method Membership[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MembershipRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Membership::class);
    }

    // /**
    //  * @return Membership[] Returns an array of Membership objects
    //  */
    /*
    public function findAllMembershipsMonthBeforeExpiration($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.expired_at = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */


    /*
    public function findOneBySomeField($value): ?Membership
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */

    public function findAllMembershipsMonthBeforeExpirationIds(): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
                SELECT id
                FROM membership m 
                WHERE DATE_SUB(date(m.expired_at), INTERVAL 30 DAY) = NOW()
        ';
        $stmt = $conn->prepare($sql);

        $stmt->execute();

        return $stmt->fetchAll();
    }

    public function findAllExpiredMembershipsIds(): array
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
                SELECT id 
                FROM membership m 
                WHERE m.expired_at < NOW()
        ';
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll();
    }
}
