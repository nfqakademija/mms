<?php

namespace App\Controller;

use App\Entity\User;
use League\Csv\Writer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ExportDataController extends AbstractController
{
    public function index()
    {
        return $this->render('export_data/index.html.twig', [
            'controller_name' => 'ExportDataController',
        ]);
    }


    /**
     * @Route("/api/export/users", name="export_data", methods="GET")
     */
    public function exportUsers()
    {
        $csv = Writer::createFromFileObject(new \SplTempFileObject());

        $csv->insertOne(
            ['name', 'surname', 'email', 'url', 'mobile_phone', 'linkedin']
        );

        $entityManager = $this->getDoctrine()->getManager();

        $users = $entityManager->getRepository(User::class)->findAll();

        foreach($users as $user) {
            $csv->insertOne(
                [$user->getName(), $user->getSurname(), $user->getEmail(), $user->getUrl(), $user->getMobilePhone(),
                    $user->getLinkedin()]
            );
        }

        $csv->output('users.csv');
        return new Response('');
    }

    /**
     * @Route("/api/export/invoices", name="export_data", methods="GET")
     */
    public function exportInvoices()
    {
        //soon
        return new Response('');
    }
}
